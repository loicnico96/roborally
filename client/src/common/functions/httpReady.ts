import {GamePhase, Program} from "../GameData"

export type HttpReadyParams = {
  gameId: string,
  phase: GamePhase,
  playerId: string,
  poweredDown?: boolean,
  program?: Program,
  turn: number,
}
