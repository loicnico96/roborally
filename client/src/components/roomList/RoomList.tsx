import React from "react"

import { RoomData } from "common/model/RoomData"
import { LoadedResource } from "utils/resources"

import RoomListItem from "./RoomListItem"

export type RoomListProps = {
  rooms: LoadedResource<RoomData>[]
}

const RoomList = ({ rooms }: RoomListProps) => {
  if (rooms.length === 0) {
    return <div>No rooms are available.</div>
  }

  return (
    <div>
      {rooms.map(room => (
        <RoomListItem key={room.id} roomId={room.id} room={room.data} />
      ))}
    </div>
  )
}

export default RoomList
