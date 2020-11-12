import { Program } from "common/roborally/model/Program"

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
