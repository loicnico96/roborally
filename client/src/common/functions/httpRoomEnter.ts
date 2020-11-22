import { RoomId } from "common/model/RoomData"
import { HttpBasicResponse } from "."

export type HttpRoomEnterParams = {
  roomId: RoomId
}

export type HttpRoomEnterResponse = HttpBasicResponse
