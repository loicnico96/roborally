import { Program } from "../../../../client/src/common/GameData"

export function validateBoolean(value: unknown): boolean {
  if (typeof value !== "boolean") {
    throw Error("Not a boolean")
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
