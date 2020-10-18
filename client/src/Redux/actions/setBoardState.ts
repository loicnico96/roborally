import { ObjectState } from "../../utils/ObjectState"
import { BoardData } from "../../common/BoardData"
import { Action } from "./types"

export type SetBoardStateAction = Action<
  "setBoardState",
  ObjectState<BoardData> | null
>

export function setBoardState(
  payload: ObjectState<BoardData> | null
): SetBoardStateAction {
  return {
    type: "setBoardState",
    payload,
    reducer: (state, board) => ({ ...state, board }),
  }
}
