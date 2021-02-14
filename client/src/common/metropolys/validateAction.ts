import { PlayerId } from "common/model/GameStateBasic"
import {
  validateBoolean,
  validateNumber,
  validateObject,
} from "common/utils/validation"

import { isAdjacent } from "./model/constants"
import {
  MetropolysAction,
  MetropolysBidAction,
  MetropolysPassAction,
} from "./model/MetropolysAction"
import {
  getHighestBid,
  getPlayer,
  MetropolysState,
} from "./model/MetropolysState"

export function checkPlayerCanPass(gameState: MetropolysState) {
  const highestBid = getHighestBid(gameState)
  if (highestBid === undefined) {
    throw Error("Cannot pass the first bid")
  }
}

export function checkPlayerCanBid(
  gameState: MetropolysState,
  playerId: PlayerId,
  district: number,
  height: number
) {
  const highestBid = getHighestBid(gameState)
  const player = getPlayer(gameState, playerId)

  if (player.buildings[height] !== true) {
    throw Error("Building is not available")
  }

  if (highestBid !== undefined && highestBid.height >= height) {
    throw Error("Building is not high enough")
  }

  if (gameState.districts[district].building !== undefined) {
    throw Error("District is not available")
  }

  if (gameState.bids.some(bid => bid.district === district)) {
    throw Error("District is not available")
  }

  if (highestBid !== undefined && !isAdjacent(district, highestBid.district)) {
    throw Error("District is not adjacent")
  }
}

export function validateAction(
  gameState: MetropolysState,
  playerId: PlayerId,
  action: unknown
): MetropolysAction {
  const passAction = validateObject({
    pass: validateBoolean(),
  })(action)

  if (passAction.pass) {
    checkPlayerCanPass(gameState)
    return passAction as MetropolysPassAction
  }

  const bidAction = validateObject({
    district: validateNumber({
      integer: true,
      max: 54,
      min: 0,
    }),
    height: validateNumber({
      integer: true,
      max: 12,
      min: 0,
    }),
    pass: validateBoolean(),
  })(action)

  checkPlayerCanBid(gameState, playerId, bidAction.district, bidAction.height)

  return bidAction as MetropolysBidAction
}
