import { useMemo } from "react"

import { Collection, GameCollection } from "common/firestore/collections"
import { GameType } from "common/GameSettings"
import { GameData } from "common/model/GameData"
import { RoomId } from "common/model/RoomData"
import { useFirestore, DocumentRef } from "firestore"

export function useClientRef<T extends GameType>(
  gameType: T,
  roomId: RoomId
): DocumentRef<GameData<T>> {
  const firestore = useFirestore()
  return useMemo(
    () =>
      firestore
        .collection(Collection.GAME)
        .doc(gameType)
        .collection(GameCollection.CLIENT)
        .doc(roomId) as DocumentRef<GameData<T>>,
    [firestore, gameType, roomId]
  )
}
