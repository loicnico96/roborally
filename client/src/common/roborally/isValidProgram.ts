import { Program } from "./model/Program"
import { getLockedProgram, RoborallyPlayer } from "./model/RoborallyPlayer"

export function isValidProgram(
  program: Program,
  player: RoborallyPlayer
): boolean {
  const lockedProgram = getLockedProgram(player)
  return program.every((card, index) => {
    // Sequence must not be empty
    if (card === null) {
      return false
    }

    // Sequence must match locked program if able
    if (lockedProgram[index] !== null) {
      return lockedProgram[index] === card
    }

    // Sequence must be unique
    if (program.indexOf(card) !== index) {
      return false
    }

    // Player must have the corresponding card in hand
    if (!player.cards.includes(card)) {
      return false
    }

    return true
  })
}
