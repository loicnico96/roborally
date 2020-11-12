import { getLockedProgram, RoborallyPlayer } from "./model/RoborallyPlayer"
import { Program } from "./model/Program"

export function isValidProgram(
  program: Program,
  player: RoborallyPlayer
): boolean {
  if (player.down) {
    // Program must be empty
    return program.every(sequence => sequence === null)
  }

  // Program must be complete
  return program.every((sequence, index) => {
    const lockedProgram = getLockedProgram(player)

    // Sequence must match locked program if able
    if (lockedProgram[index] !== null) {
      return lockedProgram[index] === sequence
    }

    // Sequence must not be empty
    if (sequence === null) {
      return false
    }

    // Sequence must be unique
    if (program.indexOf(sequence) !== index) {
      return false
    }

    // Player must have the corresponding card in hand
    if (!player.cards.includes(sequence)) {
      return false
    }

    return true
  })
}
