import {
  Collection,
  CollectionData,
  DataFetcher,
  GameCollection,
  GameCollectionData,
  GameInfo,
} from "common/firestore/collections"
import { GameType } from "common/GameSettings"
import { GameData } from "common/model/GameData"
import { RoomId, RoomData } from "common/model/RoomData"

import { notFoundError } from "./errors"
import { firestore } from "./firestore"

export type DocumentData = FirebaseFirestore.DocumentData
export type CollectionRef<
  T extends DocumentData
> = FirebaseFirestore.CollectionReference<T>
export type DocumentRef<
  T extends DocumentData
> = FirebaseFirestore.DocumentReference<T>

export function getCollection<C extends Collection>(
  collectionId: C
): CollectionRef<CollectionData<C>> {
  return firestore.collection(collectionId) as CollectionRef<CollectionData<C>>
}

export function getRoomRef(roomId: RoomId): DocumentRef<RoomData> {
  return getCollection(Collection.ROOM).doc(roomId)
}

export function getGameRef<T extends GameType>(
  gameType: T
): DocumentRef<GameInfo<T>> {
  return getCollection(Collection.GAME).doc(gameType) as DocumentRef<
    GameInfo<T>
  >
}

export function getGameCollection<T extends GameType, C extends GameCollection>(
  gameType: T,
  collectionId: C
): CollectionRef<GameCollectionData<T, C>> {
  return getGameRef(gameType).collection(collectionId) as CollectionRef<
    GameCollectionData<T, C>
  >
}

export function getClientRef<T extends GameType>(
  gameType: T,
  roomId: RoomId
): DocumentRef<GameData<T>> {
  return getGameCollection(gameType, GameCollection.CLIENT).doc(roomId)
}

export function getServerRef<T extends GameType>(
  gameType: T,
  roomId: RoomId
): DocumentRef<GameData<T>> {
  return getGameCollection(gameType, GameCollection.SERVER).doc(roomId)
}

export function getDataFetcher<T extends GameType>(
  gameType: T,
  transaction: FirebaseFirestore.Transaction
): DataFetcher<T> {
  return async <C extends GameCollection>(
    collectionId: C,
    documentId: string
  ) => {
    const ref = getGameCollection(gameType, collectionId).doc(documentId)
    const doc = await transaction.get(ref)
    const data = doc.data()
    if (data === undefined) {
      const refId = `${collectionId}/${documentId}`
      throw notFoundError(`Document ${refId} could not be found`)
    }

    return data
  }
}
