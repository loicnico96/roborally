import update from "immutability-helper"

import { RoborallyState } from "./model/RoborallyState"

export function readyPlayerForTurn(
  gameState: RoborallyState,
  playerId: string
): RoborallyState {
  return update(gameState, {
    players: {
      [playerId]: {
        ready: { $set: true },
      },
    },
  })
}
