import update from "immutability-helper"
import { GameState } from "./model/GameState"
import { Program } from "./model/Program"

export function confirmPlayerProgram(
  gameState: GameState,
  playerId: string,
  program: Program,
  poweredDown: boolean
): GameState {
  return update(gameState, {
    players: {
      [playerId]: {
        downNext: { $set: poweredDown },
        program: { $set: program },
        ready: { $set: true },
      },
    },
  })
}
