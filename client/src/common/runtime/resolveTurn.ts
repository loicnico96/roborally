import update from "immutability-helper"
import { mapValues } from "../utils/mapValues"
import { GameData, GamePhase } from "../model/GameData"

export function resolveTurn(gameState: GameData): GameData {
  return update(gameState, {
    turn: turn => turn + 1,
    phase: { $set: GamePhase.STANDBY },
    players: players =>
      mapValues(players, player =>
        update(player, {
          ready: { $set: false },
        })
      ),
  })
}
