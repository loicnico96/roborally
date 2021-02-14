import { enumValues } from "common/utils/enums"
import { repeat } from "common/utils/math"
import { filter, keys } from "common/utils/objects"

import { Token } from "./Token"

export enum BuildingSize {
  SMALL = 0,
  MEDIUM = 1,
  LARGE = 2,
}

export enum DistrictColor {
  BLUE = "blue",
  GRAY = "gray",
  GREEN = "green",
  ORANGE = "orange",
  RED = "red",
}

export type DistrictId = number

export type DistrictInfo = {
  adjacent: DistrictId[]
  color: DistrictColor
  position: [number, number]
  sector: Sector
}

export type PlayerCount = 2 | 3 | 4

export enum Sector {
  CENTER = 0,
  NORTH = 1,
  EAST = 2,
  SOUTH = 3,
  WEST = 4,
}

export const BUILDINGS: BuildingSize[] = [
  // Small buildings (1-5)
  BuildingSize.SMALL,
  BuildingSize.SMALL,
  BuildingSize.SMALL,
  BuildingSize.SMALL,
  BuildingSize.SMALL,
  // Medium buildings (6-9)
  BuildingSize.MEDIUM,
  BuildingSize.MEDIUM,
  BuildingSize.MEDIUM,
  BuildingSize.MEDIUM,
  // Large buildings (10-13)
  BuildingSize.LARGE,
  BuildingSize.LARGE,
  BuildingSize.LARGE,
  BuildingSize.LARGE,
]

