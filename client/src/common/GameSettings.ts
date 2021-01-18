import { DataFetcher } from "./firestore/collections"
import { GameContext, StateChangeHandler } from "./GameContext"
import { MetropolysOptions, MetropolysSettings } from "./metropolys/MetropolysSettings"
import { MetropolysState } from "./metropolys/model/MetropolysState"
import { GameStateBasic, PlayerId } from "./model/GameStateBasic"
import { PlayerStateBasic } from "./model/PlayerStateBasic"
import { RoborallyState } from "./roborally/model/RoborallyState"
import { RoborallyOptions, RoborallySettings } from "./roborally/RoborallySettings"
import { ObjectRecord } from "./utils/objects"
import { Validator } from "./utils/validation"

export enum GameType {
  METROPOLYS = "metropolys",
  ROBORALLY = "roborally",
}

export type BaseSettings<
  Player extends PlayerStateBasic,
  State extends GameStateBasic<Player>,
  Options extends ObjectRecord,
  Event,
  Context extends GameContext<Player, State, Event>,
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
    onStateChanged?: StateChangeHandler<State, Event>
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

export type GameState<T extends GameType = GameType> = {
  [GameType.METROPOLYS]: MetropolysState,
  [GameType.ROBORALLY]: RoborallyState,
}[T]

export type GameOptions<T extends GameType = GameType> = {
  [GameType.METROPOLYS]: MetropolysOptions,
  [GameType.ROBORALLY]: RoborallyOptions,
}[T]

const SETTINGS = {
  [GameType.METROPOLYS]: MetropolysSettings,
  [GameType.ROBORALLY]: RoborallySettings,
}

export type GameSettings<T extends GameType = GameType> = typeof SETTINGS[T]

export function getGameSettings<T extends GameType>(game: T): GameSettings<T> {
  return SETTINGS[game]
}
