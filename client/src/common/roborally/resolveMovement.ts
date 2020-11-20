import { PlayerId } from "common/model/GameStateBasic"
import { filter, reduce, size } from "common/utils/objects"
import { WallType } from "./model/Board"
import { isHole } from "./model/CellData"
import { Direction, isSamePos, Position, Rotation } from "./model/Position"
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
  dir: Direction
  push?: boolean
  rot?: Rotation
}

export function isWall(
  ctx: RoborallyContext,
  pos: Position,
  dir: Direction
): boolean {
  return ctx.getWall(pos, dir) === WallType.NORMAL
}

export function isPossibleMove(
  ctx: RoborallyContext,
  playerId: PlayerId,
  move: Move
): boolean {
  const player = ctx.getPlayer(playerId)
  if (isWall(ctx, player.pos, move.dir) && isAffectedByWalls(player)) {
    return false
  }

  return true
}

export function applyMove(
  player: RoborallyPlayer,
  move: Move
): RoborallyPlayer {
  const movedPlayer = movePlayer(player, move.dir, 1)
  return rotatePlayer(movedPlayer, move.rot ?? Rotation.NONE)
}

export function isColliding(
  player1: RoborallyPlayer,
  player2: RoborallyPlayer,
  move1?: Move,
  move2?: Move
): boolean {
  if (isAffectedByPlayers(player1) && isAffectedByPlayers(player2)) {
    const pos1 = move1 ? applyMove(player1, move1).pos : player1.pos
    const pos2 = move2 ? applyMove(player2, move2).pos : player2.pos
    return isSamePos(pos1, pos2)
  } else {
    return false
  }
}

export function checkSingleMove(
  ctx: RoborallyContext,
  playerId: PlayerId,
  move: Move,
  moves: Partial<Record<PlayerId, Move>>
): [boolean, PlayerId[]] {
  const pushedPlayers: PlayerId[] = []

  function recursive(movingPlayerId: PlayerId): boolean {
    if (!isPossibleMove(ctx, movingPlayerId, move)) {
      return false
    }

    const movingPlayer = ctx.getPlayer(movingPlayerId)
    const collidingPlayerId = ctx.findPlayer((otherPlayer, otherPlayerId) => {
      if (otherPlayerId === movingPlayerId) {
        return false
      }

      if (moves[otherPlayerId] !== undefined) {
        return false
      }

      return isColliding(movingPlayer, otherPlayer, move)
    })

    if (collidingPlayerId !== undefined) {
      if (move.push === true) {
        pushedPlayers.push(collidingPlayerId)
        return recursive(collidingPlayerId)
      }

      return false
    }

    return true
  }

  return [recursive(playerId), pushedPlayers]
}

export function getCollidingPlayer(
  ctx: RoborallyContext,
  movingPlayerId: PlayerId,
  moves: Partial<Record<PlayerId, Move>>
): PlayerId | undefined {
  const movingPlayer = ctx.getPlayer(movingPlayerId)
  return ctx.findPlayer((otherPlayer, otherPlayerId) => {
    if (otherPlayerId === movingPlayerId) {
      return false
    }

    return isColliding(
      movingPlayer,
      otherPlayer,
      moves[movingPlayerId],
      moves[otherPlayerId]
    )
  })
}

export function checkMoves(
  ctx: RoborallyContext,
  moves: Partial<Record<PlayerId, Move>>
): Partial<Record<PlayerId, Move>> {
  function recursive(
    baseMoves: Partial<Record<PlayerId, Move>>
  ): Partial<Record<PlayerId, Move>> {
    const pushedPlayers: Record<PlayerId, PlayerId[]> = {}

    const possibleBaseMoves = filter(baseMoves, (move, playerId) => {
      if (move === undefined) {
        return false
      }

      const [isPossible, pushedPlayerIds] = checkSingleMove(
        ctx,
        playerId,
        move,
        baseMoves
      )

      if (isPossible) {
        pushedPlayers[playerId] = pushedPlayerIds
        return true
      }

      return false
    })

    const pushedPlayerCount = reduce(
      pushedPlayers,
      (result, playerIds) => {
        for (const playerId of playerIds) {
          result[playerId] = (result[playerId] ?? 0) + 1
        }

        return result
      },
      {} as Record<PlayerId, number>
    )

    const possiblePushMoves = filter(possibleBaseMoves, (_, playerId) => {
      const pushedPlayerIds = pushedPlayers[playerId]
      return pushedPlayerIds.every(
        pushedPlayerId => pushedPlayerCount[pushedPlayerId] === 1
      )
    })

    const finalMoves = reduce(
      possiblePushMoves,
      (result, move, playerId) => {
        result[playerId] = move
        const pushedPlayerIds = pushedPlayers[playerId]
        for (const pushedPlayerId of pushedPlayerIds) {
          result[pushedPlayerId] = move
        }

        return result
      },
      {} as Partial<Record<PlayerId, Move>>
    )

    const validMoves = filter(possiblePushMoves, (_, playerId) => {
      if (getCollidingPlayer(ctx, playerId, finalMoves) !== undefined) {
        return false
      }

      const pushedPlayerIds = pushedPlayers[playerId]
      for (const pushedPlayerId of pushedPlayerIds) {
        if (getCollidingPlayer(ctx, pushedPlayerId, finalMoves) !== undefined) {
          return false
        }
      }

      return true
    })

    if (size(validMoves) < size(baseMoves)) {
      return recursive(validMoves)
    }

    return finalMoves
  }

  return recursive(moves)
}

export async function checkHoles(ctx: RoborallyContext) {
  const updateCount = ctx.updatePlayers(player => {
    const cell = ctx.getCell(player.pos)
    if (isHole(cell) && isAffectedByHoles(player)) {
      return destroyPlayer(player)
    }

    return false
  })

  if (updateCount > 0) {
    await ctx.post()
  }
}

export async function resolveMovement(
  ctx: RoborallyContext,
  moves: Partial<Record<PlayerId, Move>>
) {
  const validMoves = checkMoves(ctx, moves)
  ctx.updatePlayers((player, playerId) => {
    const move = validMoves[playerId]
    if (move !== undefined) {
      return applyMove(player, move)
    }

    return false
  })
  await ctx.post()
  await checkHoles(ctx)
}
