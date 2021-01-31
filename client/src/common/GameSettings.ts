import { DataFetcher } from "./firestore/collections"
import { MetropolysSettings } from "./metropolys/MetropolysSettings"
import { MetropolysAction } from "./metropolys/model/MetropolysAction"
import { MetropolysEvent } from "./metropolys/model/MetropolysEvent"
import { MetropolysOptions } from "./metropolys/model/MetropolysOptions"
import { MetropolysState } from "./metropolys/model/MetropolysState"
import { StateChangeHandler } from "./model/GameContext"
import { PlayerId } from "./model/GameStateBasic"
import { RoomData } from "./model/RoomData"
import { RoborallyAction } from "./roborally/model/RoborallyAction"
import { RoborallyEvent } from "./roborally/model/RoborallyEvent"
import { RoborallyOptions } from "./roborally/model/RoborallyOptions"
import { RoborallyState } from "./roborally/model/RoborallyState"
import { RoborallySettings } from "./roborally/RoborallySettings"
import { Validator } from "./utils/validation"

export enum GameType {
  METROPOLYS = "metropolys",
  ROBORALLY = "roborally",
}

export type GameAction<T extends GameType = GameType> = {
  metropolys: MetropolysAction
  roborally: RoborallyAction
}[T]

export type GameEvent<T extends GameType = GameType> = {
  metropolys: MetropolysEvent
  roborally: RoborallyEvent
}[T]

export type GameOptions<T extends GameType = GameType> = {
  metropolys: MetropolysOptions
  roborally: RoborallyOptions
}[T]

export type GameState<T extends GameType = GameType> = {
  metropolys: MetropolysState
  roborally: RoborallyState
}[T]

export type GameSettings<T extends GameType = GameType> = {
  defaultOptions: GameOptions<T>
  minPlayers: number
  maxPlayers: number

  getInitialGameState: (
    roomData: RoomData<T>,
    fetchData: DataFetcher<T>
  ) => Promise<GameState<T>>

  resolvePlayerAction: (
    gameState: GameState<T>,
    playerId: PlayerId,
    action: GameAction<T>
  ) => Promise<GameState<T>>

  resolveState: (
    gameState: GameState<T>,
    onStateChanged?: StateChangeHandler<GameState<T>, GameEvent<T>>
  ) => Promise<GameState<T>>

  validateAction: (
    gameState: GameState<T>,
    playerId: PlayerId,
    action: unknown
  ) => GameAction<T>

  validateOptions: Validator<GameOptions<T>>
}

const SETTINGS: {
  [T in GameType]: GameSettings<T>
} = {
  [GameType.METROPOLYS]: MetropolysSettings,
  [GameType.ROBORALLY]: RoborallySettings,
}

export function getGameSettings<T extends GameType>(game: T): GameSettings<T> {
  return SETTINGS[game] as GameSettings<any>
}
