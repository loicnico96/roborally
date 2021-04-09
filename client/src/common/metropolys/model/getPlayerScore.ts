import { PlayerId } from "common/model/GameStateBasic"
import { enumValues } from "common/utils/enums"

import {
  BuildingSize,
  COLOR_MISSION_SCORE,
  DistrictId,
  FANCY_TOKEN_SCORE,
  getAdjacentDistricts,
  getBuildingSize,
  getDistrictColor,
  getSector,
  isBridge,
  LAKES,
  METRO_CARD_SCORE,
  METRO_TOKEN_SCORE,
  MissionShape,
  PlayerCount,
  RUINS_CARD_SCORE,
  RUINS_TOKEN_SCORE,
  Sector,
  SECTORS,
  SECTOR_SCORE,
  SHAPE_MISSION_SCORE,
  TOWERS,
} from "./constants"
import { getTokenCount } from "./MetropolysPlayer"
import { getPlayer, MetropolysState } from "./MetropolysState"
import { Token } from "./Token"

export function getBuildDistricts(
  state: MetropolysState,
  playerId: PlayerId
): DistrictId[] {
  return state.districts.reduce<number[]>((result, district, index) => {
    if (district.building?.playerId === playerId) {
      result.push(index)
    }

    return result
  }, [])
}

export function getColorMissionCount(
  state: MetropolysState,
  playerId: PlayerId
): number {
  const { color } = getPlayer(state, playerId)
  return getBuildDistricts(state, playerId).filter(
    district => getDistrictColor(district) === color
  ).length
}

export function getBridgeMissionCount(
  state: MetropolysState,
  playerId: PlayerId
): number {
  const builtDistricts = getBuildDistricts(state, playerId)
  const remainingDistricts = new Set(builtDistricts)

  return builtDistricts.filter(district => {
    if (remainingDistricts.has(district)) {
      const bridgeDistrict = getAdjacentDistricts(district).find(
        adjacent =>
          remainingDistricts.has(adjacent) && isBridge(district, adjacent)
      )

      if (bridgeDistrict !== undefined) {
        remainingDistricts.delete(bridgeDistrict)
        remainingDistricts.delete(district)
        return true
      }
    }

    return false
  }).length
}

export function getChainMissionCount(
  state: MetropolysState,
  playerId: PlayerId
): number {
  const chains: Set<DistrictId>[] = []
  const districts = new Set(getBuildDistricts(state, playerId))

  while (districts.size > 0) {
    const chain: Set<DistrictId> = new Set()
    const addChainRecursive = (district: DistrictId) => {
      chain.add(district)
      districts.delete(district)
      getAdjacentDistricts(district).forEach(adjacent => {
        if (districts.has(adjacent)) {
          addChainRecursive(adjacent)
        }
      })
    }

    addChainRecursive(Array.from(districts)[0])
    chains.push(chain)
  }

  return chains.reduce((count, chain) => count + Math.floor(chain.size / 3), 0)
}

export function getLakeMissionCount(
  state: MetropolysState,
  playerId: PlayerId
): number {
  const districts = new Set(getBuildDistricts(state, playerId))

  return LAKES.filter(adjacentDistricts => {
    const lakeDistricts = adjacentDistricts
      .filter(adjacent => districts.has(adjacent))
      .slice(0, 3)

    if (lakeDistricts.length < 3) {
      return false
    }

    lakeDistricts.forEach(district => districts.delete(district))

    return true
  }).length
}

export function getSectorMissionCount(
  state: MetropolysState,
  playerId: PlayerId
): number {
  const builtDistricts = getBuildDistricts(state, playerId)
  return enumValues(Sector).filter(
    sector =>
      builtDistricts.filter(district => getSector(district) === sector)
        .length >= 3
  ).length
}

export function getTowerMissionCount(
  state: MetropolysState,
  playerId: PlayerId
): number {
  const districts = new Set(getBuildDistricts(state, playerId))

  return TOWERS.filter(adjacentDistricts => {
    const towerDistricts = adjacentDistricts
      .filter(adjacent => districts.has(adjacent))
      .slice(0, 3)

    if (towerDistricts.length < 3) {
      return false
    }

    towerDistricts.forEach(district => districts.delete(district))

    return true
  }).length
}

export function getShapeMissionCount(
  state: MetropolysState,
  playerId: PlayerId
): number {
  const { shape } = getPlayer(state, playerId)

  return {
    [MissionShape.BRIDGES]: getBridgeMissionCount,
    [MissionShape.CHAINS]: getChainMissionCount,
    [MissionShape.LAKES]: getLakeMissionCount,
    [MissionShape.SECTORS]: getSectorMissionCount,
    [MissionShape.TOWERS]: getTowerMissionCount,
  }[shape](state, playerId)
}

export function getSectorBuildings(
  state: MetropolysState,
  sector: Sector,
  playerId: PlayerId
): BuildingSize[] {
  const buildings: BuildingSize[] = []

  state.districts.forEach(({ building }, district) => {
    if (building?.playerId === playerId && getSector(district) === sector) {
      buildings.push(getBuildingSize(building.height))
    }
  })

  return buildings.sort((sizeA, sizeB) => sizeB - sizeA)
}

export function getSectorScorePlayerIds(
  state: MetropolysState,
  sector: Sector
): PlayerId[] {
  const buildings: Record<PlayerId, BuildingSize[]> = {}

  state.playerOrder.forEach(playerId => {
    buildings[playerId] = getSectorBuildings(state, sector, playerId)
  })

  const recursive = (playerIds: PlayerId[], index: number): PlayerId[] => {
    let highestPlayerIds: PlayerId[] = []
    let highestSize: BuildingSize | null = null

    playerIds.forEach(playerId => {
      if (buildings[playerId].length > index) {
        const buildingSize = buildings[playerId][index]
        if (highestSize === null || buildingSize > highestSize) {
          highestPlayerIds = [playerId]
          highestSize = buildingSize
        } else if (highestSize === buildingSize) {
          highestPlayerIds = [...highestPlayerIds, playerId]
        }
      }
    })

    switch (highestPlayerIds.length) {
      case 0:
        return index === 0 ? [] : highestPlayerIds
      case 1:
        return highestPlayerIds
      default:
        return recursive(highestPlayerIds, index + 1)
    }
  }

  return recursive(state.playerOrder, 0)
}

export function getSectorCount(
  state: MetropolysState,
  playerId: PlayerId
): number {
  const playerCount = state.playerOrder.length as PlayerCount
  return SECTORS[playerCount].filter(sector =>
    getSectorScorePlayerIds(state, sector).includes(playerId)
  ).length
}

export function getPlayerScore(
  state: MetropolysState,
  playerId: PlayerId,
  isEndOfGameScoring: boolean = true
): number {
  const player = getPlayer(state, playerId)
  const { lastRuins, mostMetro } = state
  const { shape } = player

  let score = 0

  score += getColorMissionCount(state, playerId) * COLOR_MISSION_SCORE

  score += getShapeMissionCount(state, playerId) * SHAPE_MISSION_SCORE[shape]

  score += getTokenCount(player, Token.FANCY) * FANCY_TOKEN_SCORE

  score += getTokenCount(player, Token.METRO) * METRO_TOKEN_SCORE

  score += getTokenCount(player, Token.RUINS) * RUINS_TOKEN_SCORE

  if (mostMetro === playerId) {
    score += METRO_CARD_SCORE
  }

  if (lastRuins === playerId) {
    score += RUINS_CARD_SCORE
  }

  if (isEndOfGameScoring) {
    score += getSectorCount(state, playerId) * SECTOR_SCORE
  }

  return score
}
