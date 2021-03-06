import { GameStateBasic, PlayerId } from "common/model/GameStateBasic"
import { UserInfo } from "common/model/UserInfo"

import { BoardData, BoardId } from "./BoardData"
import { Card, getAllCards } from "./Card"
import { Direction, Position } from "./Position"
import { RoborallyPlayer, getInitialPlayerState } from "./RoborallyPlayer"

export enum GamePhase {
  STANDBY = "standby",
  PROGRAM = "program",
  RESOLVE_TRAPS = "resolve_traps",
  RESOLVE_RANDOMIZERS = "resolve_randomizers",
  RESOLVE_PLAYERS = "resolve_players",
  RESOLVE_CONVEYORS_FAST = "resolve_conveyors_fast",
  RESOLVE_CONVEYORS = "resolve_conveyors",
  RESOLVE_PUSHERS = "resolve_pushers",
  RESOLVE_CRUSHERS = "resolve_crushers",
  RESOLVE_GEARS = "resolve_gears",
  RESOLVE_LASERS = "resolve_lasers",
  RESOLVE_REPAIRS = "resolve_repairs",
  RESOLVE_CHECKPOINTS = "resolve_checkpoints",
}

export type RoborallyState = GameStateBasic & {
  board: BoardData
  boardIds: BoardId[]
  checkpoints: Position[]
  currentPlayer: PlayerId | null
  players: Record<PlayerId, RoborallyPlayer>
  deck: Card[]
  phase: GamePhase
  sequence: number
}

export function getInitialGameState(
  boardIds: BoardId[],
  boardData: BoardData,
  checkpoints: Position[],
  playerIds: PlayerId[],
  playerInfos: Record<PlayerId, UserInfo>,
  initialDir: Direction = Direction.NORTH
): RoborallyState {
  return {
    boardIds,
    board: boardData,
    checkpoints,
    currentPlayer: null,
    deck: getAllCards(),
    phase: GamePhase.STANDBY,
    playerOrder: playerIds,
    players: playerIds.reduce(
      (players, playerId) =>
        Object.assign(players, {
          [playerId]: getInitialPlayerState(
            playerInfos[playerId].name,
            checkpoints[0],
            initialDir
          ),
        }),
      {} as Record<PlayerId, RoborallyPlayer>
    ),
    sequence: 0,
    turn: 0,
  }
}
