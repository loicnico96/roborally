import { useSelector } from "react-redux"
import { GameData } from "../../common/model/GameData"
import { getGameState } from "../../Redux/selectors"
import { isLoaded } from "../../utils/ObjectState"

export function useGameData(): GameData {
  const gameState = useSelector(getGameState)
  if (gameState === null || !isLoaded(gameState)) {
    throw Error("Game data is not loaded.")
  }

  return gameState.data
}
