import { PlayerId } from "common/model/GameStateBasic"
import { CellData, CellType, isCellType } from "./model/CellData"
import { isAffectedByCells } from "./model/RoborallyPlayer"
import { Move, resolveMoves } from "./resolveMoves"
import { RoborallyContext } from "./RoborallyContext"

export function getCellMove(cell: CellData): Move {
  return {
    dir: cell.dir,
    rot: cell.rot,
  }
}

export function getBoardMoves(
  ctx: RoborallyContext,
  activeCells: CellType[]
): Record<PlayerId, Move> {
  return ctx.getPlayerOrder().reduce((moves, playerId) => {
    const player = ctx.getPlayer(playerId)
    const cell = ctx.getCell(player.pos)
    if (isAffectedByCells(player) && isCellType(cell, activeCells)) {
      moves[playerId] = getCellMove(cell)
    }
    return moves
  }, {} as Record<PlayerId, Move>)
}

export async function resolveBoardMoves(
  ctx: RoborallyContext,
  activeCells: CellType[]
) {
  await resolveMoves(ctx, getBoardMoves(ctx, activeCells))
}
