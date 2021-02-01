import { GameType } from "common/GameSettings"
import { MetropolysState } from "common/metropolys/model/MetropolysState"
import { RoomId } from "common/model/RoomData"
import { getGameState, useGameState } from "components/game/hooks/useGameState"
import { Store } from "utils/store"

export function getMetropolysState(
  store: Store,
  roomId: RoomId
): MetropolysState {
  return getGameState(store, GameType.METROPOLYS, roomId)
}

export function useMetropolysState<S>(
  selector: (state: MetropolysState) => S
): S {
  return useGameState(GameType.METROPOLYS, selector)
}
