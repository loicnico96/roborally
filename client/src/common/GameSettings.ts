import { DataFetcher } from "./firestore/collections"
import { GameContext, StateChangeHandler } from "./GameContext"
import { GameStateBasic, PlayerId } from "./model/GameStateBasic"
import { PlayerStateBasic } from "./model/PlayerStateBasic"
import { RoborallySettings } from "./roborally/RoborallySettings"
import { ObjectRecord } from "./utils/objects"
import { Validator } from "./utils/validation"

export enum GameType {
  ROBORALLY = "roborally",
}

export type BaseSettings<
  Player extends PlayerStateBasic,
  State extends GameStateBasic<Player>,
  Options extends ObjectRecord,
  Context extends GameContext<Player, State>,
  PlayerAction
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
    onStateChanged?: StateChangeHandler<State>
  ) => Context

  resolvePlayerAction: (
    ctx: Context,
    playerId: PlayerId,
    action: PlayerAction
  ) => Promise<void>

  resolveState: (ctx: Context) => Promise<void>

  validateAction: (
    gameState: State,
    playerId: PlayerId,
    action: unknown
  ) => PlayerAction

  validateOptions: Validator<Options>
}

const SETTINGS = {
  [GameType.ROBORALLY]: RoborallySettings,
}

export type GameSettings<T extends GameType = GameType> = typeof SETTINGS[T]

export type GameOptions<T extends GameType = GameType> = GameSettings<
  T
> extends BaseSettings<any, any, infer Options, any, any>
  ? Options
  : never

export type GameState<T extends GameType = GameType> = GameSettings<
  T
> extends BaseSettings<any, infer State, any, any, any>
  ? State
  : never

export function getGameSettings<T extends GameType>(game: T): GameSettings<T> {
  return SETTINGS[game]
}
