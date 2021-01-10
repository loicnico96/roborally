import {
  isAffectedByCheckpoint,
  isAlive,
  triggerPlayerCheckpoint,
} from "./model/RoborallyPlayer"
import { RoborallyContext, RoborallyEvent } from "./RoborallyContext"

export async function checkWinCondition(ctx: RoborallyContext) {
  const winners = ctx.filterPlayers(player => {
    const checkpoint = ctx.getCheckpointAtPosition(player.pos)
    return isAlive(player) && checkpoint === ctx.getLastCheckpoint()
  })

  if (winners.length > 0) {
    ctx.win(winners)
  }
}

export async function resolveCheckpoints(ctx: RoborallyContext) {
  const updateCount = ctx.updatePlayers(player => {
    const checkpoint = ctx.getCheckpointAtPosition(player.pos)
    if (checkpoint !== undefined) {
      if (isAffectedByCheckpoint(player, checkpoint)) {
        return triggerPlayerCheckpoint(player, checkpoint)
      }
    }

    return false
  })

  if (updateCount > 0) {
    await ctx.post(RoborallyEvent.CHECKPOINT)
    await checkWinCondition(ctx)
  }
}
