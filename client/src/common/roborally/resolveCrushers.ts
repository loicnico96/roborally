import { isCrusher } from "./model/CellData"
import { RoborallyContext } from "./model/RoborallyContext"
import { RoborallyEvent } from "./model/RoborallyEvent"
import { isAffectedByCells, destroyPlayer } from "./model/RoborallyPlayer"

export async function resolveCrushers(ctx: RoborallyContext, sequence: number) {
  const updateCount = ctx.updatePlayers(player => {
    const cell = ctx.getCell(player.pos)
    if (isCrusher(cell, sequence) && isAffectedByCells(player)) {
      return destroyPlayer(player)
    }

    return false
  })

  if (updateCount > 0) {
    await ctx.post(RoborallyEvent.DESTROY)
  }
}
