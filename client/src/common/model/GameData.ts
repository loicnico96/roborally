import { GameState, GameType } from "common/GameSettings"

export type GameData<T extends GameType = GameType> = {
  game: T
  state: GameState<T>
}

export function isGameType<T extends GameType>(
  gameData: GameData,
  gameType: T
): gameData is GameData<T> {
  return gameData.game === gameType
}
