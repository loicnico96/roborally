import { GameContext } from "common/model/GameContext"
import { PlayerId } from "common/model/GameStateBasic"
import { range } from "common/utils/math"

import { MetropolysEvent } from "./MetropolysEvent"
import {
  Bid,
  District,
  getDistrict,
  getHighestBid,
  MetropolysState,
} from "./MetropolysState"

export class MetropolysContext extends GameContext<
  MetropolysState,
  MetropolysEvent
> {
  getDistrict(district: number): District {
    return getDistrict(this.getState(), district)
  }

  getHighestBid(): Bid | undefined {
    return getHighestBid(this.getState())
  }

  getCurrentPlayerId(): PlayerId {
    return this.getState().currentPlayer
  }

  getNextPlayerId(highestBid: Bid): PlayerId | undefined {
    // Check district adjacency

    const playerOrder = this.getPlayerOrder()
    const playerCount = playerOrder.length

    const currentPlayerId = this.getCurrentPlayerId()
    const currentPlayerIndex = playerOrder.indexOf(currentPlayerId)

    return range(1, playerCount)
      .map(index => playerOrder[(currentPlayerIndex + index) % playerCount])
      .find(nextPlayerId => {
        const nextPlayer = this.getPlayer(nextPlayerId)
        // Skip players who have passed during this round
        if (nextPlayer.pass) {
          return false
        }

        // Skip players who don't have a high enough building to outbid
        return nextPlayer.buildings.some(
          (available, height) => available && height > highestBid.height
        )
      })
  }

  isEndOfGame(playerId: PlayerId): boolean {
    const { buildings } = this.getPlayer(playerId)
    return buildings.every(available => !available)
  }
}
