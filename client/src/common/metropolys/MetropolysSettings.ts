import { BaseSettings } from "common/GameSettings"
import { constructorOf } from "common/utils/types"

import { getInitialGameState } from "./getInitialGameState"
import { MetropolysContext, MetropolysEvent } from "./MetropolysContext"
import { MetropolysPlayer } from "./model/MetropolysPlayer"
import { MetropolysState } from "./model/MetropolysState"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"


export type MetropolysActionBid = {
  district: number
  height: number
  pass: false
}

export type MetropolysActionPass = {
  pass: true
}

export type MetropolysAction = MetropolysActionBid | MetropolysActionPass

export type MetropolysOptions = {
  // TOD
}

export const MetropolysSettings: BaseSettings<
  MetropolysPlayer,
  MetropolysState,
  MetropolysOptions,
  MetropolysEvent,
  MetropolysContext,
  MetropolysAction
> = {
  getContext: constructorOf(MetropolysContext),

  defaultOptions: {},

  maxPlayers: 5,
  minPlayers: 2,

  getInitialGameState,
  resolvePlayerAction,
  resolveState,
  validateAction,
  validateOptions,
}
