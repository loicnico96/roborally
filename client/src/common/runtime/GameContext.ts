import { mapValues } from "common/utils/objects"
import update, { Spec } from "immutability-helper"

export type PlayerId = string

export type PlayerStateBasic = {
  ready: boolean
}

export type GameStateBasic<P extends PlayerStateBasic = PlayerStateBasic> = {
  playerOrder: PlayerId[]
  players: Record<PlayerId, P>
}

export type StateChangeHandler<T> = (newState: T) => Promise<void>

export type PlayerState<T extends GameStateBasic> = T["players"][string]

export class GameContext<T extends GameStateBasic> {
  onStateChanged?: StateChangeHandler<T>
  state: T

  constructor(state: T, onStateChanged?: StateChangeHandler<T>) {
    this.onStateChanged = onStateChanged
    this.state = state
  }

  getPlayer(playerId: PlayerId): PlayerState<T> {
    return this.state.players[playerId] as PlayerState<T>
  }

  getPlayerOrder(): PlayerId[] {
    return this.state.playerOrder
  }

  getState(): T {
    return this.state
  }

  updatePlayer(playerId: PlayerId, updateSpec: Spec<PlayerState<T>>): void {
    this.updateState({
      players: {
        [playerId]: updateSpec,
      },
    } as Spec<T>)
  }

  updatePlayers(
    updateFn: (player: PlayerState<T>, playerId: PlayerId) => PlayerState<T>
  ): void {
    this.updateState({
      players: players => mapValues(players, updateFn),
    } as Spec<T>)
  }

  updateState(updateSpec: Spec<T>): void {
    this.state = update(this.state, updateSpec)
  }

  async post(): Promise<void> {
    if (this.onStateChanged) {
      await this.onStateChanged(this.state)
    }
  }
}
