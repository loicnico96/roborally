import { GameOptions } from "common/GameSettings"
import { RoomId } from "common/model/RoomData"

import { HttpBasicResponse } from "."

export type HttpRoomOptionsParams<T extends GameOptions = GameOptions> = {
  options: Partial<T>
  roomId: RoomId
}

export type HttpRoomOptionsResponse = HttpBasicResponse
