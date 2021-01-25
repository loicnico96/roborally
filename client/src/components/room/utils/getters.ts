import { GameType } from "common/GameSettings"
import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomStatus } from "common/model/RoomData"
import { RoborallyOptions } from "common/roborally/model/RoborallyOptions"

export function getGameType(data: RoomData): GameType {
  return data.game
}

export function getOwnerId(data: RoomData): PlayerId {
  return data.ownerId
}

export function getPlayerIds(data: RoomData): PlayerId[] {
  return data.playerOrder
}

export function getRoomOptions(data: RoomData): RoborallyOptions {
  return data.options
}

export function getRoomStatus(room: RoomData): RoomStatus {
  return room.status
}
