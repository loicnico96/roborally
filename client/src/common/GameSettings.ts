import { DataFetcher } from "./firestore/collections"
import { GameContext, StateChangeHandler } from "./GameContext"
import { GameStateBasic, PlayerId } from "./model/GameStateBasic"
import { RoborallySettings } from "./roborally/RoborallySettings"
import { Validator } from "./utils/validation"

export enum GameType {
  ROBORALLY = "roborally",
}

export type BaseSettings<
  State extends GameStateBasic,
  Event,
  Context extends GameContext<State, Event>,
  Options extends Record<string, unknown>,
  Action
> = {
  defaultOptions: Options
  maxPlayers: number
  minPlayers: number

  getInitialGameState: (
    playerIds: PlayerId[],
    options: Options,
    fetchData: DataFetcher
  ) => Promise<State>

  getContext: (
    gameState: State,
    onStateChanged?: StateChangeHandler<State, Event>
  ) => Context

  resolvePlayerAction: (
    ctx: Context,
    playerId: PlayerId,
    action: Action
  ) => Promise<void>

  resolveState: (ctx: Context) => Promise<void>

  validateAction: (
    gameState: State,
    playerId: PlayerId,
    action: unknown
  ) => Action

  validateOptions: Validator<Options>
}

const SETTINGS = {
  [GameType.ROBORALLY]: RoborallySettings,
}

export type GameSettings<T extends GameType = GameType> = typeof SETTINGS[T]

type InferredTypes<T extends GameType> = GameSettings<T> extends BaseSettings<
  infer State,
  infer Event,
  infer Context,
  infer Options,
  infer Action
>
  ? [State, Event, Context, Options, Action]
  : never

export type GameState<T extends GameType = GameType> = InferredTypes<T>[0]
export type GameEvent<T extends GameType = GameType> = InferredTypes<T>[1]
export type GameOptions<T extends GameType = GameType> = InferredTypes<T>[3]
export type GameAction<T extends GameType = GameType> = InferredTypes<T>[4]

export function getGameSettings<T extends GameType>(game: T): GameSettings<T> {
  return SETTINGS[game]
}
