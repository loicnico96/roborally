import { PlayerId } from "common/model/GameStateBasic"

import {
  COLOR_MISSION_SCORE,
  FANCY_TOKEN_SCORE,
  getDistrictColor,
  METRO_CARD_SCORE,
  METRO_TOKEN_SCORE,
  RUINS_CARD_SCORE,
  RUINS_TOKEN_SCORE,
} from "./constants"
import { getTokenCount } from "./MetropolysPlayer"
import { getPlayer, MetropolysState } from "./MetropolysState"
import { Token } from "./Token"

export function getBuildDistricts(
  gameState: MetropolysState,
  playerId: PlayerId
): number[] {
  return gameState.districts.reduce<number[]>((result, district, index) => {
    if (district.building?.playerId === playerId) {
      result.push(index)
    }

    return result
  }, [])
}

export function getColorObjectiveCount(
  gameState: MetropolysState,
  playerId: PlayerId
): number {
  const { color } = getPlayer(gameState, playerId)
  return getBuildDistricts(gameState, playerId).filter(
    district => getDistrictColor(district) === color
  ).length
}

export function getPlayerScore(
  gameState: MetropolysState,
  playerId: PlayerId,
  isEndOfGameScoring: boolean = false
): number {
  const { lastRuins, mostMetro } = gameState
  const player = getPlayer(gameState, playerId)

  let score = 0

  score += getColorObjectiveCount(gameState, playerId) * COLOR_MISSION_SCORE

  // TODO: Shape objective scoring

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
