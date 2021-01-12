import { PlayerId } from "common/model/GameStateBasic"
import {
  validateBoolean,
  validateNumber,
  validateObject,
} from "common/utils/validation"

import { MetropolysAction } from "./MetropolysSettings"
import { MetropolysPlayer } from "./model/MetropolysPlayer"
import { Bid, District, MetropolysState } from "./model/MetropolysState"

function getBids(state: MetropolysState): Bid[] {
  return state.bids
}

function getHighestBid(state: MetropolysState): Bid | null {
  const bids = getBids(state)
  return bids[bids.length - 1] ?? null
}

function getPlayer(
  state: MetropolysState,
  playerId: PlayerId
): MetropolysPlayer {
  return state.players[playerId]
}

function getDistrict(state: MetropolysState, district: number): District {
  return state.districts[district]
}

function hasBuilding(player: MetropolysPlayer, height: number): boolean {
  return player.buildings[height] === true
}

function isAdjacentDistrict(): boolean {
  //state: MetropolysState,
  //districtA: number,
  //districtB: number
  // TODO Determine adjacency
  return true
}

function isBuilt(state: MetropolysState, district: number): boolean {
  return getDistrict(state, district).building !== undefined
}

function isPlayerCanPass(state: MetropolysState): boolean {
  return getHighestBid(state) !== null
}

export function validateAction(
  state: MetropolysState,
  playerId: PlayerId,
  action: unknown
): MetropolysAction {
  const { pass } = validateObject({
    pass: validateBoolean(),
  })(action)

  if (pass) {
    if (isPlayerCanPass(state)) {
      return { pass }
    } else {
      throw Error("Cannot pass")
    }
  }

  const { district, height } = validateObject({
    district: validateNumber({
      integer: true,
      min: 0,
    }),
    height: validateNumber({
      integer: true,
      min: 0,
      max: 12,
    }),
  })(action)

  const player = getPlayer(state, playerId)
  if (!hasBuilding(player, height)) {
    throw Error("Building is not available")
  }

  const highestBid = getHighestBid(state)
  if (highestBid && highestBid.height >= height) {
    throw Error("Building is too low")
  }

  if (isBuilt(state, district)) {
    throw Error("District is not available")
  }

  if (getBids(state).some(bid => bid.district === district)) {
    throw Error("District is not available")
  }

  if (
    highestBid &&
    !(isAdjacentDistrict(/* state, highestBid.district, district */))
  ) {
    throw Error("District is not adjacent")
  }

  return { district, height, pass }
}
