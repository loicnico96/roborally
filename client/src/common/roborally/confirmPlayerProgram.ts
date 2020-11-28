import update from "immutability-helper"

import { Program } from "./model/Program"
import { RoborallyState } from "./model/RoborallyState"

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
