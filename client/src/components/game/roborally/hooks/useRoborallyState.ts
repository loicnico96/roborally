import { RoomId } from "common/model/RoomData"
import { RoborallyState } from "common/roborally/model/RoborallyState"
import { getGameState, useGameState } from "components/game/hooks/useGameState"
import { Store } from "utils/store"

export function getRoborallyState(
  store: Store,
  roomId: RoomId
): RoborallyState {
  return getGameState(store, "roborally", roomId)
}

export function useRoborallyState<S>(
  selector: (state: RoborallyState) => S
): S {
  return useGameState("roborally", selector)
}
