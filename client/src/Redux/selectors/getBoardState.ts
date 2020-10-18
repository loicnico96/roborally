import { ReduxState } from "../ReduxState"
import { ObjectState } from "../../utils/ObjectState"
import { BoardData } from "../../common/BoardData"

export function getBoardState(
  state: ReduxState
): ObjectState<BoardData> | null {
  return state.board
}
