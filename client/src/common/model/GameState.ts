import { BoardData } from "./BoardData"
import { Direction, Position } from "./Position"
import { PlayerId, PlayerState, getInitialPlayerState } from "./PlayerState"

export enum GamePhase {
  STANDBY = "standby",
  PROGRAM = "program",
  RESOLVE = "resolve",
}

export type GameState = {
  board: BoardData
  phase: GamePhase
  players: Record<PlayerId, PlayerState>
  turn: number
}

export function getInitialGameState(
  board: BoardData,
  playerIds: PlayerId[],
  initialPos: Position,
  initialDir: Direction
): GameState {
  return {
    board,
    phase: GamePhase.STANDBY,
    players: playerIds.reduce((players, playerId) => {
      players[playerId] = getInitialPlayerState(initialPos, initialDir)
      return players
    }, {} as Record<PlayerId, PlayerState>),
    turn: 0,
  }
}
