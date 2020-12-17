import { Program } from "../roborally/model/Program"
import { GamePhase } from "../roborally/model/RoborallyState"

import { HttpBasicResponse } from "."

export type HttpGameActionParams = {
  gameId: string
  phase: GamePhase
  poweredDown?: boolean
  program?: Program
  turn: number
}

export type HttpGameActionResponse = HttpBasicResponse
