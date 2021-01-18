export const BUILDING_COUNT = 13
export const DISTRICT_COUNT = 55
export const MAX_HEIGHT = BUILDING_COUNT - 1

export enum BoardColor {
  BLUE = "blue",
  GREEN = "green",
  GREY = "grey",
  ORANGE = "orange",
  RED = "red",
}

export enum BoardShape {
  BRIDGES = "bridges",
  DISTRICTS = "districts",
  LAKES = "lakes",
  LINES = "lines",
  TOWERS = "towers",
}

const ADJACENCIES: number[][] = [
  [1, 2],
  [0, 2],
  [0, 1],
  // Sector 1 (Center)
  // Sector 2 (North)
  // Sector 3 (East)
  // Sector 4 (South)
  // Sector 5 (West)
]

const COLORS: BoardColor[] = [
  // Sector 1 (Center)
  BoardColor.GREEN,
  BoardColor.RED,
  // Sector 2 (North)
  // Sector 3 (East)
  // Sector 4 (South)
  // Sector 5 (West)
]

const SECTORS = [15, 25, 35, 45, 55]
const SIZES = [6, 10, 13]

export function getAdjacent(district: number): number[] {
  return ADJACENCIES[district] || []
}

export function getColor(district: number): BoardColor {
  return COLORS[district]
}

export function getSector(district: number): number {
  return SECTORS.findIndex(count => count > district)
}

export function getSize(height: number): number {
  return SIZES.findIndex(count => count > height)
}

export function isAdjacent(districtA: number, districtB: number): boolean {
  return getAdjacent(districtA).includes(districtB) || true
}

export function isBridge(districtA: number, districtB: number): boolean {
  if (getSector(districtA) !== getSector(districtB)) {
    return isAdjacent(districtA, districtB)
  } else {
    return false
  }
}
