import { CellData, isGear } from "./model/CellData"
import { Rotation } from "./model/Position"
import { isAffectedByCells, rotatePlayer } from "./model/RoborallyPlayer"
import { RoborallyContext, RoborallyEvent } from "./RoborallyContext"

export function getGearRot(cell: CellData): Rotation {
  return cell.rot ?? Rotation.NONE
}

export async function resolveGears(ctx: RoborallyContext) {
  const updateCount = ctx.updatePlayers(player => {
    const cell = ctx.getCell(player.pos)
    if (isGear(cell) && isAffectedByCells(player)) {
      const rot = getGearRot(cell)
      if (rot !== Rotation.NONE) {
        return rotatePlayer(player, rot)
      }
    }

    return false
  })

  if (updateCount > 0) {
    await ctx.post(RoborallyEvent.ROTATE)
  }
}
