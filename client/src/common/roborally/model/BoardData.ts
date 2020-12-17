import update, { Spec } from "immutability-helper"

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

export type LaserData = {
  damage: number
  dir: Direction
  pos: Position
}

export enum BoardId {
  CANNERY_ROW = "CanneryRow",
  CHASM = "Chasm",
  CHESS = "Chess",
  CHOP_SHOP = "ChopShop",
  CIRCUIT_TRAP = "CircuitTrap",
  CROSS = "Cross",
  EXCHANGE = "Exchange",
  FLOOD_ZONE = "FloodZone",
  ISLAND = "Island",
  LASER_MAZE = "LaserMaze",
  MAELSTROM = "Maelstrom",
  PIT_MAZE = "PitMaze",
  SPIN_ZONE = "SpinZone",
  VAULT = "Vault",
}

export enum FeatureType {
  CONVEYOR = "conveyor",
  CONVEYOR_FAST = "conveyor_fast",
  CRUSHER = "crusher",
  GEAR = "gear",
  LASER = "laser",
  PUSHER = "pusher",
  REPAIR = "repair",
  TELEPORT = "teleport",
  WATER = "water",
}

export type BoardData = {
  cells: CellData[]
  checkpoints: Position[]
  dimensions: Dimension
  features: FeatureType[]
  lasers: LaserData[]
}

export function getEmptyBoard(x: number, y: number): BoardData {
  return {
    cells: Array<CellData>(x * y).fill(getEmptyCell()),
    checkpoints: [],
    dimensions: { x, y },
    features: [],
    lasers: [],
  }
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

  const cellIndex = getCellIndex(board, pos)
  return board.cells[cellIndex] ?? getEmptyCell()
}

export function getWall(
  board: BoardData,
  pos: Position,
  dir: Direction
): WallType {
  const { walls } = getCell(board, pos)
  return walls?.[dir] ?? WallType.NONE
}

export function updateCell(
  board: BoardData,
  pos: Position,
  updateSpec: Spec<CellData>
): BoardData {
  let updatedBoard = board

  if (inBounds(updatedBoard, pos)) {
    const cellIndex = getCellIndex(board, pos)
    updatedBoard = update(updatedBoard, {
      cells: {
        [cellIndex]: updateSpec,
      },
    })
  }

  return updatedBoard
}

export function setCell(
  board: BoardData,
  pos: Position,
  cell: CellData
): BoardData {
  return updateCell(board, pos, {
    $set: cell,
  })
}

export function setWall(
  board: BoardData,
  pos: Position,
  dir: Direction,
  wall: WallType = WallType.NORMAL,
  doubleSided: boolean = true
): BoardData {
  let updatedBoard = board

  if (inBounds(board, pos)) {
    const cellIndex = getCellIndex(board, pos)
    updatedBoard = update(updatedBoard, {
      cells: {
        [cellIndex]: {
          walls: walls =>
            update(walls ?? {}, {
              [dir]: {
                $set: wall,
              },
            }),
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

export function addLaser(
  board: BoardData,
  pos: Position,
  dir: Direction,
  damage: number
): BoardData {
  return update(board, {
    lasers: {
      $push: [
        {
          damage,
          dir,
          pos,
        },
      ],
    },
  })
}

export function addCrusher(
  board: BoardData,
  pos: Position,
  sequences: number[]
): BoardData {
  return updateCell(board, pos, {
    $merge: {
      crush: sequences,
    },
  })
}

export function addWater(board: BoardData, pos: Position): BoardData {
  return updateCell(board, pos, {
    $merge: {
      water: true,
    },
  })
}
