import { PlayerId } from "./GameStateBasic"

export type RoomId = string

export enum GameType {
  ROBORALLY = "roborally",
}

export type RoomData<T extends GameType = GameType> = {
  game: T
  owner: PlayerId
  playerOrder: PlayerId[]
}

export function getInitialRoomData(game: GameType, owner: PlayerId): RoomData {
  return {
    game,
    owner,
    playerOrder: [owner],
  }
}
