import { GameOptions, GameType, getGameSettings } from "common/GameSettings"
import { PlayerId } from "./GameStateBasic"

export type RoomId = string

export enum RoomStatus {
  OPENED = "opened",
  ONGOING = "ongoing",
  FINISHED = "finished",
}

export type RoomData<T extends GameType = GameType> = {
  game: T
  options: GameOptions<T>
  owner: PlayerId
  playerOrder: PlayerId[]
  status: RoomStatus
}

export function getInitialRoomData(game: GameType, owner: PlayerId): RoomData {
  return {
    game,
    options: getGameSettings(game).getDefaultOptions(),
    owner,
    playerOrder: [owner],
    status: RoomStatus.OPENED,
  }
}
