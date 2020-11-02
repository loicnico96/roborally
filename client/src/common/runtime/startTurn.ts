import update from "immutability-helper"
import { mapValues } from "../utils/mapValues"
import { GameState, GamePhase } from "../model/GameState"

export function startTurn(gameState: GameState): GameState {
  return update(gameState, {
    phase: { $set: GamePhase.PROGRAM },
    players: players =>
      mapValues(players, player =>
        update(player, {
          ready: { $set: false },
        })
      ),
  })
}
