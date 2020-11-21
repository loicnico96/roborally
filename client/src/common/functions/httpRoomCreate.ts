import { RoomId, GameType } from "common/model/RoomData"
import { PlayerId } from "common/model/GameStateBasic"

export type HttpRoomCreateParams = {
  game: GameType
  userId: PlayerId
}

export type HttpRoomCreateResponse = {
  roomId: RoomId
}
