import { RoomId } from "common/model/RoomData"

import { HttpBasicResponse } from "."

export type HttpRoomStartParams = {
  roomId: RoomId
}

export type HttpRoomStartResponse = HttpBasicResponse
