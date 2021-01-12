import { PlayerStateBasic } from "common/model/PlayerStateBasic"

import { TokenType } from "./TokenType"

export enum MissionColor {
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  E = "e",
}

export enum MissionShape {
  BRIDGES = "bridges",
  DISTRICTS = "districts",
  LAKES = "lakes",
  LINES = "lines",
  TOWERS = "towers",
}

export type MetropolysPlayer = PlayerStateBasic & {
  buildings: boolean[]
  color: MissionColor
  pass: boolean
  tokens: Partial<Record<TokenType, number>>
  shape: MissionShape
}
