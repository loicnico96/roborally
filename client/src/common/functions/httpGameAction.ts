import { GameType } from "common/GameSettings"
import { RoomId } from "common/model/RoomData"

import { HttpBasicResponse } from "."

export type HttpGameActionParams = {
  game: GameType
  roomId: RoomId
  action: unknown
}

export type HttpGameActionResponse = HttpBasicResponse
