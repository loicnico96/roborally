import update from "immutability-helper"
import { mapValues } from "../utils/objects"
import { GameState, GamePhase } from "../model/GameState"

export function nextTurn(gameState: GameState): GameState {
  return update(gameState, {
    turn: turn => turn + 1,
    phase: { $set: GamePhase.STANDBY },
    players: players =>
      mapValues(players, player =>
        update(player, {
          damage: { $set: player.downNext ? 0 : player.damage },
          down: { $set: player.downNext },
          downNext: { $set: false },
          ready: { $set: false },
        })
      ),
  })
}
