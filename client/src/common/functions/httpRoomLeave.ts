import { RoomId } from "common/model/RoomData"

import { HttpBasicResponse } from "."

export type HttpRoomLeaveParams = {
  roomId: RoomId
}

export type HttpRoomLeaveResponse = HttpBasicResponse
