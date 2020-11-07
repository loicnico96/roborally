import { BoardData, BoardId } from "./BoardData"
import { Direction, Position } from "./Position"
import { PlayerId, PlayerState, getInitialPlayerState } from "./PlayerState"

export enum GamePhase {
  STANDBY = "standby",
  PROGRAM = "program",
  RESOLVE = "resolve",
}

export type GameState = {
  board: BoardData
  boarId: BoardId
  phase: GamePhase
  playerOrder: PlayerId[]
  players: Record<PlayerId, PlayerState>
  turn: number
}

export function getInitialGameState(
  boarId: BoardId,
  boardData: BoardData,
  playerIds: PlayerId[],
  initialPos: Position,
  initialDir: Direction
): GameState {
  return {
    boarId,
    board: boardData,
    phase: GamePhase.STANDBY,
    playerOrder: playerIds,
    players: playerIds.reduce((players, playerId) => {
      players[playerId] = getInitialPlayerState(initialPos, initialDir)
      return players
    }, {} as Record<PlayerId, PlayerState>),
    turn: 0,
  }
}
