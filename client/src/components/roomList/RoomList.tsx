import { RoomData, RoomId } from "common/model/RoomData"
import React from "react"
import RoomListItem from "./RoomListItem"

export type RoomListProps = {
  rooms: Record<RoomId, RoomData>
}

const RoomList = ({ rooms }: RoomListProps) => (
  <div>
    {Object.keys(rooms).map(roomId => (
      <RoomListItem key={roomId} roomId={roomId} room={rooms[roomId]} />
    ))}
  </div>
)

export default RoomList
