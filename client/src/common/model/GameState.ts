import { BoardId } from "./BoardData"
import { Direction, Position } from "./Position"
import { PlayerId, PlayerState, getInitialPlayerState } from "./PlayerState"

export enum GamePhase {
  STANDBY = "standby",
  PROGRAM = "program",
  RESOLVE = "resolve",
}

export type GameState = {
  boardId: BoardId
  phase: GamePhase
  players: Record<PlayerId, PlayerState>
  turn: number
}

export function getInitialGameState(
  boardId: BoardId,
  playerIds: PlayerId[],
  initialPos: Position,
  initialDir: Direction
): GameState {
  return {
    boardId,
    phase: GamePhase.STANDBY,
    players: playerIds.reduce((players, playerId) => {
      players[playerId] = getInitialPlayerState(initialPos, initialDir)
      return players
    }, {} as Record<PlayerId, PlayerState>),
    turn: 0,
  }
}
