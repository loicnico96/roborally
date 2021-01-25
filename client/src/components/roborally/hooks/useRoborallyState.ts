import { GameType } from "common/GameSettings"
import { RoborallyState } from "common/roborally/model/RoborallyState"
import { useGameState } from "hooks/useGameState"

export function useRoborallyState<S>(
  selector: (state: RoborallyState) => S
): S {
  return useGameState(GameType.ROBORALLY, selector)
}
