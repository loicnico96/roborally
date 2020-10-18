import { useCallback } from "react"
import { useDispatch } from "../../Redux"
import { setRoomState } from "../../Redux/actions/setRoomState"
import { useFirestoreLoader, Collection } from "../../Firestore"
import { ObjectId, ObjectState } from "../../utils/ObjectState"
import { RoomData } from "../../common/RoomData"

export function useRoomLoader(roomId: ObjectId) {
  const dispatch = useDispatch()
  const handler = useCallback(
    (state: ObjectState<RoomData> | null) => {
      dispatch(setRoomState(state))
    },
    [dispatch]
  )

  useFirestoreLoader(Collection.ROOM, roomId, handler)
}
