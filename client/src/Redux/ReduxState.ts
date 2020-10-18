import { ObjectState } from "../utils/ObjectState"
import { BoardData } from "../common/BoardData"
import { GameData } from "../common/GameData"
import { RoomData } from "../common/RoomData"

export type ReduxState = {
  board: ObjectState<BoardData> | null
  game: ObjectState<GameData> | null
  room: ObjectState<RoomData> | null
}

export const INITIAL_STATE: ReduxState = {
  board: null,
  game: null,
  room: null,
}
