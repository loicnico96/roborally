import { DataFetcher } from "./firestore/collections"
import { StateChangeHandler } from "./GameContext"
import { MetropolysSettings } from "./metropolys/MetropolysSettings"
import { MetropolysAction } from "./metropolys/model/MetropolysAction"
import { MetropolysEvent } from "./metropolys/model/MetropolysEvent"
import { MetropolysOptions } from "./metropolys/model/MetropolysOptions"
import { MetropolysState } from "./metropolys/model/MetropolysState"
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
  [GameType.METROPOLYS]: MetropolysAction
  [GameType.ROBORALLY]: RoborallyAction
}[T]

export type GameEvent<T extends GameType = GameType> = {
  [GameType.METROPOLYS]: MetropolysEvent
  [GameType.ROBORALLY]: RoborallyEvent
}[T]

export type GameOptions<T extends GameType = GameType> = {
  [GameType.METROPOLYS]: MetropolysOptions
  [GameType.ROBORALLY]: RoborallyOptions
}[T]

export type GameState<T extends GameType = GameType> = {
  [GameType.METROPOLYS]: MetropolysState
  [GameType.ROBORALLY]: RoborallyState
}[T]

export type GameSettings<T extends GameType> = {
  type: T
  defaultOptions: GameOptions<T>
  maxPlayers: number
  minPlayers: number

  getInitialGameState: (
    playerOrder: string[],
    options: GameOptions<T>,
    fetchData: DataFetcher
  ) => Promise<GameState<T>>

  resolvePlayerAction: (
    gameState: GameState<T>,
    playerId: string,
    action: GameAction<T>
  ) => Promise<GameState<T>>

  resolveState: (
    gameState: GameState<T>,
    onStateChanged?: StateChangeHandler<GameState<T>, GameEvent<T>>
  ) => Promise<GameState<T>>

  validateAction: (
    gameState: GameState<T>,
    playerId: string,
    action: unknown
  ) => GameAction<T>

  validateOptions: Validator<GameOptions<T>>
}

export const SETTINGS: {
  [T in GameType]: GameSettings<T>
} = {
  [GameType.METROPOLYS]: MetropolysSettings,
  [GameType.ROBORALLY]: RoborallySettings,
}

export function getGameSettings<T extends GameType>(game: T): GameSettings<T> {
  return SETTINGS[game] as any
}
