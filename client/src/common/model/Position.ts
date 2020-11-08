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
  return ((rot % 4) + 4) % 4
}

export function move(pos: Position, dir: Direction, dis = 1): Position {
  return {
    x: pos.x + MOVES[dir].x * dis,
    y: pos.y + MOVES[dir].y * dis,
  }
}

export function rotate(dir: Direction, rot: number): Direction {
  return getDir(dir + rot)
}

export function reverse(dir: Direction): Direction {
  return rotate(dir, Rotation.REVERSE)
}
