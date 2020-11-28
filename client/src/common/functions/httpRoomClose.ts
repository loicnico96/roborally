import { RoomId } from "common/model/RoomData"

import { HttpBasicResponse } from "."

export type HttpRoomCloseParams = {
  roomId: RoomId
}

export type HttpRoomCloseResponse = HttpBasicResponse
