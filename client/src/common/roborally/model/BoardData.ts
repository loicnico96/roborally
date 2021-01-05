import update, { Spec } from "immutability-helper"

import { CellData, getEmptyCell, getHole } from "./CellData"
import { Position, Direction } from "./Position"

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
  FLAME = "flame",
  GEAR = "gear",
  LASER = "laser",
  PUSHER = "pusher",
  RANDOM = "random",
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
