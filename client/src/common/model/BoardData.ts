import update from "immutability-helper"
import { Position, Direction, Rotation } from "./Position"

export type Dimension = {
  x: number
  y: number
}

export enum CellType {
  HOLE = 0,
  NORMAL = 1,
  CONVEYOR = 2,
  CONVEYOR_FAST = 3,
  GEAR = 4,
  REPAIR = 5,
}

export enum WallType {
  NONE = 0,
  NORMAL = 1,
}

export type WallData = {
  [dir in Direction]?: WallType
}

export type CellData = {
  type: CellType
  dir?: Direction
  rot?: Rotation
}

export enum BoardId {
  ISLAND = "Island",
}

export type BoardData = {
  cells: CellData[]
  walls: WallData[]
  dimensions: Dimension
}

export function getEmptyCell(): CellData {
  const type = CellType.NORMAL
  return { type }
}

export function getEmptyBoard(x: number, y: number): BoardData {
  return {
    cells: Array<CellData>(x * y).fill(getEmptyCell()),
    walls: Array<WallData>(x * y).fill({}),
    dimensions: {
      x,
      y,
    },
  }
}

export function getHole(): CellData {
  const type = CellType.HOLE
  return { type }
}

export function getConveyor(dir: Direction, rot = Rotation.NONE): CellData {
  const type = CellType.CONVEYOR
  return rot === Rotation.NONE ? { type, dir } : { type, dir, rot }
}

export function getFastConveyor(dir: Direction, rot = Rotation.NONE): CellData {
  const type = CellType.CONVEYOR_FAST
  return rot === Rotation.NONE ? { type, dir } : { type, dir, rot }
}

export function getGear(rot: Rotation): CellData {
  const type = CellType.GEAR
  return { type, rot }
}

export function getRepair(): CellData {
  const type = CellType.REPAIR
  return { type }
}

export function inBounds(board: BoardData, pos: Position): boolean {
  return (
    pos.x >= 0 &&
    pos.x < board.dimensions.x &&
    pos.y >= 0 &&
    pos.y < board.dimensions.y
  )
}

export function getCellIndex(board: BoardData, pos: Position): number {
  return pos.x + pos.y * board.dimensions.x
}

export function getCell(board: BoardData, pos: Position): CellData {
  if (!inBounds(board, pos)) {
    return getHole()
  }

  return board.cells[getCellIndex(board, pos)] ?? getEmptyCell()
}

export function getWall(
  board: BoardData,
  pos: Position,
  dir: Direction
): WallType {
  if (!inBounds(board, pos)) {
    return WallType.NONE
  }

  return board.walls[getCellIndex(board, pos)][dir] ?? WallType.NONE
}

export function setCell(
  board: BoardData,
  pos: Position,
  cell: CellData
): BoardData {
  if (!inBounds(board, pos)) {
    return board
  }

  return update(board, {
    cells: {
      [getCellIndex(board, pos)]: {
        $set: cell,
      },
    },
  })
}

export function setWall(
  board: BoardData,
  pos: Position,
  dir: Direction,
  wall: WallType = WallType.NORMAL
): BoardData {
  if (!inBounds(board, pos)) {
    return board
  }

  return update(board, {
    walls: {
      [getCellIndex(board, pos)]: {
        [dir]: {
          $set: wall,
        },
      },
    },
  })
}
