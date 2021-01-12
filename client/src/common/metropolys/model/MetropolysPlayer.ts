import { PlayerStateBasic } from "common/model/PlayerStateBasic"

import { BoardColor, BoardShape } from "./board"
import { TokenType } from "./TokenType"

export type MetropolysPlayer = PlayerStateBasic & {
  buildings: boolean[]
  color: BoardColor
  pass: boolean
  tokens: Partial<Record<TokenType, number>>
  shape: BoardShape
}

export function isAvailableBuilding(
  player: MetropolysPlayer,
  height: number
): boolean {
  return player.buildings[height] === true
}
