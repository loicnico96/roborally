import update, { Spec } from "immutability-helper"

import { merge, size } from "common/utils/objects"

import { GameStateBasic, PlayerId } from "./model/GameStateBasic"
import { PlayerStateBasic } from "./model/PlayerStateBasic"

const INTERRUPT_WIN = Object.assign(Error("interrupt"), { reason: "win" })

export type StateChangeHandler<T, E> = (newState: T, event: E) => Promise<void>

export class GameContext<
  Player extends PlayerStateBasic,
  State extends GameStateBasic<Player>,
  Event
> {
  onStateChanged?: StateChangeHandler<State, Event>
  state: State

  constructor(state: State, onStateChanged?: StateChangeHandler<State, Event>) {
    this.onStateChanged = onStateChanged
    this.state = state
  }

  allPlayersReady(): boolean {
    return this.getPlayerOrder().every(playerId => {
      const player = this.getPlayer(playerId)
      return player.ready
    })
  }

  getPlayer(playerId: PlayerId): Player {
    return this.state.players[playerId]
  }

  getPlayerOrder(): PlayerId[] {
    return this.state.playerOrder
  }

  getState(): State {
    return this.state
  }

  filterPlayers(
    filterFn: (player: Player, playerId: PlayerId) => boolean
  ): PlayerId[] {
    return this.getPlayerOrder().filter(playerId => {
      const player = this.getPlayer(playerId)
      return filterFn(player, playerId)
    })
  }

  findPlayer(
    filterFn: (player: Player, playerId: PlayerId) => boolean
  ): PlayerId | undefined {
    return this.getPlayerOrder().find(playerId => {
      const player = this.getPlayer(playerId)
      return filterFn(player, playerId)
    })
  }

  isFinished(): boolean {
    return this.state.winners !== null
  }

  mergeState(mergeSpec: Partial<State>) {
    this.state = merge(this.state, mergeSpec)
  }

  updatePlayer(playerId: PlayerId, updateSpec: Spec<Player>): void {
    this.updateState({
      players: {
        [playerId]: updateSpec,
      },
    } as Spec<State>)
  }

  // Calls an update function for each player (in player order)
  // Returns the number of players that were updated
  // If the update function returns false, the player is not updated
  updatePlayers(
    updateFn: (player: Player, playerId: PlayerId) => Player | false
  ): number {
    const updatedPlayers = this.getPlayerOrder().reduce((result, playerId) => {
      const oldPlayer = this.getPlayer(playerId)
      const newPlayer = updateFn(oldPlayer, playerId)
      if (newPlayer !== oldPlayer && newPlayer !== false) {
        result[playerId] = newPlayer
      }
      return result
    }, {} as Record<PlayerId, Player>)

    const updateCount = size(updatedPlayers)

    if (updateCount > 0) {
      this.updateState({
        players: {
          $merge: updatedPlayers,
        },
      } as Spec<State>)
    }

    return updateCount
  }

  updateState(updateSpec: Spec<State>): void {
    this.state = update(this.state, updateSpec)
  }

  win(winners: PlayerId[]): never {
    this.mergeState({ winners } as Partial<State>)
    throw INTERRUPT_WIN
  }

  async post(event: Event): Promise<void> {
    if (this.onStateChanged) {
      await this.onStateChanged(this.state, event)
    }
  }

  async resolve<P extends any[]>(
    fn: (ctx: this, ...args: P) => Promise<void>,
    ...args: P
  ): Promise<State> {
    try {
      await fn(this, ...args)
    } catch (error) {
      if (error !== INTERRUPT_WIN) {
        console.error(error)
      }
    }

    return this.state
  }
}
