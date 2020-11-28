import { Program } from "../roborally/model/Program"
import { GamePhase } from "../roborally/model/RoborallyState"

export type HttpReadyParams = {
  gameId: string
  phase: GamePhase
  poweredDown?: boolean
  program?: Program
  turn: number
}
