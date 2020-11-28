import { PlayerId } from "common/model/GameStateBasic"

import {
  CellData,
  isConveyor,
  isFastConveyor,
  isTurnConveyor,
} from "./model/CellData"
import {
  Direction,
  getDir,
  movePos,
  Position,
  Rotation,
} from "./model/Position"
import { isAffectedByCells } from "./model/RoborallyPlayer"
import { Move, resolveMovement } from "./resolveMovement"
import { RoborallyContext } from "./RoborallyContext"

export function getConveyorDir(cell: CellData): Direction | undefined {
  return cell.dir
}

export function getConveyorRot(
  ctx: RoborallyContext,
  pos: Position,
  dir: Direction
): Rotation {
  const nextPos = movePos(pos, dir, 1)
  const nextCell = ctx.getCell(nextPos)
  if (isTurnConveyor(nextCell)) {
    const nextDir = getConveyorDir(nextCell)
    switch (nextDir) {
      case getDir(dir + Rotation.LEFT):
        return Rotation.LEFT
      case getDir(dir + Rotation.RIGHT):
        return Rotation.RIGHT
      default:
    }
  }

  return Rotation.NONE
}

export function getConveyorMove(
  ctx: RoborallyContext,
  pos: Position
): Move | undefined {
  const cell = ctx.getCell(pos)
  const dir = getConveyorDir(cell)
  if (dir !== undefined) {
    const rot = getConveyorRot(ctx, pos, dir)
    return { dir, rot }
  }

  return undefined
}

export function getConveyorMoves(
  ctx: RoborallyContext,
  fastOnly: boolean = false
): Record<PlayerId, Move> {
  return ctx.getPlayerOrder().reduce((moves, playerId) => {
    const player = ctx.getPlayer(playerId)
    const cell = ctx.getCell(player.pos)
    if (isConveyor(cell) && isAffectedByCells(player)) {
      if (isFastConveyor(cell) || !fastOnly) {
        const move = getConveyorMove(ctx, player.pos)
        if (move !== undefined) {
          moves[playerId] = move
        }
      }
    }
    return moves
  }, {} as Record<PlayerId, Move>)
}

export async function resolveConveyors(
  ctx: RoborallyContext,
  fastOnly: boolean = false
) {
  await resolveMovement(ctx, getConveyorMoves(ctx, fastOnly))
}
