import { ReduxState } from "../ReduxState"
import { ObjectState } from "../../utils/ObjectState"
import { RoomData } from "../../common/RoomData"

export function getRoomState(state: ReduxState): ObjectState<RoomData> | null {
  return state.room
}
