import { PlayerId } from "common/model/GameStateBasic"

import { getTokenCount } from "./MetropolysPlayer"
import { getPlayer, MetropolysState } from "./MetropolysState"
import { Token } from "./Token"

const FANCY_TOKEN_SCORE = 3
const METRO_TOKEN_SCORE = 1
const RUINS_TOKEN_SCORE = -1

const METRO_CARD_SCORE = 3
const RUINS_CARD_SCORE = -2

export function getPlayerScore(
  gameState: MetropolysState,
  playerId: PlayerId
): number {
  const { lastRuins, mostMetro } = gameState
  const player = getPlayer(gameState, playerId)

  let score = 0

  // TODO: Color objective scoring

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

  // TODO: Sector scoring

  return score
}
