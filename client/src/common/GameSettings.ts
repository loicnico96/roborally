import { DataFetcher } from "./firestore/collections"
import { PlayerId } from "./model/GameStateBasic"
import { RoborallySettings } from "./roborally/RoborallySettings"

export enum GameType {
  ROBORALLY = "roborally",
}

export type BaseSettings<State, Options> = {
  getDefaultOptions: () => Options
  getInitialGameState: (
    playerIds: PlayerId[],
    options: Options,
    fetchData: DataFetcher
  ) => Promise<State>
}

const SETTINGS = {
  [GameType.ROBORALLY]: RoborallySettings,
}

export type GameSettings<T extends GameType = GameType> = typeof SETTINGS[T]

export type GameOptions<T extends GameType = GameType> = GameSettings<
  T
> extends BaseSettings<any, infer Options>
  ? Options
  : never

export type GameState<T extends GameType = GameType> = GameSettings<
  T
> extends BaseSettings<infer State, any>
  ? State
  : never

export function getGameSettings<T extends GameType>(game: T): GameSettings<T> {
  return SETTINGS[game]
}