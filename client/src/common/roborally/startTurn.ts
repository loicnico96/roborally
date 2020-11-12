import update from "immutability-helper"
import { mapValues } from "common/utils/objects"
import { GameState, GamePhase } from "./model/GameState"
import { Card, getAllCards } from "./model/Card"
import { shuffle } from "common/utils/arrays"
import {
  getLockedProgram,
  getPlayerHandSize,
  PlayerId,
} from "./model/PlayerState"

function getDeck(gameState: GameState): Card[] {
  const unavailableCards: Set<Card> = new Set()
  Object.values(gameState.players).forEach(player => {
    getLockedProgram(player).forEach(card => {
      if (card !== null) {
        unavailableCards.add(card)
      }
    })
  })

  return getAllCards().filter(card => !unavailableCards.has(card))
}

function drawCards(gameState: GameState): Record<PlayerId, Card[]> {
  const deck = shuffle(getDeck(gameState))
  let index = 0
  return mapValues(gameState.players, player => {
    if (player.down) {
      return []
    }

    const nextIndex = index + getPlayerHandSize(player)
    const hand = deck.slice(index, nextIndex)
    index = nextIndex
    return hand
  })
}

export function startTurn(gameState: GameState): GameState {
  const playerHands = drawCards(gameState)
  return update(gameState, {
    phase: { $set: GamePhase.PROGRAM },
    players: players =>
      mapValues(players, (player, playerId) =>
        update(player, {
          cards: { $set: playerHands[playerId] },
          ready: { $set: false },
        })
      ),
  })
}
