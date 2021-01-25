import { PlayerStateBasic } from "common/model/GameStateBasic"
import { clamp } from "common/utils/math"
import { merge } from "common/utils/objects"

import { Card } from "./Card"
import { Direction, getDir, movePos, Position, Rotation } from "./Position"
import { getEmptyProgram, PROGRAM_SIZE, Program } from "./Program"

export const MAX_DAMAGE = 9
export const MAX_HAND_SIZE = 10
export const RESPAWN_DAMAGE = 2

export type RoborallyPlayer = PlayerStateBasic & {
  cards: Card[]
  checkpoint: number
  checkpointDir: Direction
  damage: number
  destroyed: boolean
  down: boolean
  downNext: boolean
  pos: Position
  program: Program
  rot: number
  virtual: boolean
}

export function getInitialPlayerState(
  name: string,
  initialPos: Position,
  initialDir: Direction,
  initialCheckpoint = 0,
  initialDamage = 0
): RoborallyPlayer {
  return {
    cards: [],
    checkpoint: initialCheckpoint,
    checkpointDir: initialDir,
    damage: initialDamage,
    destroyed: false,
    down: false,
    downNext: false,
    name,
    pos: initialPos,
    program: getEmptyProgram(),
    ready: false,
    rot: initialDir,
    virtual: true,
  }
}

export function isAlive(player: RoborallyPlayer): boolean {
  return !player.destroyed
}

export function isPoweredDown(player: RoborallyPlayer): boolean {
  return player.down
}

export function isVirtual(player: RoborallyPlayer): boolean {
  return player.virtual
}

export function isAbleToFire(player: RoborallyPlayer): boolean {
  return isAlive(player) && !isPoweredDown(player) && !isVirtual(player)
}

export function isAbleToMove(player: RoborallyPlayer): boolean {
  return isAlive(player) && !isPoweredDown(player)
}

export function isAbleToRepair(player: RoborallyPlayer): boolean {
  return isAlive(player) && player.damage > 0
}

export function isAbleToRespawn(player: RoborallyPlayer): boolean {
  return !isAlive(player)
}

export function isAffectedByCells(player: RoborallyPlayer): boolean {
  return isAlive(player)
}

export function isAffectedByCheckpoint(
  player: RoborallyPlayer,
  checkpoint: number
): boolean {
  return isAlive(player) && [0, 1].includes(checkpoint - player.checkpoint)
}

export function isAffectedByHoles(player: RoborallyPlayer): boolean {
  return isAlive(player)
}

export function isAffectedByLasers(player: RoborallyPlayer): boolean {
  return isAlive(player) && !isVirtual(player)
}

export function isAffectedByPlayers(player: RoborallyPlayer): boolean {
  return isAlive(player) && !isVirtual(player)
}

export function isAffectedByWalls(player: RoborallyPlayer): boolean {
  return isAlive(player)
}

export function isDestroyedByDamage(player: RoborallyPlayer): boolean {
  return player.damage >= MAX_DAMAGE
}

export function getPlayerHandSize(player: RoborallyPlayer): number {
  return clamp(MAX_HAND_SIZE - player.damage, 0, MAX_HAND_SIZE)
}

export function getLockedProgramIndex(player: RoborallyPlayer): number {
  return player.down ? 0 : clamp(MAX_DAMAGE - player.damage, 0, PROGRAM_SIZE)
}

export function getLockedProgram(player: RoborallyPlayer): Program {
  const lockIndex = getLockedProgramIndex(player)
  return player.program.map((card, index) =>
    index >= lockIndex ? card : null
  ) as Program
}

export function getPlayerDir(
  player: RoborallyPlayer,
  rot: Rotation = Rotation.NONE
): Direction {
  return getDir(player.rot + rot)
}

export function damagePlayer(
  player: RoborallyPlayer,
  amount: number
): RoborallyPlayer {
  return merge(player, {
    damage: clamp(player.damage + amount, 0, 99),
  })
}

export function destroyPlayer(player: RoborallyPlayer): RoborallyPlayer {
  return merge(player, {
    destroyed: true,
  })
}

export function materializePlayer(player: RoborallyPlayer): RoborallyPlayer {
  return merge(player, {
    virtual: false,
  })
}

export function movePlayer(
  player: RoborallyPlayer,
  dir: Direction,
  dis: number
): RoborallyPlayer {
  return merge(player, {
    pos: movePos(player.pos, dir, dis),
  })
}

export function repairPlayer(
  player: RoborallyPlayer,
  amount: number
): RoborallyPlayer {
  return merge(player, {
    damage: clamp(player.damage - amount, 0, MAX_DAMAGE),
  })
}

export function respawnPlayer(
  player: RoborallyPlayer,
  checkpoints: Position[]
): RoborallyPlayer {
  return getInitialPlayerState(
    player.name,
    checkpoints[player.checkpoint],
    player.checkpointDir,
    player.checkpoint,
    RESPAWN_DAMAGE
  )
}

export function rotatePlayer(
  player: RoborallyPlayer,
  rot: Rotation
): RoborallyPlayer {
  return merge(player, {
    rot: player.rot + rot,
  })
}

export function teleportPlayer(
  player: RoborallyPlayer,
  pos: Position
): RoborallyPlayer {
  return merge(player, {
    pos,
  })
}

export function triggerPlayerCheckpoint(
  player: RoborallyPlayer,
  checkpoint: number
): RoborallyPlayer {
  return merge(player, {
    checkpoint,
    checkpointDir: getPlayerDir(player),
  })
}
