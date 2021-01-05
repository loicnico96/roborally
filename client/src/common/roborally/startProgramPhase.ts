import { shuffle } from "common/utils/arrays"
import { mapValues, merge } from "common/utils/objects"

import { getPlayerHandSize } from "./model/RoborallyPlayer"
import { RoborallyState, GamePhase } from "./model/RoborallyState"

export function startProgramPhase(gameState: RoborallyState): RoborallyState {
  const deck = shuffle(gameState.deck)

  let index = 0

  const playerHands = mapValues(gameState.players, player => {
    if (player.down) {
      return []
    }

    const nextIndex = index + getPlayerHandSize(player)
    const hand = deck.slice(index, nextIndex)
    index = nextIndex
    return hand
  })

  const remainingCards = deck.slice(index)

  return merge(gameState, {
    deck: remainingCards,
    phase: GamePhase.PROGRAM,
    players: mapValues(gameState.players, (player, playerId) =>
      merge(player, {
        cards: playerHands[playerId],
        ready: false,
      })
    ),
  })
}
