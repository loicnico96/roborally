import { GameType } from "common/GameSettings"
import { RoomId } from "common/model/RoomData"

export type HttpRoomCreateParams = {
  game: GameType
}

export type HttpRoomCreateResponse = {
  roomId: RoomId
}
