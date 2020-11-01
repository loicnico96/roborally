import update from "immutability-helper"
import { mapValues } from "../utils/mapValues"
import { GameState, GamePhase } from "../model/GameState"

export function resolveTurn(gameState: GameState): GameState {
  return update(gameState, {
    turn: turn => turn + 1,
    phase: { $set: GamePhase.STANDBY },
    players: players => mapValues(players, player => update(player, {
      ready: { $set: false },
    })),
  })
}
