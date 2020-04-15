export type Position = [number, number]

export enum Direction {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

export enum Rotation {
  None = 0,
  Right = 1,
  Reverse = 2,
  Left = -1,
}

const MOVES: Record<Direction, Position> = {
  [Direction.North]: [0, 1],
  [Direction.East]: [1, 0],
  [Direction.South]: [0, -1],
  [Direction.West]: [-1, 0],
}

export function pos({ x, y }: { x: number; y: number }): Position {
  return [x, y]
}

export function move(pos: Position, dir: Direction, dis: number = 1): Position {
  return [pos[0] + MOVES[dir][0] * dis, pos[1] + MOVES[dir][1] * dis]
}

export function rotate(dir: Direction, rot: Rotation): Direction {
  return (((dir + rot) % 4) + 4) % 4
}

export function reverse(dir: Direction): Direction {
  return rotate(dir, Rotation.Reverse)
}
