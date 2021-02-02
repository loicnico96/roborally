import { PlayerStateBasic } from "common/model/GameStateBasic"

import { Token } from "./Token"

export const BUILDING_COUNT = 13

export type MetropolysPlayer = PlayerStateBasic & {
  buildings: boolean[]
  pass: boolean
  tokens: Partial<Record<Token, number>>
}

export function getInitialPlayerState(
  name: string,
  isStartingPlayer: boolean
): MetropolysPlayer {
  return {
    buildings: Array<boolean>(BUILDING_COUNT).fill(true),
    name,
    pass: false,
    ready: !isStartingPlayer,
    tokens: {},
  }
}

export function getTokenCount(player: MetropolysPlayer, token: Token): number {
  return player.tokens[token] ?? 0
}
