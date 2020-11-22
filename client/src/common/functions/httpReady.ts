import { GamePhase } from "../roborally/model/RoborallyState"
import { Program } from "../roborally/model/Program"

export type HttpReadyParams = {
  gameId: string
  phase: GamePhase
  poweredDown?: boolean
  program?: Program
  turn: number
}
