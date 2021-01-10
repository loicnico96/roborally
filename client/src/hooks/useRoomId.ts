import { useParams } from "react-router-dom"

import { RoomId } from "common/model/RoomData"

export type RoomRouteParams = {
  roomId: RoomId
}

export function useRoomId(): RoomId {
  const { roomId } = useParams<RoomRouteParams>()
  return roomId
}
