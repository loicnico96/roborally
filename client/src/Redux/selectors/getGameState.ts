import { ReduxState } from "../ReduxState"
import { ObjectState } from "../../utils/ObjectState"
import { GameData } from "../../common/GameData"

export function getGameState(state: ReduxState): ObjectState<GameData> | null {
  return state.game
}
