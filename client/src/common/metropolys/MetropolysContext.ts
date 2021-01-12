import { GameContext } from "common/GameContext"

import { MetropolysPlayer } from "./model/MetropolysPlayer"
import { Bid, MetropolysState } from "./model/MetropolysState"

export type MetropolysEvent = string

export class MetropolysContext extends GameContext<
  MetropolysPlayer,
  MetropolysState,
  MetropolysEvent
> {
  getHighestBid(): Bid | undefined {
    return this.state.bids[this.state.bids.length - 1]
  }
}
