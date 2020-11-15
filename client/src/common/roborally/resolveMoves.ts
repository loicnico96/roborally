import { PlayerId } from "common/model/GameStateBasic"
import { WallType } from "./model/Board"
import { isHole } from "./model/CellData"
import { Direction, isSamePos, Rotation } from "./model/Position"
import {
  destroyPlayer,
  isAffectedByHoles,
  isAffectedByPlayers,
  isAffectedByWalls,
  movePlayer,
  RoborallyPlayer,
  rotatePlayer,
} from "./model/RoborallyPlayer"
import { RoborallyContext } from "./RoborallyContext"

export type Move = {
  dir?: Direction
  rot?: Rotation
}

export function isPossibleMove(
  ctx: RoborallyContext,
  playerId: PlayerId,
  move: Move
): boolean {
  const player = ctx.getPlayer(playerId)
  if (move.dir !== undefined && isAffectedByWalls(player)) {
    return ctx.getWall(player.pos, move.dir) === WallType.NONE
  } else {
    return true
  }
}

export function isColliding(
  player1: RoborallyPlayer,
  player2: RoborallyPlayer
): boolean {
  if (isAffectedByPlayers(player1) && isAffectedByPlayers(player2)) {
    return isSamePos(player1.pos, player2.pos)
  } else {
    return false
  }
}

export function applyMove(
  player: RoborallyPlayer,
  move: Move
): RoborallyPlayer {
  let updatedPlayer = player
  if (move.dir !== undefined) {
    updatedPlayer = movePlayer(updatedPlayer, move.dir, 1)
  }
  if (move.rot !== undefined) {
    updatedPlayer = rotatePlayer(updatedPlayer, move.rot)
  }
  return updatedPlayer
}

export async function resolveHoles(ctx: RoborallyContext) {
  const updateCount = ctx.updatePlayers(player => {
    const cell = ctx.getCell(player.pos)
    if (isAffectedByHoles(player) && isHole(cell)) {
      return destroyPlayer(player)
    } else {
      return false
    }
  })

  if (updateCount > 0) {
    await ctx.post()
  }
}

export async function resolveMoves(
  ctx: RoborallyContext,
  moves: Record<PlayerId, Move>
) {
  ctx.updatePlayers((player, playerId) => {
    const move = moves[playerId]
    if (move !== undefined) {
      return applyMove(player, move)
    } else {
      return false
    }
  })
  await ctx.post()
  await resolveHoles(ctx)
}
