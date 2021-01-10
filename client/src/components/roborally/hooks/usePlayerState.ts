import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"
import { RoborallyState } from "common/roborally/model/RoborallyState"

import { useGameState } from "./useGameState"

export function getPlayerState(
  state: RoborallyState,
  playerId: PlayerId
): RoborallyPlayer {
  return state.players[playerId]
}

export function usePlayerState<T>(
  playerId: PlayerId,
  selector: (state: RoborallyPlayer) => T
): T {
  return useGameState(
    useCallback(state => selector(getPlayerState(state, playerId)), [
      playerId,
      selector,
    ])
  )
}
