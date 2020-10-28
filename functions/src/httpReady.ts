import { getCollection, Collection } from "./utils/collections"
import { preconditionError, validationError } from "./utils/error"
import { firestore } from "./utils/firestore"
import { httpsCallable } from "./utils/httpsCallable"
import { optional, required } from "./utils/validation"
import { validateBoolean, validateProgram, validateString } from "./utils/validators"
import { GamePhase, GameData } from "../../client/src/common/GameData"
import { confirmPlayerProgram } from "./game/confirmPlayerProgram"
import { isValidProgram } from "./game/isValidProgram"
import { readyPlayerForTurn } from "./game/readyPlayerForTurn"
import { resolveTurn } from "./game/resolveTurn"
import { startTurn } from "./game/startTurn"

const validationSchema = {
  gameId: required(validateString),
  playerId: required(validateString),
  program: optional(validateProgram),
  poweredDown: optional(validateBoolean)
}

function allPlayersReady(gameData: GameData): boolean {
  return Object.values(gameData.players).every(player => player.ready)
}

export const httpReady = httpsCallable(validationSchema, async (data) => {
  await firestore.runTransaction(async (transaction) => {
    const gameRef = getCollection(Collection.GAME).doc(data.gameId)
    const gameDoc = await transaction.get(gameRef)
    const initialState = gameDoc.data()
    if (initialState === undefined) {
      throw preconditionError("Invalid game ID")
    }

    const { playerId } = data
    const player = initialState.players[playerId]
    if (player === undefined) {
      throw preconditionError("Not a player")
    }

    if (player.ready) {
      return
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

        gameState = confirmPlayerProgram(gameState, playerId, data.program, data.poweredDown)
        transaction.set(gameRef, gameState)

        if (allPlayersReady(gameState)) {
          gameState = resolveTurn(gameState)
          transaction.set(gameRef, gameState)
        }
      }

      default:
        throw preconditionError("Invalid game state")
    }
  })
})
