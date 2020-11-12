import update from "immutability-helper"
import { mapValues } from "common/utils/objects"
import { RoborallyState, GamePhase } from "./model/RoborallyState"
import { Card, getAllCards } from "./model/Card"
import { shuffle } from "common/utils/arrays"
import {
  getLockedProgram,
  getPlayerHandSize,
  PlayerId,
} from "./model/RoborallyPlayer"

function getDeck(gameState: RoborallyState): Card[] {
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

function drawCards(gameState: RoborallyState): Record<PlayerId, Card[]> {
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

export function startTurn(gameState: RoborallyState): RoborallyState {
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
