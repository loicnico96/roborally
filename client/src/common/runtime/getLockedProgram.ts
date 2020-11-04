import { PlayerState } from "../model/PlayerState"
import { Program } from "../model/Program"

const MAX_DAMAGE = 9
const MAX_HAND_SIZE = 10
const PROGRAM_SIZE = 5

export function isDestroyedByDamage(player: PlayerState): boolean {
  return player.damage >= MAX_DAMAGE
}

export function getHandSize(player: PlayerState): number {
  return Math.max(MAX_HAND_SIZE - player.damage, 0)
}

export function getLockedIndex(player: PlayerState): number {
  return Math.min(Math.max(MAX_DAMAGE - player.damage, 0), PROGRAM_SIZE)
}

export function getLockedProgram(player: PlayerState): Program {
  const lockIndex = getLockedIndex(player)
  return player.program.map((card, index) =>
    index >= lockIndex ? card : null
  ) as Program
}
