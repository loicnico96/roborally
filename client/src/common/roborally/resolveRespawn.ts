import { isAbleToRespawn, respawnPlayer } from "./model/RoborallyPlayer"
import { RoborallyContext } from "./RoborallyContext"

export async function resolveRespawn(ctx: RoborallyContext) {
  const updateCount = ctx.updatePlayers(player => {
    if (isAbleToRespawn(player)) {
      return respawnPlayer(player, ctx.getCheckpoints())
    }

    return false
  })

  if (updateCount > 0) {
    await ctx.post()
  }
}
