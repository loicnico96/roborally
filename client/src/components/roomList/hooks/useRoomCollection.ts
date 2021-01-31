import { useMemo } from "react"

import { Collection } from "common/firestore/collections"
import { RoomData } from "common/model/RoomData"
import { useFirestore, CollectionRef } from "firestore"

export function useRoomCollection(): CollectionRef<RoomData> {
  const firestore = useFirestore()
  return useMemo(
    () => firestore.collection(Collection.ROOM) as CollectionRef<RoomData>,
    [firestore]
  )
}
