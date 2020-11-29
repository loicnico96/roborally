import { GameOptions, GameType, getGameSettings } from "common/GameSettings"

import { UserId, UserInfo } from "./UserInfo"

export type RoomId = string

export enum RoomStatus {
  OPENED = "opened",
  ONGOING = "ongoing",
  FINISHED = "finished",
}

export type RoomData<T extends GameType = GameType> = {
  game: T
  options: GameOptions<T>
  ownerId: UserId
  playerOrder: UserId[]
  players: Record<UserId, UserInfo>
  status: RoomStatus
}

export function getInitialRoomData(
  game: GameType,
  ownerId: UserId,
  ownerInfo: UserInfo
): RoomData {
  const { defaultOptions } = getGameSettings(game)

  return {
    game,
    options: defaultOptions,
    ownerId,
    playerOrder: [ownerId],
    players: { [ownerId]: ownerInfo },
    status: RoomStatus.OPENED,
  }
}
