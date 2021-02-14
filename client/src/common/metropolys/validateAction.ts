import { PlayerId } from "common/model/GameStateBasic"
import { size } from "common/utils/objects"
import {
  validateBoolean,
  validateNumber,
  validateObject,
} from "common/utils/validation"

import { BUILDINGS, DistrictId, DISTRICTS, isAdjacent } from "./model/constants"
import {
  MetropolysAction,
  MetropolysBidAction,
  MetropolysPassAction,
} from "./model/MetropolysAction"
import {
  getHighestBid,
  getPlayer,
  isAvailable,
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
  district: DistrictId,
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

  if (!isAvailable(gameState, district)) {
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
      max: size(DISTRICTS) - 1,
      min: 0,
    }),
    height: validateNumber({
      integer: true,
      max: BUILDINGS.length - 1,
      min: 0,
    }),
    pass: validateBoolean(),
  })(action)

  checkPlayerCanBid(gameState, playerId, bidAction.district, bidAction.height)

  return bidAction as MetropolysBidAction
}
