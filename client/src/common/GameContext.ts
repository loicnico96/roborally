import update, { Spec } from "immutability-helper"

import { merge, size } from "common/utils/objects"

import { GameStateBasic, PlayerId } from "./model/GameStateBasic"
import { PlayerStateBasic } from "./model/PlayerStateBasic"

const INTERRUPT_WIN = Object.assign(Error("interrupt"), { reason: "win" })

export type StateChangeHandler<T> = (newState: T) => Promise<void>

export class GameContext<
  P extends PlayerStateBasic,
  T extends GameStateBasic<P>
> {
  onStateChanged?: StateChangeHandler<T>
  state: T

  constructor(state: T, onStateChanged?: StateChangeHandler<T>) {
    this.onStateChanged = onStateChanged
    this.state = state
  }

  allPlayersReady(): boolean {
    return this.getPlayerOrder().every(playerId => {
      const player = this.getPlayer(playerId)
      return player.ready
    })
  }

  getPlayer(playerId: PlayerId): P {
    return this.state.players[playerId]
  }

  getPlayerOrder(): PlayerId[] {
    return this.state.playerOrder
  }

  getState(): T {
    return this.state
  }

  filterPlayers(
    filterFn: (player: P, playerId: PlayerId) => boolean
  ): PlayerId[] {
    return this.getPlayerOrder().filter(playerId => {
      const player = this.getPlayer(playerId)
      return filterFn(player, playerId)
    })
  }

  findPlayer(
    filterFn: (player: P, playerId: PlayerId) => boolean
  ): PlayerId | undefined {
    return this.getPlayerOrder().find(playerId => {
      const player = this.getPlayer(playerId)
      return filterFn(player, playerId)
    })
  }

  mergeState(mergeSpec: Partial<T>) {
    this.state = merge(this.state, mergeSpec)
  }

  updatePlayer(playerId: PlayerId, updateSpec: Spec<P>): void {
    this.updateState({
      players: {
        [playerId]: updateSpec,
      },
    } as Spec<T>)
  }

  // Calls an update function for each player (in player order)
  // Returns the number of players that were updated
  // If the update function returns false, the player is not updated
  updatePlayers(
    updateFn: (player: P, playerId: PlayerId) => P | false
  ): number {
    const updatedPlayers = this.getPlayerOrder().reduce((result, playerId) => {
      const oldPlayer = this.getPlayer(playerId)
      const newPlayer = updateFn(oldPlayer, playerId)
      if (newPlayer !== oldPlayer && newPlayer !== false) {
        result[playerId] = newPlayer
      }
      return result
    }, {} as Record<PlayerId, P>)

    const updateCount = size(updatedPlayers)

    if (updateCount > 0) {
      this.updateState({
        players: {
          $merge: updatedPlayers,
        },
      } as Spec<T>)
    }

    return updateCount
  }

  updateState(updateSpec: Spec<T>): void {
    this.state = update(this.state, updateSpec)
  }

  win(winners: PlayerId[]): never {
    this.mergeState({ winners } as Partial<T>)
    throw INTERRUPT_WIN
  }

  async post(): Promise<void> {
    if (this.onStateChanged) {
      await this.onStateChanged(this.state)
    }
  }

  async resolve(): Promise<void> {
    try {
      await this.resolveInternal()
    } catch (error) {
      if (error !== INTERRUPT_WIN) {
        console.error(error)
      }
    }
  }

  async resolveInternal(): Promise<void> {
    throw Object.assign(Error("Not implemented"), { object: this })
  }
}
