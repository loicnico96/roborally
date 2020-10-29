import { GamePhase, Program } from "../../common/GameData"
import { isEnum } from "../../common/utils/types"

export function validateBoolean(value: unknown): boolean {
  if (typeof value !== "boolean") {
    throw Error("Not a boolean")
  }

  return value
}

export function validateGamePhase(value: unknown): GamePhase {
  if (!isEnum(value, GamePhase)) {
    throw Error("Not a game phase")
  }

  return value
}

export function validateInteger(value: unknown): number {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    throw Error("Not an integer")
  }

  return value
}

export function validateNumber(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw Error("Not a number")
  }

  return value
}

export function validateProgram(value: unknown): Program {
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

export function validateString(value: unknown): string {
  if (typeof value !== "string") {
    throw Error("Not a string")
  }

  return value
}
