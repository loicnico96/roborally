import { getCollection } from "../utils/collections"
import { preconditionError, validationError } from "../utils/error"
import { firestore } from "../utils/firestore"
import { httpsCallable } from "../utils/httpsCallable"
import { optional, required } from "../utils/validation"
import {
  validateBoolean,
  validateProgram,
  validateString,
  validateGamePhase,
  validateInteger,
} from "../utils/validators"
import { GamePhase, GameData } from "../common/model/GameData"
import { confirmPlayerProgram } from "../common/runtime/confirmPlayerProgram"
import { isValidProgram } from "../common/runtime/isValidProgram"
import { readyPlayerForTurn } from "../common/runtime/readyPlayerForTurn"
import { resolveTurn } from "../common/runtime/resolveTurn"
import { startTurn } from "../common/runtime/startTurn"
import { Collection } from "../common/functions/collections"

const validationSchema = {
  gameId: required(validateString),
  phase: required(validateGamePhase),
  playerId: required(validateString),
  poweredDown: optional(validateBoolean),
  program: optional(validateProgram),
  turn: required(validateInteger),
}

function allPlayersReady(gameData: GameData): boolean {
  return Object.values(gameData.players).every(player => player.ready)
}

export const httpReady = httpsCallable(validationSchema, async data => {
  const success = await firestore.runTransaction(async transaction => {
    const gameRef = getCollection(Collection.GAME).doc(data.gameId)
    const gameDoc = await transaction.get(gameRef)
    const initialState = gameDoc.data()
    if (initialState === undefined) {
      throw preconditionError("Invalid game ID")
    }

    if (initialState.phase !== data.phase) {
      throw preconditionError("Inconsistent state - wrong phase")
    }

    if (initialState.turn !== data.turn) {
      throw preconditionError("Inconsistent state - wrong turn")
    }

    const { playerId } = data
    const player = initialState.players[playerId]
    if (player === undefined) {
      throw preconditionError("Not a player")
    }

    if (player.ready) {
      return false
    }

    let gameState = initialState

    switch (gameState.phase) {
      case GamePhase.STANDBY: {
        gameState = readyPlayerForTurn(gameState, playerId)
        transaction.set(gameRef, gameState)

        if (allPlayersReady(gameState)) {
          gameState = startTurn(gameState)
          transaction.set(gameRef, gameState)
        }

        return true
      }

      case GamePhase.PROGRAM: {
        if (data.poweredDown === undefined) {
          throw validationError("Missing field 'poweredDown'")
        }

        if (data.program === undefined) {
          throw validationError("Missing field 'program'")
        }

        if (!isValidProgram(data.program, player)) {
          throw preconditionError("Invalid program")
        }

        gameState = confirmPlayerProgram(
          gameState,
          playerId,
          data.program,
          data.poweredDown
        )
        transaction.set(gameRef, gameState)

        if (allPlayersReady(gameState)) {
          gameState = resolveTurn(gameState)
          transaction.set(gameRef, gameState)
        }

        return true
      }

      default:
        throw preconditionError("Invalid game state")
    }
  })

  return { success }
})
