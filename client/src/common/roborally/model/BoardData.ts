import update, { Spec } from "immutability-helper"

import { range } from "common/utils/math"
import { merge } from "common/utils/objects"

import { CellData, getEmptyCell, getHole } from "./CellData"
import { Position, Direction, movePos, getReverseDir } from "./Position"

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

export enum LaserType {
  NORMAL = 0,
  FLAME = 1,
}

export type LaserData = {
  damage: number
  dir: Direction
  dis?: number
  pos: Position
  seq?: number[]
  type: LaserType
}

export enum BoardId {
  BLAST_FURNACE = "BlastFurnace",
  CANNERY_ROW = "CanneryRow",
  CHASM = "Chasm",
  CHESS = "Chess",
  CHOP_SHOP = "ChopShop",
  CIRCUIT_TRAP = "CircuitTrap",
  CROSS = "Cross",
  EXCHANGE = "Exchange",
  FLOOD_ZONE = "FloodZone",
  GEAR_BOX = "GearBox",
  ISLAND = "Island",
  LASER_MAZE = "LaserMaze",
  MACHINE_SHOP = "MachineShop",
  MAELSTROM = "Maelstrom",
  PIT_MAZE = "PitMaze",
  SPIN_ZONE = "SpinZone",
  VAULT = "Vault",
}

export enum FeatureType {
  CONVEYOR = "conveyor",
  CONVEYOR_FAST = "conveyor_fast",
  CRUSHER = "crusher",
  FLAME = "flame",
  GEAR = "gear",
  LASER = "laser",
  OIL = "oil",
  PORTAL = "portal",
  PUSHER = "pusher",
  RANDOM = "random",
  REPAIR = "repair",
  TELEPORT = "teleport",
  TRAP = "trap",
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

export function getMaxCheckpoints(boardIds: BoardId[]): number {
  return boardIds.length * 4 - 1
}

export function mergeBoards(boards: BoardData[]): BoardData {
  const boardCount = boards.length

  if (boardCount === 0) {
    throw Error("No board provided")
  }

  if (boardCount === 1) {
    return boards[0]
  }

  const boardCountX = Math.ceil(Math.sqrt(boardCount))
  const boardCountY = Math.ceil(boardCount / boardCountX)

  const boardSizeX = boards[0].dimensions.x
  const boardSizeY = boards[0].dimensions.y

  if (boards.some(board => board.dimensions.x !== boardSizeX)) {
    throw Error("Board with is not matching")
  }

  if (boards.some(board => board.dimensions.y !== boardSizeY)) {
    throw Error("Board height is not matching")
  }

  const mergedSizeX = boardCountX * boardSizeX
  const mergedSizeY = boardCountY * boardSizeY

  const dimensions = {
    x: mergedSizeX,
    y: mergedSizeY,
  }

  const cells = Array<CellData>(mergedSizeX * mergedSizeY).fill(getHole())
  const checkpoints: Position[] = []
  const features: FeatureType[] = []
  const lasers: LaserData[] = []

  boards.forEach((board, boardIndex) => {
    const boardX = Math.floor(boardIndex % boardCountX)
    const boardY = Math.floor(boardIndex / boardCountX)

    function shiftPos(pos: Position): Position {
      return {
        x: pos.x + boardX * boardSizeX,
        y: pos.y + boardY * boardSizeY,
      }
    }

    board.cells.forEach((cell, cellIndex) => {
      const cellPos = shiftPos({
        x: Math.floor(cellIndex % boardSizeX),
        y: Math.floor(cellIndex / boardSizeX),
      })

      const shiftedIndex = cellPos.x + cellPos.y * mergedSizeX
      cells[shiftedIndex] = merge(cells[shiftedIndex], cell)
    })

    board.checkpoints.forEach(checkpoint => {
      checkpoints.push(shiftPos(checkpoint))
    })

    board.features.forEach(feature => {
      if (!features.includes(feature)) {
        features.push(feature)
      }
    })

    board.lasers.forEach(laser => {
      lasers.push(
        merge(laser, {
          pos: shiftPos(laser.pos),
        })
      )
    })
  })

  const mergedBoard = {
    cells,
    checkpoints,
    dimensions,
    features,
    lasers,
  }

  cells.forEach((cell, cellIndex) => {
    if (cell.walls !== undefined) {
      const cellPos = {
        x: Math.floor(cellIndex % mergedSizeX),
        y: Math.floor(cellIndex / mergedSizeX),
      }

      for (const dir of range(0, 4)) {
        if (getWall(mergedBoard, cellPos, dir) === WallType.NORMAL) {
          const otherPos = movePos(cellPos, dir, 1)
          if (inBounds(mergedBoard, otherPos)) {
            const otherIndex = getCellIndex(mergedBoard, otherPos)
            cells[otherIndex] = update(cells[otherIndex], {
              walls: walls =>
                update(walls ?? {}, {
                  [getReverseDir(dir)]: {
                    $set: WallType.NORMAL,
                  },
                }),
            })
          }
        }
      }
    }
  })

  return mergedBoard
}
