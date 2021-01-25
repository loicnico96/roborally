import { GameContext } from "common/GameContext"
import { MetropolysEvent } from "./model/MetropolysEvent"
import { MetropolysState } from "./model/MetropolysState"

export class MetropolysContext extends GameContext<
  MetropolysState,
  MetropolysEvent
> {}
