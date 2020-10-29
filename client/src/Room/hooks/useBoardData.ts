import { useSelector } from "react-redux"
import { BoardData } from "../../common/model/BoardData"
import { getBoardState } from "../../Redux/selectors"
import { isLoaded } from "../../utils/ObjectState"

export function useBoardData(): BoardData {
  const boardState = useSelector(getBoardState)
  if (boardState === null || !isLoaded(boardState)) {
    throw Error("Board data is not loaded.")
  }

  return boardState.data
}
