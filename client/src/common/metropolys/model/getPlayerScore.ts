import { PlayerId } from "common/model/GameStateBasic"
import { enumValues } from "common/utils/enums"

import {
  COLOR_MISSION_SCORE,
  DistrictId,
  FANCY_TOKEN_SCORE,
  getAdjacentDistricts,
  getDistrictColor,
  getSector,
  isBridge,
  LAKES,
  METRO_CARD_SCORE,
  METRO_TOKEN_SCORE,
  MissionShape,
  RUINS_CARD_SCORE,
  RUINS_TOKEN_SCORE,
  Sector,
  SHAPE_MISSION_SCORE,
  TOWERS,
} from "./constants"
import { getTokenCount } from "./MetropolysPlayer"
import { getPlayer, MetropolysState } from "./MetropolysState"
import { Token } from "./Token"

export function getBuildDistricts(
  gameState: MetropolysState,
  playerId: PlayerId
): DistrictId[] {
  return gameState.districts.reduce<number[]>((result, district, index) => {
    if (district.building?.playerId === playerId) {
      result.push(index)
    }

    return result
  }, [])
}

export function getColorMissionCount(
  gameState: MetropolysState,
  playerId: PlayerId
): number {
  const { color } = getPlayer(gameState, playerId)
  return getBuildDistricts(gameState, playerId).filter(
    district => getDistrictColor(district) === color
  ).length
}

export function getBridgeMissionCount(
  gameState: MetropolysState,
  playerId: PlayerId
): number {
  const builtDistricts = getBuildDistricts(gameState, playerId)
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
  gameState: MetropolysState,
  playerId: PlayerId
): number {
  const chains: Set<DistrictId>[] = []
  const districts = new Set(getBuildDistricts(gameState, playerId))

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
  gameState: MetropolysState,
  playerId: PlayerId
): number {
  const districts = new Set(getBuildDistricts(gameState, playerId))

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
  gameState: MetropolysState,
  playerId: PlayerId
): number {
  const builtDistricts = getBuildDistricts(gameState, playerId)
  return enumValues(Sector).filter(
    sector =>
      builtDistricts.filter(district => getSector(district) === sector)
        .length >= 3
  ).length
}

export function getTowerMissionCount(
  gameState: MetropolysState,
  playerId: PlayerId
): number {
  const districts = new Set(getBuildDistricts(gameState, playerId))

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
  gameState: MetropolysState,
  playerId: PlayerId
): number {
  const { shape } = getPlayer(gameState, playerId)

  return {
    [MissionShape.BRIDGES]: getBridgeMissionCount,
    [MissionShape.CHAINS]: getChainMissionCount,
    [MissionShape.LAKES]: getLakeMissionCount,
    [MissionShape.SECTORS]: getSectorMissionCount,
    [MissionShape.TOWERS]: getTowerMissionCount,
  }[shape](gameState, playerId)
}

export function getPlayerScore(
  gameState: MetropolysState,
  playerId: PlayerId,
  isEndOfGameScoring: boolean = false
): number {
  const { lastRuins, mostMetro } = gameState
  const player = getPlayer(gameState, playerId)

  let score = 0

  score += getColorMissionCount(gameState, playerId) * COLOR_MISSION_SCORE

  score +=
    getShapeMissionCount(gameState, playerId) *
    SHAPE_MISSION_SCORE[player.shape]

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
    // TODO: Sector scoring (only at end of game)
  }

  return score
}
