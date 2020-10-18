import { ObjectState } from "../../utils/ObjectState"
import { GameData } from "../../common/GameData"
import { Action } from "./types"

export type SetGameStateAction = Action<
  "setGameState",
  ObjectState<GameData> | null
>

export function setGameState(
  payload: ObjectState<GameData> | null
): SetGameStateAction {
  return {
    type: "setGameState",
    payload,
    reducer: (state, game) => ({ ...state, game }),
  }
}
