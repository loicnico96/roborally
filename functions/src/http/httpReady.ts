import { getCollection } from "../utils/collections"
import { preconditionError, validationError } from "../utils/errors"
import { firestore } from "../utils/firestore"
import { httpsCallable } from "../utils/httpsCallable"
import { Collection } from "common/firestore/collections"
import { GameState, GamePhase } from "common/roborally/model/GameState"
import { Program } from "common/roborally/model/Program"
import { confirmPlayerProgram } from "common/roborally/confirmPlayerProgram"
import { isValidProgram } from "common/roborally/isValidProgram"
import { readyPlayerForTurn } from "common/roborally/readyPlayerForTurn"
import { resolveTurn } from "common/roborally/resolveTurn"
import { startTurn } from "common/roborally/startTurn"
import {
  optional,
  required,
  validateBoolean,
  validateEnum,
  validateNumber,
  validateString,
} from "common/utils/validation"

function validateProgram(value: unknown): Program {
  if (!Array.isArray(value)) {
    throw Error("Not an array")
  }

  if (value.length !== 5) {
    throw Error("Invalid length")
  }

  value.forEach((sequence, index) => {
    if (sequence !== null && !Number.isInteger(sequence)) {
      throw Error(`Invalid sequence ${index}`)
    }
  })

  return value as Program
}

const validationSchema = {
  gameId: required(validateString()),
  phase: required(validateEnum(GamePhase)),
  playerId: required(validateString()),
  poweredDown: optional(validateBoolean()),
  program: optional(validateProgram),
  turn: required(validateNumber({ integer: true })),
}

function allPlayersReady(gameData: GameState): boolean {
  return Object.values(gameData.players).every(player => player.ready)
}

export const httpReady = httpsCallable(validationSchema, async data => {
  const success = await firestore.runTransaction(async transaction => {
    const clientRef = getCollection(Collection.CLIENT).doc(data.gameId)
    const serverRef = getCollection(Collection.SERVER).doc(data.gameId)
    const serverDoc = await transaction.get(serverRef)
    const initialState = serverDoc.data()
    if (initialState === undefined) {
      throw preconditionError("Invalid game ID")
    }

    if (initialState.phase !== data.phase) {
      throw preconditionError("Inconsistent state - Wrong phase")
    }

    if (initialState.turn !== data.turn) {
      throw preconditionError("Inconsistent state - Wrong turn")
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

        if (allPlayersReady(gameState)) {
          gameState = startTurn(gameState)
        }

        transaction.set(clientRef, gameState)
        transaction.set(serverRef, gameState)

        return true
      }

      case GamePhase.PROGRAM: {
        if (data.poweredDown === undefined) {
          throw validationError('Missing field "poweredDown"')
        }

        if (data.program === undefined) {
          throw validationError('Missing field "program"')
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

        transaction.set(clientRef, gameState)

        if (allPlayersReady(gameState)) {
          gameState = await resolveTurn(gameState)
        }

        transaction.set(serverRef, gameState)

        return true
      }

      default:
        throw preconditionError("Invalid game state")
    }
  })

  return { success }
})
