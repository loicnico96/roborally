import { GameContext } from "common/GameContext"
import { PlayerId } from "common/model/GameStateBasic"

import { MetropolysPlayer } from "./model/MetropolysPlayer"
import { Bid, District, MetropolysState } from "./model/MetropolysState"

export type MetropolysEvent = string

export class MetropolysContext extends GameContext<
  MetropolysPlayer,
  MetropolysState,
  MetropolysEvent
> {
  getBids(): Bid[] {
    return this.state.bids
  }

  getCurrentPlayerId(): PlayerId {
    return this.state.currentPlayer
  }

  getDistrict(district: number): District {
    return this.state.districts[district]
  }

  getHighestBid(): Bid | null {
    const bids = this.getBids()
    return bids[bids.length - 1] ?? null
  }
}
