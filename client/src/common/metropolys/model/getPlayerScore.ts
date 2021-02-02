import { PlayerId } from "common/model/GameStateBasic"

import { getDistrictColor } from "./constants"
import { getTokenCount } from "./MetropolysPlayer"
import { getPlayer, MetropolysState } from "./MetropolysState"
import { Token } from "./Token"

const COLOR_OBJECTIVE_SCORE = 2

const FANCY_TOKEN_SCORE = 3
const METRO_TOKEN_SCORE = 1
const RUINS_TOKEN_SCORE = -1

const METRO_CARD_SCORE = 3
const RUINS_CARD_SCORE = -2

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

  score += getColorObjectiveCount(gameState, playerId) * COLOR_OBJECTIVE_SCORE

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
