import { MetropolysPlayer } from "common/metropolys/model/MetropolysPlayer"
import { MetropolysState } from "common/metropolys/model/MetropolysState"
import { PlayerId } from "common/model/GameStateBasic"

export function getCurrentPlayer(state: MetropolysState): PlayerId {
  return state.currentPlayer
}

export function getCurrentTurn(state: MetropolysState): number {
  return state.turn
}

export function getPlayer(
  state: MetropolysState,
  playerId: PlayerId
): MetropolysPlayer {
  return state.players[playerId]
}

export function getPlayerIds(state: MetropolysState): PlayerId[] {
  return state.playerOrder
}
