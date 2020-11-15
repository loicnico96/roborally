import update from "immutability-helper"
import { CellData, getEmptyCell, getHole } from "./CellData"
import { Position, Direction, movePos, getDir } from "./Position"

export type Dimension = {
  x: number
  y: number
}

export enum WallType {
  NONE = 0,
  NORMAL = 1,
}

export type WallData = {
  [dir in Direction]?: WallType
}

export enum BoardId {
  ISLAND = "Island",
}

export type Board = {
  cells: CellData[]
  walls: WallData[]
  dimensions: Dimension
}

export function getEmptyBoard(x: number, y: number): Board {
  return {
    cells: Array<CellData>(x * y).fill(getEmptyCell()),
    walls: Array<WallData>(x * y).fill({}),
    dimensions: {
      x,
      y,
    },
  }
}

export function inBounds(board: Board, pos: Position): boolean {
  return (
    pos.x >= 0 &&
    pos.x < board.dimensions.x &&
    pos.y >= 0 &&
    pos.y < board.dimensions.y
  )
}

export function getCellIndex(board: Board, pos: Position): number {
  return pos.x + pos.y * board.dimensions.x
}

export function getCell(board: Board, pos: Position): CellData {
  if (!inBounds(board, pos)) {
    return getHole()
  }

  return board.cells[getCellIndex(board, pos)] ?? getEmptyCell()
}

export function getWall(board: Board, pos: Position, dir: Direction): WallType {
  if (!inBounds(board, pos)) {
    return WallType.NONE
  }

  return board.walls[getCellIndex(board, pos)][dir] ?? WallType.NONE
}

export function setCell(board: Board, pos: Position, cell: CellData): Board {
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
  board: Board,
  pos: Position,
  dir: Direction,
  wall: WallType = WallType.NORMAL,
  doubleSided: boolean = true
): Board {
  let updatedBoard = board

  if (inBounds(board, pos)) {
    updatedBoard = update(updatedBoard, {
      walls: {
        [getCellIndex(board, pos)]: {
          [dir]: {
            $set: wall,
          },
        },
      },
    })
  }

  if (doubleSided) {
    const reverseDir = getDir(dir + 2)
    const reversePos = movePos(pos, dir, 1)
    return setWall(updatedBoard, reversePos, reverseDir, wall, false)
  } else {
    return updatedBoard
  }
}
