import { Direction, Rotation } from "./Position"

export enum CellType {
  HOLE = 0,
  NORMAL = 1,
  CONVEYOR = 2,
  CONVEYOR_FAST = 3,
  GEAR = 4,
  REPAIR = 5,
}

export type CellData = {
  type: CellType
  crush?: number[]
  dir?: Direction
  rot?: Rotation
  turn?: boolean
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

export function getConveyor(dir: Direction, turn = false): CellData {
  const type = CellType.CONVEYOR
  return { type, dir, turn }
}

export function getFastConveyor(dir: Direction, turn = false): CellData {
  const type = CellType.CONVEYOR_FAST
  return { type, dir, turn }
}

export function getGear(rot: Rotation): CellData {
  const type = CellType.GEAR
  return { type, rot }
}

export function getRepair(): CellData {
  const type = CellType.REPAIR
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

export function isTurnConveyor(cell: CellData): boolean {
  return isConveyor(cell) && cell.turn === true
}

export function isWater(cell: CellData): boolean {
  return cell.water ?? false
}
