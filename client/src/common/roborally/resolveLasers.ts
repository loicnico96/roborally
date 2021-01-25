import { PlayerId } from "common/model/GameStateBasic"
import { isEmpty } from "common/utils/objects"

import { inBounds, LaserType, WallType } from "./model/BoardData"
import { Direction, isSamePos, movePos, Position } from "./model/Position"
import { RoborallyEvent } from "./model/RoborallyEvent"
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
  dis?: number
  pos: Position
  startExcluded?: boolean
  type: LaserType
}

export async function checkDamage(ctx: RoborallyContext) {
  const updateCount = ctx.updatePlayers(player => {
    if (isAlive(player) && isDestroyedByDamage(player)) {
      return destroyPlayer(player)
    }

    return false
  })

  if (updateCount > 0) {
    await ctx.post(RoborallyEvent.DESTROY)
  }
}

function getBoardLasers(ctx: RoborallyContext): Laser[] {
  return ctx.getBoard().lasers.filter(laser => {
    if (laser.seq) {
      return laser.seq.includes(ctx.getSequence())
    }

    return true
  })
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
        type: LaserType.NORMAL,
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

  function addDamage(playerId: PlayerId, damage: number) {
    const previousDamage = laserDamage[playerId] ?? 0
    laserDamage[playerId] = previousDamage + damage
  }

  lasers.forEach(laser => {
    for (let distance = 0; distance < 1000; distance++) {
      const laserPos = movePos(laser.pos, laser.dir, distance)
      if (!inBounds(board, laserPos)) {
        break
      }

      if (laser.dis !== undefined && laser.dis === distance) {
        break
      }

      if (distance > 0 || laser.startExcluded !== true) {
        const playerIds = ctx.filterPlayers(getLaserCollisionFn(laserPos))

        playerIds.forEach(playerId => addDamage(playerId, laser.damage))

        if (playerIds.length > 0 && laser.type === LaserType.NORMAL) {
          break
        }
      }

      if (ctx.getWall(laserPos, laser.dir) !== WallType.NONE) {
        break
      }
    }
  })

  if (!isEmpty(laserDamage)) {
    ctx.updatePlayers((player, playerId) => {
      if (playerId in laserDamage) {
        return damagePlayer(player, laserDamage[playerId])
      }

      return false
    })
    await ctx.post(RoborallyEvent.DAMAGE)
  }
}

export async function resolveBoardLasers(ctx: RoborallyContext) {
  await resolveLasers(ctx, getBoardLasers(ctx))
}

export async function resolvePlayerLasers(ctx: RoborallyContext) {
  await resolveLasers(ctx, getPlayerLasers(ctx))
}
