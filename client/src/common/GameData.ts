export type BoardId = string
export type PlayerId = string
export type Card = number
export type Program = [
  Card | null,
  Card | null,
  Card | null,
  Card | null,
  Card | null
]

export enum GamePhase {
  STANDBY = 'standby',
  PROGRAM = 'program',
  RESOLVE = 'resolve',
}

export type PlayerState = {
  cards: Card[]
  program: Program
  ready: boolean
}

export type GameState = {
  // TODO
}

export type GameData = {
  boardId: BoardId

  players: Record<PlayerId, PlayerState>
  phase: GamePhase
  turn: number

  state: {
    current: GameState
    previous: GameState
  }
}

export function getEmptyProgram(): Program {
  return [null, null, null, null, null]
}

export function getInitialPlayerState(): PlayerState {
  return {
    cards: [],
    program: getEmptyProgram(),
    ready: false,
  }
}

export function getInitialGameState(): GameState {
  return {
    // TODO
  }
}

export function getInitialGameData(
  boardId: BoardId,
  playerIds: PlayerId[]
): GameData {
  const players = playerIds.reduce((players, playerId) => {
    return Object.assign(players, {
      [playerId]: getInitialPlayerState(),
    })
  }, {} as Record<PlayerId, PlayerState>)

  return {
    boardId,
    phase: GamePhase.STANDBY,
    players,
    turn: 0,
    state: {
      current: getInitialGameState(),
      previous: getInitialGameState(),
    },
  }
}

// 1) Waiting for "ready"
// STARTS WHEN: client has status "standby"
// Client sync with master

// 2) Waiting for program selection
// STARTS WHEN: server has status "program"
// Client sync with master

// 3) Resolving turn
// STARTS WHEN: server has status "standby"
// Client sets status "resolve" during resolution, independent from server

// SERVER HAS 2 MODES:

// 1) Waiting for ready:
//  - status = "standby"
//  -

// 2) Waiting for programs:
//  - status = "program"
//  - turn
