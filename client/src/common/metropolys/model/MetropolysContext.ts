import { GameContext } from "common/model/GameContext"
import { PlayerId } from "common/model/GameStateBasic"
import { range } from "common/utils/math"

import { DistrictId, getAdjacentDistricts } from "./constants"
import { MetropolysEvent } from "./MetropolysEvent"
import {
  Bid,
  District,
  getCurrentPlayerId,
  getDistrict,
  getHighestBid,
  isAvailable,
  MetropolysState,
} from "./MetropolysState"

export class MetropolysContext extends GameContext<
  MetropolysState,
  MetropolysEvent
> {
  getDistrict(district: DistrictId): District | undefined {
    return getDistrict(this.getState(), district)
  }

  getHighestBid(): Bid | undefined {
    return getHighestBid(this.getState())
  }

  getCurrentPlayerId(): PlayerId {
    return getCurrentPlayerId(this.getState())
  }

  getNextPlayerId(highestBid: Bid): PlayerId | undefined {
    const availableDistricts = getAdjacentDistricts(
      highestBid.district
    ).filter(district => isAvailable(this.getState(), district))

    if (availableDistricts.length === 0) {
      return undefined
    }

    const playerOrder = this.getPlayerOrder()
    const playerCount = playerOrder.length

    const currentPlayerId = this.getCurrentPlayerId()
    const currentPlayerIndex = playerOrder.indexOf(currentPlayerId)

    return range(1, playerCount)
      .map(index => playerOrder[(currentPlayerIndex + index) % playerCount])
      .find(nextPlayerId => {
        if (nextPlayerId === highestBid.playerId) {
          return false
        }

        const nextPlayer = this.getPlayer(nextPlayerId)
        if (nextPlayer.pass) {
          return false
        }

        const hasPlayableBuilding = nextPlayer.buildings.some(
          (available, height) => available && height > highestBid.height
        )
        if (!hasPlayableBuilding) {
          this.updatePlayer(nextPlayerId, { pass: { $set: true } })
          return false
        }

        return true
      })
  }

  isEndOfGame(): boolean {
    return (
      this.findPlayer(player => {
        const { buildings } = player
        return buildings.every(available => !available)
      }) !== undefined
    )
  }
}
