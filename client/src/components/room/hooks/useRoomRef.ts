import { useMemo } from "react"

import { Collection } from "common/firestore/collections"
import { RoomData, RoomId } from "common/model/RoomData"
import { useFirestore, DocumentRef } from "firestore"

export function useRoomRef(roomId: RoomId): DocumentRef<RoomData> {
  const firestore = useFirestore()
  return useMemo(
    () =>
      firestore.collection(Collection.ROOM).doc(roomId) as DocumentRef<
        RoomData
      >,
    [firestore, roomId]
  )
}
