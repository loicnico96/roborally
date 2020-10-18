import { ObjectState } from "../../utils/ObjectState"
import { RoomData } from "../../common/RoomData"
import { Action } from "./types"

export type SetRoomStateAction = Action<
  "setRoomState",
  ObjectState<RoomData> | null
>

export function setRoomState(
  payload: ObjectState<RoomData> | null
): SetRoomStateAction {
  return {
    type: "setRoomState",
    payload,
    reducer: (state, room) => ({ ...state, room }),
  }
}
