import { GameOptions, GameType, getGameSettings } from "common/GameSettings"

import { UserId, UserInfo } from "./UserInfo"

export type RoomId = string

export enum RoomStatus {
  OPENED = "opened",
  ONGOING = "ongoing",
  FINISHED = "finished",
}

export type RoomData<T extends GameType = GameType> = {
  createdAt: number
  game: T
  options: GameOptions<T>
  ownerId: UserId
  playerOrder: UserId[]
  players: Record<UserId, UserInfo>
  status: RoomStatus
}

export function getInitialRoomData<T extends GameType>(
  game: T,
  ownerId: UserId,
  ownerInfo: UserInfo
): RoomData<T> {
  const { defaultOptions } = getGameSettings(game)

  return {
    createdAt: Date.now(),
    game,
    options: defaultOptions as GameOptions<T>,
    ownerId,
    playerOrder: [ownerId],
    players: { [ownerId]: ownerInfo },
    status: RoomStatus.OPENED,
  }
}
