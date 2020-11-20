import { isCrusher } from "./model/CellData"
import { isAffectedByCells, destroyPlayer } from "./model/RoborallyPlayer"
import { RoborallyContext } from "./RoborallyContext"

export async function resolveCrushers(ctx: RoborallyContext, sequence: number) {
  const updateCount = ctx.updatePlayers(player => {
    const cell = ctx.getCell(player.pos)
    if (isCrusher(cell, sequence) && isAffectedByCells(player)) {
      return destroyPlayer(player)
    }

    return false
  })

  if (updateCount > 0) {
    await ctx.post()
  }
}
