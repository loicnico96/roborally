import update, { Spec } from "immutability-helper"

import { merge, size } from "common/utils/objects"

import { GameStateBasic, PlayerId } from "./GameStateBasic"

const INTERRUPT_WIN = Object.assign(Error("interrupt"), { reason: "win" })

export type StateChangeHandler<T, E> = (newState: T, event: E) => Promise<void>

type Player<State extends GameStateBasic> = State["players"][string]

export class GameContext<State extends GameStateBasic, Event> {
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

  getPlayer(playerId: PlayerId): Player<State> {
    return this.state.players[playerId] as Player<State>
  }

  getPlayerOrder(): PlayerId[] {
    return this.state.playerOrder
  }

  getState(): State {
    return this.state
  }

  filterPlayers(
    filterFn: (player: Player<State>, playerId: PlayerId) => boolean
  ): PlayerId[] {
    return this.getPlayerOrder().filter(playerId => {
      const player = this.getPlayer(playerId)
      return filterFn(player, playerId)
    })
  }

  findPlayer(
    filterFn: (player: Player<State>, playerId: PlayerId) => boolean
  ): PlayerId | undefined {
    return this.getPlayerOrder().find(playerId => {
      const player = this.getPlayer(playerId)
      return filterFn(player, playerId)
    })
  }

  mergeState(mergeSpec: Partial<State>) {
    this.state = merge(this.state, mergeSpec)
  }

  updatePlayer(playerId: PlayerId, updateSpec: Spec<Player<State>>): void {
    this.updateState({
      players: {
        [playerId]: updateSpec,
      },
    } as Spec<State>)
  }

  updatePlayers(
    updateFn: (
      player: Player<State>,
      playerId: PlayerId
    ) => Player<State> | false
  ): number {
    const updatedPlayers = this.getPlayerOrder().reduce((result, playerId) => {
      const oldPlayer = this.getPlayer(playerId)
      const newPlayer = updateFn(oldPlayer, playerId)
      if (newPlayer !== oldPlayer && newPlayer !== false) {
        result[playerId] = newPlayer
      }
      return result
    }, {} as Record<PlayerId, Player<State>>)

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
    console.log("updateState", updateSpec, this.state)
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
        throw error
      }
    }

    return this.state
  }
}
