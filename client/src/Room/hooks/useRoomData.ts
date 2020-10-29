import { useSelector } from "react-redux"
import { RoomData } from "../../common/model/RoomData"
import { getRoomState } from "../../Redux/selectors"
import { isLoaded } from "../../utils/ObjectState"

export function useRoomData(): RoomData {
  const roomState = useSelector(getRoomState)
  if (roomState === null || !isLoaded(roomState)) {
    throw Error("Room data is not loaded.")
  }

  return roomState.data
}
