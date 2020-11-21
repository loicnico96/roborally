import { RoomId } from "common/model/RoomData"
import { PlayerId } from "common/model/GameStateBasic"
import { GameType } from "common/GameSettings"

export type HttpRoomCreateParams = {
  game: GameType
  userId: PlayerId
}

export type HttpRoomCreateResponse = {
  roomId: RoomId
}
