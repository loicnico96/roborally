import { WallData } from "./BoardData"
import { Direction, Rotation } from "./Position"

export enum CellType {
  HOLE = 0,
  NORMAL = 1,
  CONVEYOR = 2,
  CONVEYOR_FAST = 3,
  GEAR = 4,
  REPAIR = 5,
  TELEPORT = 6,
}

export type CellData = {
  type: CellType
  crush?: number[]
  dir?: Direction
  rot?: Rotation
  turn?: boolean
  walls?: WallData
  water?: boolean
}

export function getEmptyCell(): CellData {
  const type = CellType.NORMAL
  return { type }
}

export function getHole(): CellData {
  const type = CellType.HOLE
  return { type }
}

export function isConveyor(cell: CellData): boolean {
  return cell.type === CellType.CONVEYOR_FAST || cell.type === CellType.CONVEYOR
}

export function isCrusher(cell: CellData, sequence: number): boolean {
  return cell.crush?.includes(sequence) ?? false
}

export function isFastConveyor(cell: CellData): boolean {
  return cell.type === CellType.CONVEYOR_FAST
}

export function isGear(cell: CellData): boolean {
  return cell.type === CellType.GEAR
}

export function isHole(cell: CellData): boolean {
  return cell.type === CellType.HOLE
}

export function isRepair(cell: CellData): boolean {
  return cell.type === CellType.REPAIR
}

export function isTeleport(cell: CellData): boolean {
  return cell.type === CellType.TELEPORT
}

export function isTurnConveyor(cell: CellData): boolean {
  return isConveyor(cell) && cell.turn === true
}

export function isWater(cell: CellData): boolean {
  return cell.water ?? false
}
