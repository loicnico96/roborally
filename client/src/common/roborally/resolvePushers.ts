import { PlayerId } from "common/model/GameStateBasic"

import { CellData, isPusher } from "./model/CellData"
import { Direction, Position } from "./model/Position"
import { isAffectedByCells } from "./model/RoborallyPlayer"
import { Move, resolveMovement } from "./resolveMovement"
import { RoborallyContext } from "./RoborallyContext"

export function getPusherDir(cell: CellData): Direction | undefined {
  return cell.pushDir
}

export function getPusherMove(
  ctx: RoborallyContext,
  pos: Position
): Move | undefined {
  const cell = ctx.getCell(pos)
  const dir = getPusherDir(cell)
  if (dir !== undefined) {
    return { dir, push: true }
  }

  return undefined
}

export function getPusherMoves(
  ctx: RoborallyContext,
  sequence: number
): Record<PlayerId, Move> {
  return ctx.getPlayerOrder().reduce((moves, playerId) => {
    const player = ctx.getPlayer(playerId)
    const cell = ctx.getCell(player.pos)
    if (isPusher(cell, sequence) && isAffectedByCells(player)) {
      const move = getPusherMove(ctx, player.pos)
      if (move !== undefined) {
        moves[playerId] = move
      }
    }
    return moves
  }, {} as Record<PlayerId, Move>)
}

export async function resolvePushers(ctx: RoborallyContext, sequence: number) {
  await resolveMovement(ctx, getPusherMoves(ctx, sequence))
}
