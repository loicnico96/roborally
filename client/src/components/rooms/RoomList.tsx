import { RoomData, RoomId } from "common/model/RoomData"
import React from "react"
import RoomListItem from "./RoomListItem"

export type RoomListProps = {
  onItemClick: (roomId: RoomId) => void
  rooms: Record<RoomId, RoomData>
}

const RoomList = ({ onItemClick, rooms }: RoomListProps) => (
  <div id="RoomsList">
    {Object.keys(rooms).map(roomId => (
      <RoomListItem
        key={roomId}
        onClick={onItemClick}
        roomId={roomId}
        room={rooms[roomId]}
      />
    ))}
  </div>
)

export default RoomList
