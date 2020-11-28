import { PlayerId } from "common/model/GameStateBasic"
import { isEmpty } from "common/utils/objects"

import { inBounds, WallType } from "./model/BoardData"
import { Direction, isSamePos, movePos, Position } from "./model/Position"
import {
  damagePlayer,
  destroyPlayer,
  getPlayerDir,
  isAbleToFire,
  isAffectedByLasers,
  isAlive,
  isDestroyedByDamage,
  RoborallyPlayer,
} from "./model/RoborallyPlayer"
import { RoborallyContext } from "./RoborallyContext"

export type Laser = {
  damage: number
  dir: Direction
  pos: Position
  startExcluded?: boolean
}

export async function checkDamage(ctx: RoborallyContext) {
  const updateCount = ctx.updatePlayers(player => {
    if (isAlive(player) && isDestroyedByDamage(player)) {
      return destroyPlayer(player)
    }

    return false
  })

  if (updateCount > 0) {
    await ctx.post()
  }
}

function getBoardLasers(ctx: RoborallyContext): Laser[] {
  return ctx.getBoard().lasers
}

function getPlayerLasers(ctx: RoborallyContext): Laser[] {
  return ctx.getPlayerOrder().reduce((lasers, playerId) => {
    const player = ctx.getPlayer(playerId)
    if (isAbleToFire(player)) {
      lasers.push({
        damage: 1,
        dir: getPlayerDir(player),
        pos: player.pos,
        startExcluded: true,
      })
    }
    return lasers
  }, [] as Laser[])
}

function getLaserCollisionFn(
  pos: Position
): (player: RoborallyPlayer) => boolean {
  return player => isAffectedByLasers(player) && isSamePos(pos, player.pos)
}

export async function resolveLasers(ctx: RoborallyContext, lasers: Laser[]) {
  const laserDamage: Record<PlayerId, number> = {}
  const board = ctx.getBoard()

  lasers.forEach(laser => {
    let laserPos = laser.pos
    while (inBounds(board, laserPos)) {
      if (laserPos !== laser.pos || laser.startExcluded !== true) {
        const playerId = ctx.findPlayer(getLaserCollisionFn(laserPos))

        if (playerId !== undefined) {
          laserDamage[playerId] = (laserDamage[playerId] ?? 0) + laser.damage
          return
        }
      }

      if (ctx.getWall(laserPos, laser.dir) !== WallType.NONE) {
        return
      }

      laserPos = movePos(laserPos, laser.dir, 1)
    }
  })

  if (!isEmpty(laserDamage)) {
    ctx.updatePlayers((player, playerId) => {
      if (playerId in laserDamage) {
        return damagePlayer(player, laserDamage[playerId])
      }

      return false
    })
    await ctx.post()
  }
}

export async function resolveBoardLasers(ctx: RoborallyContext) {
  await resolveLasers(ctx, getBoardLasers(ctx))
}

export async function resolvePlayerLasers(ctx: RoborallyContext) {
  await resolveLasers(ctx, getPlayerLasers(ctx))
}
