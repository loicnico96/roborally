import update from "immutability-helper"
import { mapValues } from "../utils/mapValues"
import { GameData, GamePhase } from "../model/GameData"

export function startTurn(gameState: GameData): GameData {
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
