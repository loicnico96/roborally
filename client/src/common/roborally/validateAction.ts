import { RoborallyAction } from "common/functions/httpGameAction"
import { PlayerId } from "common/model/GameStateBasic"
import {
  validateBoolean,
  validateObject,
  Validator,
} from "common/utils/validation"

import { isValidProgram } from "./isValidProgram"
import { Program } from "./model/Program"
import { GamePhase, RoborallyState } from "./model/RoborallyState"

function validateProgram(): Validator<Program> {
  return (value: unknown) => {
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
}

export function validateAction(
  gameState: RoborallyState,
  playerId: PlayerId,
  action: unknown
): RoborallyAction {
  switch (gameState.phase) {
    case GamePhase.STANDBY: {
      const typedAction = validateObject({
        poweredDown: validateBoolean(),
        program: validateProgram(),
      })(action)

      return typedAction
    }

    case GamePhase.PROGRAM: {
      const typedAction = validateObject({
        poweredDown: validateBoolean(),
        program: validateProgram(),
      })(action)

      const player = gameState.players[playerId]
      if (!isValidProgram(typedAction.program, player)) {
        throw Error("Invalid program")
      }

      return typedAction
    }

    default: {
      throw Error("Inconsistent phase")
    }
  }
}
