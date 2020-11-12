import update from "immutability-helper"
import { RoborallyState } from "./model/RoborallyState"
import { Program } from "./model/Program"

export function confirmPlayerProgram(
  gameState: RoborallyState,
  playerId: string,
  program: Program,
  poweredDown: boolean
): RoborallyState {
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
