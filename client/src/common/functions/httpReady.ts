import { GamePhase, Program } from "../model/GameData"

export type HttpReadyParams = {
  gameId: string
  phase: GamePhase
  playerId: string
  poweredDown?: boolean
  program?: Program
  turn: number
}
