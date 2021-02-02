import { PlayerStateBasic } from "common/model/GameStateBasic"

import { DistrictColor } from "./constants"
import { Token } from "./Token"

export type MetropolysPlayer = PlayerStateBasic & {
  buildings: boolean[]
  color: DistrictColor
  pass: boolean
  tokens: Record<Token, number>
}

export function getTokenCount(player: MetropolysPlayer, token: Token): number {
  return player.tokens[token]
}