export const DISTRICTS: Record<DistrictId, DistrictInfo> = {
  // Center
  0: {
    adjacent: [2, 3, 19, 22],
    color: DistrictColor.GRAY,
    position: [42.4, 28.0],
    sector: Sector.CENTER,
  },
  1: {
    adjacent: [2, 7, 49],
    color: DistrictColor.GREEN,
    position: [29.6, 42.2],
    sector: Sector.CENTER,
  },
  2: {
    adjacent: [0, 1, 3],
    color: DistrictColor.RED,
    position: [35.7, 37.5],
    sector: Sector.CENTER,
  },
  3: {
    adjacent: [0, 2, 4, 9],
    color: DistrictColor.BLUE,
    position: [48.2, 36.4],
    sector: Sector.CENTER,
  },
  4: {
    adjacent: [3, 5, 9],
    color: DistrictColor.GRAY,
    position: [59.1, 39.5],
    sector: Sector.CENTER,
  },
  5: {
    adjacent: [4, 6, 10, 30],
    color: DistrictColor.ORANGE,
    position: [70.1, 42.2],
    sector: Sector.CENTER,
  },
  6: {
    adjacent: [5, 24, 25],
    color: DistrictColor.BLUE,
    position: [71.8, 34.1],
    sector: Sector.CENTER,
  },
  7: {
    adjacent: [1, 8, 12, 52],
    color: DistrictColor.ORANGE,
    position: [36.1, 56.4],
    sector: Sector.CENTER,
  },
  8: {
    adjacent: [7, 9],
    color: DistrictColor.GREEN,
    position: [45.8, 52.1],
    sector: Sector.CENTER,
  },
  9: {
    adjacent: [3, 4, 8, 10],
    color: DistrictColor.ORANGE,
    position: [53.0, 47.8],
    sector: Sector.CENTER,
  },
  10: {
    adjacent: [5, 9, 11, 13, 14],
    color: DistrictColor.RED,
    position: [61.9, 54.2],
    sector: Sector.CENTER,
  },
  11: {
    adjacent: [10],
    color: DistrictColor.GRAY,
    position: [73.0, 55.3],
    sector: Sector.CENTER,
  },
  12: {
    adjacent: [7, 13, 36],
    color: DistrictColor.RED,
    position: [42.4, 69.3],
    sector: Sector.CENTER,
  },
  13: {
    adjacent: [10, 12, 14, 38],
    color: DistrictColor.BLUE,
    position: [53.6, 65.7],
    sector: Sector.CENTER,
  },
  14: {
    adjacent: [10, 13, 33, 39],
    color: DistrictColor.GREEN,
    position: [66.2, 64.6],
    sector: Sector.CENTER,
  },
  // North
  15: {
    adjacent: [16, 19, 45],
    color: DistrictColor.GRAY,
    position: [29.6, 6.6],
    sector: Sector.NORTH,
  },
  16: {
    adjacent: [15, 17, 20],
    color: DistrictColor.BLUE,
    position: [45.8, 5.2],
    sector: Sector.NORTH,
  },
  17: {
    adjacent: [16, 18, 22, 23],
    color: DistrictColor.GRAY,
    position: [58.9, 7.9],
    sector: Sector.NORTH,
  },
  18: {
    adjacent: [17, 23, 26],
    color: DistrictColor.ORANGE,
    position: [78.0, 7.2],
    sector: Sector.NORTH,
  },
  19: {
    adjacent: [0, 15, 20, 47],
    color: DistrictColor.ORANGE,
    position: [30.9, 18.9],
    sector: Sector.NORTH,
  },
  20: {
    adjacent: [16, 19, 21, 22],
    color: DistrictColor.GREEN,
    position: [43.8, 14.4],
    sector: Sector.NORTH,
  },
  21: {
    adjacent: [20],
    color: DistrictColor.RED,
    position: [38.9, 12.0],
    sector: Sector.NORTH,
  },
  22: {
    adjacent: [0, 17, 20],
    color: DistrictColor.RED,
    position: [52.6, 17.8],
    sector: Sector.NORTH,
  },
  23: {
    adjacent: [17, 18, 24, 25],
    color: DistrictColor.BLUE,
    position: [69.7, 18.3],
    sector: Sector.NORTH,
  },
  24: {
    adjacent: [6, 23],
    color: DistrictColor.GREEN,
    position: [62.9, 26.9],
    sector: Sector.NORTH,
  },
  // East
  25: {
    adjacent: [6, 23, 26, 27],
    color: DistrictColor.GRAY,
    position: [79.7, 23.9],
    sector: Sector.EAST,
  },
  26: {
    adjacent: [18, 25, 29],
    color: DistrictColor.GREEN,
    position: [91.3, 15.1],
    sector: Sector.EAST,
  },
  27: {
    adjacent: [25, 28, 29, 30],
    color: DistrictColor.RED,
    position: [84.5, 30.3],
    sector: Sector.EAST,
  },
  28: {
    adjacent: [27],
    color: DistrictColor.GREEN,
    position: [88.9, 34.8],
    sector: Sector.EAST,
  },
  29: {
    adjacent: [26, 27, 31],
    color: DistrictColor.ORANGE,
    position: [94.6, 27.3],
    sector: Sector.EAST,
  },
  30: {
    adjacent: [5, 27, 31, 32],
    color: DistrictColor.BLUE,
    position: [83.5, 44.9],
    sector: Sector.EAST,
  },
  31: {
    adjacent: [29, 30, 32],
    color: DistrictColor.GRAY,
    position: [94.3, 43.4],
    sector: Sector.EAST,
  },
  32: {
    adjacent: [30, 31, 33, 34],
    color: DistrictColor.RED,
    position: [89.2, 58.9],
    sector: Sector.EAST,
  },
  33: {
    adjacent: [14, 32, 34, 39, 43],
    color: DistrictColor.BLUE,
    position: [80.3, 72.4],
    sector: Sector.EAST,
  },
  34: {
    adjacent: [32, 33, 44],
    color: DistrictColor.ORANGE,
    position: [92.6, 75.6],
    sector: Sector.EAST,
  },
  // South
  35: {
    adjacent: [36],
    color: DistrictColor.ORANGE,
    position: [22.8, 85.1],
    sector: Sector.SOUTH,
  },
  36: {
    adjacent: [12, 35, 37, 41, 52, 54],
    color: DistrictColor.GRAY,
    position: [30.2, 80.1],
    sector: Sector.SOUTH,
  },
  37: {
    adjacent: [36, 38, 41],
    color: DistrictColor.GREEN,
    position: [43.5, 81.9],
    sector: Sector.SOUTH,
  },
  38: {
    adjacent: [13, 37, 39, 42],
    color: DistrictColor.RED,
    position: [54.3, 78.8],
    sector: Sector.SOUTH,
  },
  39: {
    adjacent: [14, 33, 38, 42],
    color: DistrictColor.ORANGE,
    position: [65.0, 76.5],
    sector: Sector.SOUTH,
  },
  40: {
    adjacent: [41, 53],
    color: DistrictColor.GREEN,
    position: [17.9, 92.3],
    sector: Sector.SOUTH,
  },
  41: {
    adjacent: [36, 37, 40, 42],
    color: DistrictColor.BLUE,
    position: [37.2, 93.4],
    sector: Sector.SOUTH,
  },
  42: {
    adjacent: [38, 39, 41, 43],
    color: DistrictColor.GRAY,
    position: [61.5, 88.5],
    sector: Sector.SOUTH,
  },
  43: {
    adjacent: [33, 42, 44],
    color: DistrictColor.RED,
    position: [76.6, 91.6],
    sector: Sector.SOUTH,
  },
  44: {
    adjacent: [43, 34],
    color: DistrictColor.BLUE,
    position: [87.0, 91.9],
    sector: Sector.SOUTH,
  },
  // West
  45: {
    adjacent: [15, 46, 47],
    color: DistrictColor.RED,
    position: [16.2, 11.0],
    sector: Sector.WEST,
  },
  46: {
    adjacent: [45, 47, 48],
    color: DistrictColor.BLUE,
    position: [7.4, 23.2],
    sector: Sector.WEST,
  },
  47: {
    adjacent: [19, 45, 46, 48, 49],
    color: DistrictColor.GREEN,
    position: [16.4, 29.4],
    sector: Sector.WEST,
  },
  48: {
    adjacent: [46, 47, 51],
    color: DistrictColor.GRAY,
    position: [6.2, 42.5],
    sector: Sector.WEST,
  },
  49: {
    adjacent: [1, 47, 52],
    color: DistrictColor.GRAY,
    position: [18.6, 46.3],
    sector: Sector.WEST,
  },
  50: {
    adjacent: [51, 53],
    color: DistrictColor.GREEN,
    position: [4.0, 64.6],
    sector: Sector.WEST,
  },
  51: {
    adjacent: [48, 50, 52, 54],
    color: DistrictColor.ORANGE,
    position: [11.1, 59.8],
    sector: Sector.WEST,
  },
  52: {
    adjacent: [7, 36, 49, 51, 54],
    color: DistrictColor.BLUE,
    position: [22.9, 61.6],
    sector: Sector.WEST,
  },
  53: {
    adjacent: [40, 50, 54],
    color: DistrictColor.ORANGE,
    position: [5.9, 80.3],
    sector: Sector.WEST,
  },
  54: {
    adjacent: [36, 51, 52, 53],
    color: DistrictColor.RED,
    position: [15.1, 74.3],
    sector: Sector.WEST,
  },
}

