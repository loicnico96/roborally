import { PlayerId } from "common/model/GameStateBasic"
import { sortBy, SortDirection } from "common/utils/arrays"
import { forEachAsync } from "common/utils/forEachAsync"
import { Card, CardAction, getCardAction, getCardPriority } from "./model/Card"
import { Direction, Rotation } from "./model/Position"
import { getPlayerDir, isAbleToMove } from "./model/RoborallyPlayer"
import {
  applyMove,
  isColliding,
  isPossibleMove,
  Move,
  resolveMoves,
} from "./resolveMoves"
import { RoborallyContext } from "./RoborallyContext"

export type PlayerAction = {
  playerId: PlayerId
  card: Card
}

function getOrderedPlayerActions(
  ctx: RoborallyContext,
  sequence: number
): PlayerAction[] {
  const playerActions = ctx.getPlayerOrder().reduce((actions, playerId) => {
    const player = ctx.getPlayer(playerId)
    const card = player.program[sequence]
    if (isAbleToMove(player) && card !== null) {
      actions.push({
        playerId,
        card,
      })
    }
    return actions
  }, [] as PlayerAction[])

  return sortBy(
    playerActions,
    action => getCardPriority(action.card),
    SortDirection.DESC
  )
}

function getPlayerActionMoves(
  ctx: RoborallyContext,
  playerId: PlayerId,
  dir: Direction
): Record<PlayerId, Move> {
  const moves: Record<PlayerId, Move> = {}
  const move: Move = { dir }

  let movingPlayerId: PlayerId | undefined = playerId
  while (movingPlayerId !== undefined) {
    if (!isPossibleMove(ctx, movingPlayerId, move)) {
      return {}
    }

    moves[movingPlayerId] = move

    const movingPlayer = ctx.getPlayer(movingPlayerId)
    const movingPlayerUpdated = applyMove(movingPlayer, move)
    movingPlayerId = ctx.findPlayer(otherPlayer =>
      isColliding(otherPlayer, movingPlayerUpdated)
    )
  }

  return moves
}

async function setCurrentPlayer(ctx: RoborallyContext, playerId: PlayerId) {
  ctx.mergeState({ currentPlayer: playerId })
  await ctx.post()
}

async function resolvePlayerMove(
  ctx: RoborallyContext,
  playerId: PlayerId,
  rot: Rotation,
  distance: number
) {
  for (let i = 0; i < distance; i++) {
    const player = ctx.getPlayer(playerId)
    if (!isAbleToMove(player)) {
      return
    }

    const dir = getPlayerDir(player, rot)
    await resolveMoves(ctx, getPlayerActionMoves(ctx, playerId, dir))
  }
}

async function resolvePlayerRotate(
  ctx: RoborallyContext,
  playerId: PlayerId,
  rot: Rotation
) {
  await resolveMoves(ctx, { [playerId]: { rot } })
}

async function resolvePlayerAction(
  ctx: RoborallyContext,
  playerId: PlayerId,
  action: CardAction
) {
  const player = ctx.getPlayer(playerId)
  if (!isAbleToMove(player)) {
    return
  }

  switch (action) {
    case CardAction.MOVE_1:
      await resolvePlayerMove(ctx, playerId, Rotation.NONE, 1)
      break
    case CardAction.MOVE_2:
      await resolvePlayerMove(ctx, playerId, Rotation.NONE, 2)
      break
    case CardAction.MOVE_3:
      await resolvePlayerMove(ctx, playerId, Rotation.NONE, 3)
      break
    case CardAction.MOVE_BACK:
      await resolvePlayerMove(ctx, playerId, Rotation.REVERSE, 1)
      break
    case CardAction.ROTATE_LEFT:
      await resolvePlayerRotate(ctx, playerId, Rotation.LEFT)
      break
    case CardAction.ROTATE_RIGHT:
      await resolvePlayerRotate(ctx, playerId, Rotation.RIGHT)
      break
    case CardAction.ROTATE_BACK:
      await resolvePlayerRotate(ctx, playerId, Rotation.REVERSE)
      break
    default:
      console.error(`Unknown player action: ${action}`)
  }
}

export async function resolvePlayerActions(
  ctx: RoborallyContext,
  sequence: number
) {
  const playerActions = getOrderedPlayerActions(ctx, sequence)

  await forEachAsync(playerActions, async playerAction => {
    const { playerId, card } = playerAction
    await setCurrentPlayer(ctx, playerId)
    await resolvePlayerAction(ctx, playerId, getCardAction(card))
  })
}
