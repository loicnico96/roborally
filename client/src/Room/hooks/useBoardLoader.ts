import { useCallback } from "react"
import { useDispatch } from "../../Redux"
import { setBoardState } from "../../Redux/actions/setBoardState"
import { useFirestoreLoader } from "../../Firestore"
import { ObjectId, ObjectState } from "../../utils/ObjectState"
import { BoardData } from "../../common/model/BoardData"
import { Collection } from "../../common/functions/collections"

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