export const LAKES: DistrictId[][] = [
  [1, 2, 3, 7, 8, 9],
  [7, 8, 9, 10, 12, 13],
  [15, 16, 19, 20, 21],
  [27, 28, 29, 30, 31],
  [37, 38, 41, 42],
  [47, 48, 49, 51, 52],
]

export const SECTORS: Record<PlayerCount, Sector[]> = {
  2: [Sector.CENTER, Sector.NORTH, Sector.EAST],
  3: [Sector.CENTER, Sector.NORTH, Sector.EAST, Sector.SOUTH],
  4: [Sector.CENTER, Sector.NORTH, Sector.EAST, Sector.SOUTH, Sector.WEST],
}

export const TOKENS: Record<PlayerCount, Record<Token, number>> = {
  2: {
    [Token.FANCY]: 5,
    [Token.METRO]: 6,
    [Token.RUINS]: 6,
  },
  3: {
    [Token.FANCY]: 8,
    [Token.METRO]: 7,
    [Token.RUINS]: 7,
  },
  4: {
    [Token.FANCY]: 9,
    [Token.METRO]: 9,
    [Token.RUINS]: 9,
  },
}

export const TOWERS: DistrictId[][] = [
  [0, 2, 3],
  [3, 4, 9],
  [10, 13, 14],
  [17, 18, 23],
  [30, 31, 32],
  [32, 33, 34],
  [36, 37, 41],
  [38, 39, 42],
  [45, 46, 47],
  [45, 47, 48],
  [51, 52, 54],
]

export function getAdjacentDistricts(district: DistrictId): DistrictId[] {
  return DISTRICTS[district].adjacent
}

export function getAvailableDistricts(playerCount: PlayerCount): DistrictId[] {
  const availableSectors = SECTORS[playerCount]
  return keys(
    filter(DISTRICTS, ({ sector }) => availableSectors.includes(sector))
  ).map(district => Number.parseInt(district, 10))
}

export function getAvailableTokens(playerCount: PlayerCount): Token[] {
  return enumValues(Token).reduce<Token[]>((tokens, token) => {
    const tokenCount = TOKENS[playerCount][token]
    repeat(tokenCount, () => tokens.push(token))
    return tokens
  }, [])
}

export function getBuildingCount(): number {
  return BUILDINGS.length
}

export function getBuildingSize(height: number): BuildingSize {
  return BUILDINGS[height]
}

export function getDistrictColor(district: DistrictId): DistrictColor {
  return DISTRICTS[district].color
}

export function getDistrictPosition(district: DistrictId): [number, number] {
  return DISTRICTS[district].position
}

export function getSector(district: DistrictId): Sector {
  return DISTRICTS[district].sector
}

export function isAdjacent(
  districtA: DistrictId,
  districtB: DistrictId
): boolean {
  return getAdjacentDistricts(districtA).includes(districtB)
}

export function isBridge(districtA: number, districtB: number): boolean {
  return (
    isAdjacent(districtA, districtB) &&
    getSector(districtA) !== getSector(districtB)
  )
}

export function isTokenAssignable(district: DistrictId): boolean {
  return getAdjacentDistricts(district).length > 1
}
