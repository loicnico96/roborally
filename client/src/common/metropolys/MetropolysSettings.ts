import { GameSettings, GameType } from "common/GameSettings"

import { getInitialGameState } from "./getInitialGameState"
import { MetropolysContext } from "./model/MetropolysContext"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"

export const MetropolysSettings: GameSettings<GameType.METROPOLYS> = {
  defaultOptions: {},
  maxPlayers: 4,
  minPlayers: 2,

  async getInitialGameState({ playerOrder, players }) {
    return getInitialGameState(playerOrder, players)
  },

  async resolvePlayerAction(gameState, playerId, action) {
    const ctx = new MetropolysContext(gameState)
    await ctx.resolve(resolvePlayerAction, playerId, action)
    return ctx.getState()
  },

  async resolveState(gameState, onStateChanged) {
    const ctx = new MetropolysContext(gameState, onStateChanged)
    await ctx.resolve(resolveState)
    return ctx.getState()
  },

  validateAction,
  validateOptions,
}
