import { isRepair } from "./model/CellData"
import { isAbleToRepair, repairPlayer } from "./model/RoborallyPlayer"
import { RoborallyContext, RoborallyEvent } from "./RoborallyContext"

export async function resolveRepairs(ctx: RoborallyContext) {
  const updateCount = ctx.updatePlayers(player => {
    const cell = ctx.getCell(player.pos)
    if (isRepair(cell) && isAbleToRepair(player)) {
      return repairPlayer(player, 1)
    }

    return false
  })

  if (updateCount > 0) {
    await ctx.post(RoborallyEvent.REPAIR)
  }
}
