import {
  isAffectedByCheckpoint,
  isAlive,
  triggerPlayerCheckpoint,
} from "./model/RoborallyPlayer"
import { RoborallyContext } from "./RoborallyContext"

export async function checkWinCondition(ctx: RoborallyContext) {
  const winners = ctx.filterPlayers(player => {
    const checkpoint = ctx.getCheckpointAtPosition(player.pos)
    return isAlive(player) && checkpoint === ctx.getLastCheckpoint()
  })

  if (winners.length > 0) {
    // TODO: Win
    await ctx.post()
  }
}

export async function resolveCheckpoints(ctx: RoborallyContext) {
  const updateCount = ctx.updatePlayers(player => {
    const checkpoint = ctx.getCheckpointAtPosition(player.pos)
    if (
      checkpoint !== undefined &&
      isAffectedByCheckpoint(player, checkpoint)
    ) {
      return triggerPlayerCheckpoint(player, checkpoint)
    } else {
      return false
    }
  })

  if (updateCount > 0) {
    await ctx.post()
    await checkWinCondition(ctx)
  }
}
