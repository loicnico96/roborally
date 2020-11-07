import { BoardData } from "../model/BoardData"
import { GameState } from "../model/GameState"
import { RoomData } from "../model/RoomData"

export enum Collection {
  BOARD = "board",
  CLIENT = "client",
  ROOM = "room",
  SERVER = "server",
}

export type CollectionData<T extends Collection = Collection> = {
  [Collection.BOARD]: BoardData
  [Collection.CLIENT]: GameState
  [Collection.ROOM]: RoomData
  [Collection.SERVER]: GameState
}[T]
