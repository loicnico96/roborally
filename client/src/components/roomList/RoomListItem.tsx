import { RoomData, RoomId } from "common/model/RoomData"
import React, { useCallback } from "react"

export type RoomListItemProps = {
  onClick: (roomId: RoomId) => void
  roomId: RoomId
  room: RoomData
}

const RoomListItem = ({ onClick, roomId, room }: RoomListItemProps) => {
  const openRoom = useCallback(() => onClick(roomId), [onClick, roomId])

  return (
    <div onClick={openRoom}>
      {roomId} : {JSON.stringify(room)}
    </div>
  )
}

export default RoomListItem
