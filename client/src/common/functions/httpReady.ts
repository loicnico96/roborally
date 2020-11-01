import { GamePhase } from "../model/GameState"
import { Program } from "../model/Program"

export type HttpReadyParams = {
  gameId: string
  phase: GamePhase
  playerId: string
  poweredDown?: boolean
  program?: Program
  turn: number
}
