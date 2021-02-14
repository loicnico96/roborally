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
  return getBids(state).find(bid => bid.district === district)
}

export function getDistrict(
  state: MetropolysState,
  district: DistrictId
): District | undefined {
  return state.districts[district]
}

export function getHighestBid(state: MetropolysState): Bid | undefined {
  const bids = getBids(state)
  return bids[bids.length - 1]
}

export function getPlayer(
  state: MetropolysState,
  playerId: PlayerId
): MetropolysPlayer {
  return state.players[playerId]
}

export function getMostMetroCount(state: MetropolysState): number {
  const { mostMetro } = state
  if (mostMetro !== null) {
    return getTokenCount(getPlayer(state, mostMetro), Token.METRO)
  } else {
    return 0
  }
}

export function isAvailable(
  state: MetropolysState,
  district: DistrictId
): boolean {
  const stateDistrict = getDistrict(state, district)

  return (
    stateDistrict !== undefined &&
    stateDistrict.building === undefined &&
    getBidForDistrict(state, district) === undefined
  )
}

export function isLastRuinsPlayer(
  state: MetropolysState,
  playerId: PlayerId
): boolean {
  return state.lastRuins === playerId
}

export function isMostMetroPlayer(
  state: MetropolysState,
  playerId: PlayerId
): boolean {
  return state.mostMetro === playerId
}
