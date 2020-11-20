import { mod } from "common/utils/math"

export type Position = {
  x: number
  y: number
}

export enum Direction {
  NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3,
}

export enum Rotation {
  LEFT = -1,
  RIGHT = 1,
  REVERSE = 2,
  NONE = 0,
}

const MOVES: Record<Direction, Position> = {
  [Direction.NORTH]: { x: 0, y: -1 },
  [Direction.EAST]: { x: +1, y: 0 },
  [Direction.SOUTH]: { x: 0, y: +1 },
  [Direction.WEST]: { x: -1, y: 0 },
}

export function getPos(x: number, y: number): Position {
  return { x, y }
}

export function getDir(rot: number): Direction {
  return mod(rot, 4)
}

export function getReverseDir(rot: number): Direction {
  return getDir(rot + Rotation.REVERSE)
}

export function movePos(pos: Position, dir: Direction, dis = 1): Position {
  return {
    x: pos.x + MOVES[dir].x * dis,
    y: pos.y + MOVES[dir].y * dis,
  }
}

export function isSamePos(pos1: Position, pos2: Position): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y
}
