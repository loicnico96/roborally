import { RoomData } from "../model/RoomData"
import { BoardData } from "../roborally/model/BoardData"
import { RoborallyState } from "../roborally/model/RoborallyState"

export enum Collection {
  BOARD = "board",
  CLIENT = "client",
  ROOM = "room",
  SERVER = "server",
}

export type CollectionData<T extends Collection = Collection> = {
  [Collection.BOARD]: BoardData
  [Collection.CLIENT]: RoborallyState
  [Collection.ROOM]: RoomData
  [Collection.SERVER]: RoborallyState
}[T]

export type DataFetcher = <T extends Collection>(
  collection: T,
  documentId: string
) => Promise<CollectionData<T>>
