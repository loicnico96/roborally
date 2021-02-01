import { GameSettings, GameType } from "common/GameSettings"

import { MetropolysContext } from "./MetropolysContext"
import { getInitialGameState } from "./model/MetropolysState"
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
    ctx.resolve(resolvePlayerAction, playerId, action)
    return ctx.getState()
  },

  async resolveState(gameState, onStateChanged) {
    const ctx = new MetropolysContext(gameState, onStateChanged)
    ctx.resolve(resolveState)
    return ctx.getState()
  },

  validateAction,
  validateOptions,
}
