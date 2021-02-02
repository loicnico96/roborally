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
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  1: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  2: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  3: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  4: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  5: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  6: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  7: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  8: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  9: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  10: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  11: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  12: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  13: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  14: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.CENTER,
  },
  // North
  15: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.NORTH,
  },
  16: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.NORTH,
  },
  17: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.NORTH,
  },
  18: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.NORTH,
  },
  19: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.NORTH,
  },
  20: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.NORTH,
  },
  21: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.NORTH,
  },
  22: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.NORTH,
  },
  23: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.NORTH,
  },
  24: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.NORTH,
  },
  // East
  25: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.EAST,
  },
  26: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.EAST,
  },
  27: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.EAST,
  },
  28: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.EAST,
  },
  29: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.EAST,
  },
  30: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.EAST,
  },
  31: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.EAST,
  },
  32: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.EAST,
  },
  33: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.EAST,
  },
  34: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.EAST,
  },
  // South
  35: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.SOUTH,
  },
  36: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.SOUTH,
  },
  37: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.SOUTH,
  },
  38: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.SOUTH,
  },
  39: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.SOUTH,
  },
  40: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.SOUTH,
  },
  41: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.SOUTH,
  },
  42: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.SOUTH,
  },
  43: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.SOUTH,
  },
  44: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.SOUTH,
  },
  // West
  45: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.WEST,
  },
  46: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.WEST,
  },
  47: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.WEST,
  },
  48: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.WEST,
  },
  49: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.WEST,
  },
  50: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.WEST,
  },
  51: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.WEST,
  },
  52: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.WEST,
  },
  53: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.WEST,
  },
  54: {
    adjacent: [],
    color: DistrictColor.RED,
    position: [0, 0],
    sector: Sector.WEST,
  },
}

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

export function getAdjacentDistricts(district: DistrictId): DistrictId[] {
  return DISTRICTS[district].adjacent
}

export function getAvailableDistricts(playerCount: PlayerCount): DistrictId[] {
  const availableSectors = SECTORS[playerCount]
  return keys(
    filter(DISTRICTS, ({ sector }) => availableSectors.includes(sector))
  )
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
