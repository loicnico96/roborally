import { MetropolysPlayer } from "common/metropolys/model/MetropolysPlayer"
import { MetropolysState } from "common/metropolys/model/MetropolysState"

export function getPlayerOrder(state: MetropolysState) {
  return state.playerOrder
}

export function getPlayerBuildings(player: MetropolysPlayer) {
  return player.buildings
}

export function getPlayerColor(player: MetropolysPlayer) {
  return player.color
}

export function getPlayerName(player: MetropolysPlayer) {
  return player.name
}

export function getPlayerPass(player: MetropolysPlayer) {
  return player.pass
}

export function getPlayerReady(player: MetropolysPlayer) {
  return player.ready
}

export function getPlayerShape(player: MetropolysPlayer) {
  return player.shape
}

export function getPlayerTokens(player: MetropolysPlayer) {
  return player.tokens
}
