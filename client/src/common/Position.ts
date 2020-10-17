export type Position = {
  x: number
  y: number
}

export enum Direction {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

export enum Rotation {
  Left = -1,
  Right = 1,
  Reverse = 2,
  None = 0,
}

const MOVES: Record<Direction, Position> = {
  [Direction.North]: { x: 0, y: +1 },
  [Direction.East]: { x: +1, y: 0 },
  [Direction.South]: { x: 0, y: -1 },
  [Direction.West]: { x: -1, y: 0 },
}

export function move(pos: Position, dir: Direction, dis: number = 1): Position {
  return {
    x: pos.x + MOVES[dir].x * dis,
    y: pos.y + MOVES[dir].y * dis,
  }
}

export function rotate(dir: Direction, rot: Rotation): Direction {
  return (((dir + rot) % 4) + 4) % 4
}

export function reverse(dir: Direction): Direction {
  return rotate(dir, Rotation.Reverse)
}
