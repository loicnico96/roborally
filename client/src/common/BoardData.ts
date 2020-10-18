import { Direction, Position, Rotation } from "./Position"

export enum CellType {
  NORMAL,
  HOLE,
  GEAR,
  BELT,
  BELT_EXPRESS,
  REPAIR,
}

export type CellData = {
  type: CellType
  wall?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
  dir?: Direction
  rot?: Rotation
}

export type BoardData = {
  cells: CellData[]
  checkpoints: Record<number, Position>
  dimensions: [number, number]
}

export function isInBounds(board: BoardData, pos: Position): boolean {
  return (
    pos.x >= 0 &&
    pos.x < board.dimensions[0] &&
    pos.y >= 0 &&
    pos.y < board.dimensions[1]
  )
}

export function getCell(board: BoardData, pos: Position): CellData {
  return isInBounds(board, pos)
    ? board.cells[pos.x + pos.y * board.dimensions[0]]
    : { type: CellType.HOLE }
}

export function isWall(
  board: BoardData,
  pos: Position,
  dir: Direction
): boolean {
  const { wall } = getCell(board, pos)
  return wall !== undefined && (wall & (1 << dir)) !== 0
}
