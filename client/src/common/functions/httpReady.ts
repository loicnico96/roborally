import { GamePhase } from "../roborally/model/GameState"
import { Program } from "../roborally/model/Program"

export type HttpReadyParams = {
  gameId: string
  phase: GamePhase
  playerId: string
  poweredDown?: boolean
  program?: Program
  turn: number
}
