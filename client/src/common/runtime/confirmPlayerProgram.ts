import update from "immutability-helper"
import { GameData, Program } from "../model/GameData"

export function confirmPlayerProgram(gameState: GameData, playerId: string, program: Program, poweredDown: boolean): GameData {
  return update(gameState, {
    players: {
      [playerId]: {
        downNext: { $set: poweredDown },
        program: { $set: program },
        ready: { $set: true },
      }
    }
  })
}
