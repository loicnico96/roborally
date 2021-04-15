import React from "react"

import { RoomData } from "common/model/RoomData"
import { useTranslations } from "hooks/useTranslations"
import { LoadedResource } from "utils/resources"

import RoomListItem from "./RoomListItem"

export type RoomListProps = {
  rooms: LoadedResource<RoomData>[]
}

const RoomList = ({ rooms }: RoomListProps) => {
  const t = useTranslations()

  if (rooms.length === 0) {
    return <div>{t.roomList.noRooms}</div>
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
