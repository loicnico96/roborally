import { isRepair } from "./model/CellData"
import { RoborallyContext } from "./model/RoborallyContext"
import { RoborallyEvent } from "./model/RoborallyEvent"
import { isAbleToRepair, repairPlayer } from "./model/RoborallyPlayer"

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
