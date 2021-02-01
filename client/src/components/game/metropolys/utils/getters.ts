import { MetropolysPlayer } from "common/metropolys/model/MetropolysPlayer"
import { MetropolysState } from "common/metropolys/model/MetropolysState"
import { PlayerId } from "common/model/GameStateBasic"

export function getCurrentTurn(state: MetropolysState): number {
  return state.turn
}

export function getPlayer(
  state: MetropolysState,
  playerId: PlayerId
): MetropolysPlayer {
  return state.players[playerId]
}

export function getPlayerOrder(state: MetropolysState): PlayerId[] {
  return state.playerOrder
}

export function getPlayerName(player: MetropolysPlayer): string {
  return player.name
}
