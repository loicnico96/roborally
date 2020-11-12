import { Board, BoardId } from "./Board"
import { Direction, Position } from "./Position"
import { RoborallyPlayer, getInitialPlayerState } from "./RoborallyPlayer"
import { GameStateBasic, PlayerId } from "common/model/GameStateBasic"

export enum GamePhase {
  STANDBY = "standby",
  PROGRAM = "program",
  RESOLVE_PLAYERS = "resolve_players",
  RESOLVE_CONVEYORS_FAST = "resolve_conveyors_fast",
  RESOLVE_CONVEYORS = "resolve_conveyors",
  RESOLVE_GEARS = "resolve_gears",
  RESOLVE_LASERS = "resolve_lasers",
  RESOLVE_CHECKPOINTS = "resolve_checkpoints",
}

export type RoborallyState = GameStateBasic<RoborallyPlayer> & {
  board: Board
  boarId: BoardId
  checkpoints: Position[]
  phase: GamePhase
  playerCurrent: PlayerId | null
  sequence: number
  turn: number
}

export function getInitialGameState(
  boarId: BoardId,
  boardData: Board,
  checkpoints: Position[],
  playerIds: PlayerId[],
  initialPos: Position,
  initialDir: Direction
): RoborallyState {
  return {
    boarId,
    board: boardData,
    checkpoints,
    phase: GamePhase.STANDBY,
    playerCurrent: null,
    playerOrder: playerIds,
    players: playerIds.reduce((players, playerId) => {
      players[playerId] = getInitialPlayerState(initialPos, initialDir)
      return players
    }, {} as Record<PlayerId, RoborallyPlayer>),
    sequence: 0,
    turn: 0,
  }
}
