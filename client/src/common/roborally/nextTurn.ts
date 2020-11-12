import update from "immutability-helper"
import { mapValues } from "common/utils/objects"
import { RoborallyState, GamePhase } from "./model/RoborallyState"

export function nextTurn(gameState: RoborallyState): RoborallyState {
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
