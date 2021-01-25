import { DataFetcher } from "common/firestore/collections"
import { StateChangeHandler } from "common/GameContext"
import { GameSettings, GameType } from "common/GameSettings"
import { PlayerId } from "common/model/GameStateBasic"
import { MetropolysContext } from "./MetropolysContext"
import { MetropolysAction } from "./model/MetropolysAction"
import { MetropolysEvent } from "./model/MetropolysEvent"
import { MetropolysOptions } from "./model/MetropolysOptions"
import { getInitialGameState, MetropolysState } from "./model/MetropolysState"

import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"

export const MetropolysSettings: GameSettings<GameType.METROPOLYS> = {
  type: GameType.METROPOLYS,
  defaultOptions: {},
  maxPlayers: 4,
  minPlayers: 2,

  async getInitialGameState(
    playerOrder: PlayerId[],
    _options: MetropolysOptions,
    _fetchData: DataFetcher
  ): Promise<MetropolysState> {
    return getInitialGameState(playerOrder)
  },

  async resolvePlayerAction(
    gameState: MetropolysState,
    playerId: PlayerId,
    action: MetropolysAction
  ): Promise<MetropolysState> {
    const ctx = new MetropolysContext(gameState)
    ctx.resolve(resolvePlayerAction, playerId, action)
    return ctx.getState()
  },

  async resolveState(
    gameState: MetropolysState,
    onStateChanged?: StateChangeHandler<MetropolysState, MetropolysEvent>
  ): Promise<MetropolysState> {
    const ctx = new MetropolysContext(gameState, onStateChanged)
    ctx.resolve(resolveState)
    return ctx.getState()
  },

  validateAction,
  validateOptions,
}
