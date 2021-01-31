import { GameType } from "common/GameSettings"
import { GameData } from "common/model/GameData"
import { RoomData } from "common/model/RoomData"
import { BoardData } from "common/roborally/model/BoardData"

export enum Collection {
  GAME = "game",
  ROOM = "room",
}

export type GameInfo<T extends GameType = GameType> = {
  game: T
}

export type CollectionData<C extends Collection> = {
  [Collection.GAME]: GameInfo
  [Collection.ROOM]: RoomData
}[C]

export enum GameCollection {
  BOARD = "board",
  CLIENT = "client",
  SERVER = "server",
}

export type GameCollectionData<T extends GameType, C extends GameCollection> = {
  [GameCollection.BOARD]: {
    [GameType.METROPOLYS]: never
    [GameType.ROBORALLY]: BoardData
  }[T]
  [GameCollection.CLIENT]: GameData<T>
  [GameCollection.SERVER]: GameData<T>
}[C]

export type DataFetcher<T extends GameType> = <C extends GameCollection>(
  collection: C,
  documentId: string
) => Promise<GameCollectionData<T, C>>
