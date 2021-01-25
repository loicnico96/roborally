import { PlayerId } from "common/model/GameStateBasic"
import { sortBy, SortDirection } from "common/utils/arrays"
import { forEachAsync } from "common/utils/forEachAsync"

import { Card, CardAction, getCardAction, getCardPriority } from "./model/Card"
import { isOil, isTeleport, isWater } from "./model/CellData"
import { isSamePos, movePos, Position, Rotation } from "./model/Position"
import { RoborallyContext } from "./model/RoborallyContext"
import { RoborallyEvent } from "./model/RoborallyEvent"
import {
  getPlayerDir,
  isAbleToMove,
  rotatePlayer,
  teleportPlayer,
} from "./model/RoborallyPlayer"
import { checkHoles, resolveMovement } from "./resolveMovement"

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

function isAbleToTeleport(
  ctx: RoborallyContext,
  playerId: PlayerId,
  pos: Position
): boolean {
  return (
    ctx.findPlayer((otherPlayer, otherPlayerId) => {
      if (otherPlayerId === playerId) {
        return false
      }

      return isSamePos(otherPlayer.pos, pos)
    }) === undefined
  )
}

async function setCurrentPlayer(ctx: RoborallyContext, playerId: PlayerId) {
  ctx.mergeState({ currentPlayer: playerId })
  await ctx.post(RoborallyEvent.CHANGE_PLAYER)
}

async function resolvePlayerTeleport(
  ctx: RoborallyContext,
  playerId: PlayerId,
  pos: Position
) {
  ctx.updatePlayer(playerId, player => teleportPlayer(player, pos))
  await ctx.post(RoborallyEvent.TELEPORT)
  await checkHoles(ctx)
}

async function resolvePlayerMove(
  ctx: RoborallyContext,
  playerId: PlayerId,
  rot: Rotation,
  distance: number,
  distanceTeleport: number
) {
  const player = ctx.getPlayer(playerId)
  const startCell = ctx.getCell(player.pos)

  if (isAbleToMove(player) && isTeleport(startCell)) {
    const dir = getPlayerDir(player, rot)
    const pos = movePos(player.pos, dir, distanceTeleport)
    if (isAbleToTeleport(ctx, playerId, pos)) {
      await resolvePlayerTeleport(ctx, playerId, pos)
      return
    }
  }

  const realDistance =
    isWater(startCell) || isOil(startCell) ? distance - 1 : distance

  for (let i = 0; i < realDistance; i++) {
    if (isAbleToMove(ctx.getPlayer(playerId))) {
      await resolveMovement(ctx, {
        [playerId]: {
          dir: getPlayerDir(player, rot),
          push: true,
        },
      })
    }
  }
}

async function resolvePlayerRotate(
  ctx: RoborallyContext,
  playerId: PlayerId,
  rot: Rotation
) {
  ctx.updatePlayer(playerId, player => rotatePlayer(player, rot))
  await ctx.post(RoborallyEvent.ROTATE)
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
      await resolvePlayerMove(ctx, playerId, Rotation.NONE, 1, 3)
      break
    case CardAction.MOVE_2:
      await resolvePlayerMove(ctx, playerId, Rotation.NONE, 2, 4)
      break
    case CardAction.MOVE_3:
      await resolvePlayerMove(ctx, playerId, Rotation.NONE, 3, 5)
      break
    case CardAction.MOVE_BACK:
      await resolvePlayerMove(ctx, playerId, Rotation.REVERSE, 1, 2)
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
