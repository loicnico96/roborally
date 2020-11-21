import { RoomId } from "common/model/RoomData"
import { PlayerId } from "common/model/GameStateBasic"
import { HttpBasicResponse } from "."

export type HttpRoomStartParams = {
  roomId: RoomId
  userId: PlayerId
}

export type HttpRoomStartResponse = HttpBasicResponse
