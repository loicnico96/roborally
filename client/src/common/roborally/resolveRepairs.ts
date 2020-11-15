import { CellType, isCellType } from "./model/CellData"
import { isAbleToRepair, repairPlayer } from "./model/RoborallyPlayer"
import { RoborallyContext } from "./RoborallyContext"

export async function resolveRepairs(ctx: RoborallyContext) {
  const updateCount = ctx.updatePlayers(player => {
    const cell = ctx.getCell(player.pos)
    if (isAbleToRepair(player) && isCellType(cell, [CellType.REPAIR])) {
      return repairPlayer(player, 1)
    } else {
      return false
    }
  })

  if (updateCount > 0) {
    await ctx.post()
  }
}
