import { BoardData } from "../model/BoardData"
import { GameState } from "../model/GameState"
import { RoomData } from "../model/RoomData"

export enum Collection {
  BOARD = "board",
  GAME = "game",
  ROOM = "room",
}

export type CollectionData<T extends Collection = Collection> = {
  [Collection.BOARD]: BoardData
  [Collection.GAME]: GameState
  [Collection.ROOM]: RoomData
}[T]
