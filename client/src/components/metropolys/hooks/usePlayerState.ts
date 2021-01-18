import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"

import { useGameState } from "./useGameState"
import { MetropolysPlayer } from "common/metropolys/model/MetropolysPlayer"
import { MetropolysState } from "common/metropolys/model/MetropolysState"

export function getPlayerState(
  state: MetropolysState,
  playerId: PlayerId
): MetropolysPlayer {
  return state.players[playerId]
}

export function usePlayerState<T>(
  playerId: PlayerId,
  selector: (state: MetropolysPlayer) => T
): T {
  return useGameState(
    useCallback(state => selector(getPlayerState(state, playerId)), [
      playerId,
      selector,
    ])
  )
}
