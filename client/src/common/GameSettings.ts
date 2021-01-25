import { DataFetcher } from "./firestore/collections"
import { StateChangeHandler } from "./model/GameContext"
import { PlayerId } from "./model/GameStateBasic"
import { RoborallyAction } from "./roborally/model/RoborallyAction"
import { RoborallyEvent } from "./roborally/model/RoborallyEvent"
import { RoborallyOptions } from "./roborally/model/RoborallyOptions"
import { RoborallyState } from "./roborally/model/RoborallyState"
import { RoborallySettings } from "./roborally/RoborallySettings"
import { Validator } from "./utils/validation"

export type GameType = "roborally"

export type GameAction<T extends GameType = GameType> = {
  roborally: RoborallyAction
}[T]

export type GameEvent<T extends GameType = GameType> = {
  roborally: RoborallyEvent
}[T]

export type GameOptions<T extends GameType = GameType> = {
  roborally: RoborallyOptions
}[T]

export type GameState<T extends GameType = GameType> = {
  roborally: RoborallyState
}[T]

export type GameSettings<T extends GameType = GameType> = {
  defaultOptions: GameOptions<T>
  minPlayers: number
  maxPlayers: number

  getInitialGameState: (
    playerIds: PlayerId[],
    options: GameOptions<T>,
    fetchData: DataFetcher
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
  roborally: RoborallySettings,
}

export function getGameSettings(game: GameType): GameSettings {
  return SETTINGS[game]
}
