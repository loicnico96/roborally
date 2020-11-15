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
}

export function getEmptyCell(): CellData {
  const type = CellType.NORMAL
  return { type }
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

export function isCellType(cell: CellData, types: CellType[]): boolean {
  return types.includes(cell.type)
}

export function isCrusher(cell: CellData, sequence: number): boolean {
  return cell.crush?.includes(sequence) ?? false
}

export function isHole(cell: CellData): boolean {
  return cell.type === CellType.HOLE
}
