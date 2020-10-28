import update from "immutability-helper"
import { GameData } from "../../../client/src/common/GameData";

export function readyPlayerForTurn(gameState: GameData, playerId: string): GameData {
  return update(gameState, {
    players: {
      [playerId]: {
        ready: { $set: true },
      }
    }
  })
}
