import { RoborallyState } from "common/roborally/model/RoborallyState"
import { createContext, useContext } from "react"

const GameContext = createContext<RoborallyState | null>(null)

export function useGameState(): RoborallyState {
  const state = useContext(GameContext)
  if (state === null) {
    throw Error("Invalid game context")
  }

  return state
}

export default GameContext
