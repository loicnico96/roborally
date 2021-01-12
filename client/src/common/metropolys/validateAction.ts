import { PlayerId } from "common/model/GameStateBasic"
import {
  validateBoolean,
  validateNumber,
  validateObject,
} from "common/utils/validation"

import { MetropolysAction } from "./MetropolysSettings"
import { BUILDING_COUNT, DISTRICT_COUNT, isAdjacent } from "./model/board"
import { isAvailableBuilding } from "./model/MetropolysPlayer"
import {
  getHighestBid,
  getPlayer,
  isAvailable,
  isPlayerCanPass,
  MetropolysState,
} from "./model/MetropolysState"

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
      max: DISTRICT_COUNT - 1,
    }),
    height: validateNumber({
      integer: true,
      min: 0,
      max: BUILDING_COUNT - 1,
    }),
  })(action)

  const player = getPlayer(state, playerId)
  if (!isAvailableBuilding(player, height)) {
    throw Error("Building is not available")
  }

  const highestBid = getHighestBid(state)
  if (highestBid && highestBid.height >= height) {
    throw Error("Building is too low")
  }

  if (highestBid && !isAdjacent(highestBid.district, district)) {
    throw Error("District is not adjacent")
  }

  if (!isAvailable(state, district)) {
    throw Error("District is not available")
  }

  return { district, height, pass }
}
