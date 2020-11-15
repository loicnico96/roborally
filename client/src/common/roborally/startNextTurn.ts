import { mapValues, merge } from "common/utils/objects"
import { getEmptyProgram } from "./model/Program"
import { getLockedProgram, RoborallyPlayer } from "./model/RoborallyPlayer"
import { GamePhase } from "./model/RoborallyState"
import { RoborallyContext } from "./RoborallyContext"

export function playerNextTurn(player: RoborallyPlayer): RoborallyPlayer {
  return merge(player, {
    cards: [],
    damage: player.downNext ? 0 : player.damage,
    down: player.downNext,
    downNext: false,
    program: player.downNext ? getEmptyProgram() : getLockedProgram(player),
    ready: false,
  })
}

export async function startNextTurn(ctx: RoborallyContext) {
  ctx.updateState({
    phase: { $set: GamePhase.STANDBY },
    players: players => mapValues(players, playerNextTurn),
    turn: turn => turn + 1,
  })
  await ctx.post()
}
