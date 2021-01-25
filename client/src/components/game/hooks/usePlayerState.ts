import { useCallback } from "react"

import { GameState, GameType } from "common/GameSettings"
import { PlayerId } from "common/model/GameStateBasic"

import { useGameState } from "./useGameState"

export type PlayerState<T extends GameType> = GameState<T>["players"][PlayerId]

export function getPlayerState<T extends GameType>(
  state: GameState<T>,
  playerId: PlayerId
): PlayerState<T> {
  return state.players[playerId] as PlayerState<T>
}

export function usePlayerState<T extends GameType, S>(
  gameType: T,
  playerId: PlayerId,
  selector: (state: PlayerState<T>) => S
): S {
  return useGameState(
    gameType,
    useCallback(state => selector(getPlayerState(state, playerId)), [
      playerId,
      selector,
    ])
  )
}
