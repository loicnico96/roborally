import { WallData } from "./BoardData"
import { Direction, Position, Rotation } from "./Position"

export enum CellType {
  HOLE = 0,
  NORMAL = 1,
  CONVEYOR = 2,
  CONVEYOR_FAST = 3,
  GEAR = 4,
  REPAIR = 5,
  TELEPORT = 6,
  RANDOM = 7,
  PORTAL = 8,
}

export type CellData = {
  type: CellType
  crush?: number[]
  dir?: Direction
  oil?: boolean
  pos?: Position
  push?: number[]
  pushDir?: Direction
  rot?: Rotation
  trap?: number[]
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

export function isHole(cell: CellData, sequence: number): boolean {
  if (cell.trap?.includes(sequence) === true) {
    return true
  } else {
    return cell.type === CellType.HOLE
  }
}

export function isOil(cell: CellData): boolean {
  return cell.oil ?? false
}

export function isPortal(cell: CellData): boolean {
  return cell.type === CellType.PORTAL
}

export function isPusher(cell: CellData, sequence: number): boolean {
  return cell.push?.includes(sequence) ?? false
}

export function isRandomizer(cell: CellData): boolean {
  return cell.type === CellType.RANDOM
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
