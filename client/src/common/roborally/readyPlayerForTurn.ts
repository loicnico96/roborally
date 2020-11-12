import update from "immutability-helper"
import { GameState } from "./model/GameState"

export function readyPlayerForTurn(
  gameState: GameState,
  playerId: string
): GameState {
  return update(gameState, {
    players: {
      [playerId]: {
        ready: { $set: true },
      },
    },
  })
}
