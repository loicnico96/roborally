import { GameStateBasic, PlayerId } from "common/model/GameStateBasic"

import { getColor } from "./board"
import { MetropolysPlayer } from "./MetropolysPlayer"
import { TokenType } from "./TokenType"

export type Bid = {
  district: number
  height: number
  playerId: PlayerId
}

export type DistrictBuilding = {
  height: number
  playerId: PlayerId
}

export type District = {
  building?: DistrictBuilding
  token?: TokenType
}

export type MetropolysState = GameStateBasic<MetropolysPlayer> & {
  bids: Bid[]
  districts: District[]
  currentPlayer: PlayerId
  mostMetro: PlayerId | null
  lastRuins: PlayerId | null
}

export function getBids(state: MetropolysState): Bid[] {
  return state.bids
}

export function getHighestBid(state: MetropolysState): Bid | null {
  return state.bids[state.bids.length - 1] ?? null
}

export function getPlayer(
  state: MetropolysState,
  playerId: PlayerId
): MetropolysPlayer {
  return state.players[playerId]
}

export function getDistrict(
  state: MetropolysState,
  district: number
): District {
  return state.districts[district]
}

export function getScore(state: MetropolysState, playerId: PlayerId): number {
  const { color, tokens } = getPlayer(state, playerId)

  const districts = state.districts
    .filter(district => district.building?.playerId === playerId)
    .map((_, index) => index)

  const fancyTokens = tokens[TokenType.FANCY] ?? 0
  const metroTokens = tokens[TokenType.METRO] ?? 0
  const ruinsTokens = tokens[TokenType.RUINS] ?? 0

  const colorDistricts = districts.filter(district => getColor(district) === color).length

  let score = 0

  score += colorDistricts * 2

  // TODO: Area mission points

  score += fancyTokens * 3

  score += metroTokens * 1
  if (state.mostMetro === playerId) {
    score += 3
  }

  score -= ruinsTokens * 1
  if (state.lastRuins === playerId) {
    score -= 2
  }

  // TODO: End-of-game highest building points

  return score
}

export function isAvailable(state: MetropolysState, district: number): boolean {
  if (getDistrict(state, district).building !== undefined) {
    return false
  }

  if (getBids(state).some(bid => bid.district === district)) {
    return false
  }

  return true
}

export function isPlayerCanPass(state: MetropolysState): boolean {
  return getHighestBid(state) !== null
}
