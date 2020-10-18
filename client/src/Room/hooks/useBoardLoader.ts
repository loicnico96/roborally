import { useCallback } from "react"
import { useDispatch } from "../../Redux"
import { setBoardState } from "../../Redux/actions/setBoardState"
import { useFirestoreLoader, Collection } from "../../Firestore"
import { ObjectId, ObjectState } from "../../utils/ObjectState"
import { BoardData } from "../../common/BoardData"

export function useBoardLoader(boardId: ObjectId) {
  const dispatch = useDispatch()
  const handler = useCallback(
    (state: ObjectState<BoardData> | null) => {
      dispatch(setBoardState(state))
    },
    [dispatch]
  )

  useFirestoreLoader(Collection.BOARD, boardId, handler)
}
