import { RoomId } from "common/model/RoomData"
import { GameType } from "common/GameSettings"

export type HttpRoomCreateParams = {
  game: GameType
}

export type HttpRoomCreateResponse = {
  roomId: RoomId
}
