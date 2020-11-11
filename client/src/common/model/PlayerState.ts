import { clamp } from "common/utils/math"
import { merge } from "common/utils/objects"
import { Card } from "./Card"
import { Direction, getDir, movePos, Position, Rotation } from "./Position"
import { getEmptyProgram, PROGRAM_SIZE, Program } from "./Program"

export const MAX_DAMAGE = 9
export const MAX_HAND_SIZE = 10
export const RESPAWN_DAMAGE = 2

export type PlayerId = string

export type PlayerState = {
  cards: Card[]
  checkpoint: number
  checkpointDir: Direction
  damage: number
  destroyed: boolean
  down: boolean
  downNext: boolean
  pos: Position
  program: Program
  ready: boolean
  rot: number
  virtual: boolean
}

export function getInitialPlayerState(
  initialPos: Position,
  initialDir: Direction,
  initialCheckpoint = 0,
  initialDamage = 0
): PlayerState {
  return {
    cards: [],
    checkpoint: initialCheckpoint,
    checkpointDir: initialDir,
    damage: initialDamage,
    destroyed: false,
    down: false,
    downNext: false,
    pos: initialPos,
    program: getEmptyProgram(),
    ready: true,
    rot: initialDir,
    virtual: true,
  }
}

export function isAlive(player: PlayerState): boolean {
  return !player.destroyed
}

export function isVirtual(player: PlayerState): boolean {
  return player.virtual
}

export function isAbleToFire(player: PlayerState): boolean {
  return isAlive(player) && !isVirtual(player)
}

export function isAbleToMove(player: PlayerState): boolean {
  return isAlive(player)
}

export function isAbleToRepair(player: PlayerState): boolean {
  return isAlive(player) && player.damage > 0
}

export function isAffectedByCells(player: PlayerState): boolean {
  return isAlive(player)
}

export function isAffectedByCheckpoint(
  player: PlayerState,
  checkpoint: number
): boolean {
  return isAlive(player) && [0, 1].includes(checkpoint - player.checkpoint)
}

export function isAffectedByHoles(player: PlayerState): boolean {
  return isAlive(player)
}

export function isAffectedByLasers(player: PlayerState): boolean {
  return isAlive(player) && !isVirtual(player)
}

export function isAffectedByPlayers(player: PlayerState): boolean {
  return isAlive(player) && !isVirtual(player)
}

export function isAffectedByWalls(player: PlayerState): boolean {
  return isAlive(player)
}

export function isDestroyedByDamage(player: PlayerState): boolean {
  return player.damage >= MAX_DAMAGE
}

export function getPlayerHandSize(player: PlayerState): number {
  return clamp(MAX_HAND_SIZE - player.damage, 0, MAX_HAND_SIZE)
}

export function getLockedProgramIndex(player: PlayerState): number {
  return clamp(MAX_DAMAGE - player.damage, 0, PROGRAM_SIZE)
}

export function getLockedProgram(player: PlayerState): Program {
  const lockIndex = getLockedProgramIndex(player)
  return player.program.map((card, index) =>
    index >= lockIndex ? card : null
  ) as Program
}

export function getPlayerDir(
  player: PlayerState,
  rot: Rotation = Rotation.NONE
): Direction {
  return getDir(player.rot + rot)
}

export function damagePlayer(player: PlayerState, amount: number): PlayerState {
  return merge(player, {
    damage: clamp(player.damage + amount, 0, MAX_DAMAGE),
  })
}

export function destroyPlayer(player: PlayerState): PlayerState {
  return merge(player, {
    destroyed: true,
  })
}

export function materializePlayer(player: PlayerState): PlayerState {
  return merge(player, {
    virtual: false,
  })
}

export function movePlayer(
  player: PlayerState,
  dir: Direction,
  dis: number
): PlayerState {
  return merge(player, {
    pos: movePos(player.pos, dir, dis),
  })
}

export function repairPlayer(player: PlayerState, amount: number): PlayerState {
  return merge(player, {
    damage: clamp(player.damage - amount, 0, MAX_DAMAGE),
  })
}

export function respawnPlayer(
  player: PlayerState,
  checkpoints: Position[]
): PlayerState {
  return getInitialPlayerState(
    checkpoints[player.checkpoint],
    player.checkpointDir,
    player.checkpoint,
    RESPAWN_DAMAGE
  )
}

export function rotatePlayer(player: PlayerState, rot: Rotation): PlayerState {
  return merge(player, {
    rot: player.rot + rot,
  })
}

export function triggerPlayerCheckpoint(
  player: PlayerState,
  checkpoint: number
): PlayerState {
  return merge(player, {
    checkpoint,
    checkpointDir: getPlayerDir(player),
  })
}
