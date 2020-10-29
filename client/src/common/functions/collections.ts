import { BoardData } from "../model/BoardData"
import { GameData } from "../model/GameData"
import { RoomData } from "../model/RoomData"

export enum Collection {
  BOARD = "board",
  GAME = "game",
  ROOM = "room",
}

export type CollectionData<T extends Collection = Collection> = {
  [Collection.BOARD]: BoardData
  [Collection.GAME]: GameData
  [Collection.ROOM]: RoomData
}[T]
