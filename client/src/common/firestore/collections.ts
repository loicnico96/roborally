import { Board } from "../roborally/model/Board"
import { RoborallyState } from "../roborally/model/RoborallyState"
import { RoomData } from "../model/RoomData"

export enum Collection {
  BOARD = "board",
  CLIENT = "client",
  ROOM = "room",
  SERVER = "server",
}

export type CollectionData<T extends Collection = Collection> = {
  [Collection.BOARD]: Board
  [Collection.CLIENT]: RoborallyState
  [Collection.ROOM]: RoomData
  [Collection.SERVER]: RoborallyState
}[T]
