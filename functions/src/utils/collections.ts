import { firestore } from "./firestore"
import { BoardData } from "../common/BoardData"
import { GameData } from "../common/GameData"
import { RoomData } from "../common/RoomData"

export enum Collection {
  BOARD = "board",
  GAME = "game",
  ROOM = "room"
}

type FirestoreData = FirebaseFirestore.DocumentData
type DocumentData<T extends Collection = Collection> = {
  [Collection.BOARD]: BoardData,
  [Collection.GAME]: GameData,
  [Collection.ROOM]: RoomData
}[T]

type CollectionReference<T extends DocumentData> = FirebaseFirestore.CollectionReference<T>
type DataConverter<T extends DocumentData> = FirebaseFirestore.FirestoreDataConverter<T>

const IDENTITY_CONVERTER: DataConverter<DocumentData> = {
  fromFirestore: (data: FirestoreData): DocumentData => data,
  toFirestore: (data: DocumentData): FirestoreData => data,
}

function getConverter<T extends Collection>(
  collectionId: T
): DataConverter<DocumentData<T>> {
  return IDENTITY_CONVERTER as DataConverter<DocumentData<T>>
}

export function getCollection<T extends Collection>(
  collectionId: T
): CollectionReference<DocumentData<T>> {
  const converter = getConverter(collectionId)
  return firestore.collection(collectionId).withConverter(converter)
}
