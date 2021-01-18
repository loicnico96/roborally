import { GameType } from "common/GameSettings"
import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomStatus } from "common/model/RoomData"
import { RoborallyOptions } from "common/roborally/RoborallySettings"

export function getGameType(data: RoomData): GameType {
  return data.game
}

export function isGameType<T extends GameType>(
  data: RoomData,
  gameType: T,
): data is RoomData<T> {
  return data.game === gameType
}

export function getOwnerId(data: RoomData): PlayerId {
  return data.ownerId
}

export function getPlayerIds(data: RoomData): PlayerId[] {
  return data.playerOrder
}

export function getRoborallyOptions(data: RoomData): RoborallyOptions {
  if (isGameType(data, GameType.ROBORALLY)) {
    return data.options
  }

  throw Error("Inconsistent game type")
}

export function getRoomStatus(room: RoomData): RoomStatus {
  return room.status
}
