import { RoomId } from "common/model/RoomData"

import { HttpBasicResponse } from "."

export type HttpGameActionParams = {
  roomId: RoomId
  action: unknown
}

export type HttpGameActionResponse = HttpBasicResponse
