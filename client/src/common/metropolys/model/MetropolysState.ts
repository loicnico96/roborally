import { GameStateBasic, PlayerId } from "common/model/GameStateBasic"

import { DistrictId } from "./constants"
import { getTokenCount, MetropolysPlayer } from "./MetropolysPlayer"
import { Token } from "./Token"

export type DistrictBuilding = {
  height: number
  playerId: PlayerId
}

export type District = {
  building?: DistrictBuilding
  token?: Token
}

export type Bid = {
  district: DistrictId
  height: number
  playerId: PlayerId
}

export type MetropolysState = GameStateBasic & {
  bids: Bid[]
  currentPlayer: PlayerId
  districts: District[]
  lastRuins: PlayerId | null
  mostMetro: PlayerId | null
  players: Record<PlayerId, MetropolysPlayer>
}

export function getBids(state: MetropolysState): Bid[] {
  return state.bids
}

export function getBidForDistrict(
  state: MetropolysState,
  district: DistrictId
): Bid | undefined {
  return state.bids.find(bid => bid.district === district)
}

export function getDistrict(
  state: MetropolysState,
  district: DistrictId
): District | undefined {
  return state.districts[district]
}

export function getHighestBid(state: MetropolysState): Bid | undefined {
  return state.bids[state.bids.length - 1]
}

export function getPlayer(state: MetropolysState, playerId: PlayerId) {
  return state.players[playerId]
}

export function getCurrentPlayerId(state: MetropolysState): PlayerId {
  return state.currentPlayer
}

export function getLastRuinsPlayerId(state: MetropolysState): PlayerId | null {
  return state.lastRuins
}

export function getMostMetroPlayerId(state: MetropolysState): PlayerId | null {
  return state.mostMetro
}

export function getMostMetroCount(state: MetropolysState): number {
  const playerId = getMostMetroPlayerId(state)
  if (playerId !== null) {
    return getTokenCount(getPlayer(state, playerId), Token.METRO)
  } else {
    return 0
  }
}

export function isAvailable(state: MetropolysState, district: DistrictId) {
  const stateDistrict = getDistrict(state, district)

  return (
    stateDistrict !== undefined &&
    stateDistrict.building === undefined &&
    getBidForDistrict(state, district) === undefined
  )
}
