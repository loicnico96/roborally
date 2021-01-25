import { PlayerStateBasic } from "common/model/PlayerStateBasic"
import { Token } from "./Token"

export const BUILDING_COUNT = 13

export type MetropolysPlayer = PlayerStateBasic & {
  buildings: boolean[]
  pass: boolean
  tokens: Partial<Record<Token, number>>
}

export function getInitialPlayerState(
  isStartingPlayer: boolean
): MetropolysPlayer {
  return {
    buildings: Array<boolean>(BUILDING_COUNT).fill(true),
    pass: false,
    ready: !isStartingPlayer,
    tokens: {},
  }
}
