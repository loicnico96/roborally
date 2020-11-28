import React, { useState } from "react"

import { Collection } from "common/firestore/collections"
import { RoomData, RoomId } from "common/model/RoomData"
import { useCollectionLoader } from "firestore/useCollectionLoader"
import {
  Resource,
  isLoading,
  isError,
  getLoadingResource,
} from "utils/resources"

import RoomListPage from "./RoomListPage"

const RoomListRoute = () => {
  const [roomsResource, setRoomsResource] = useState<
    Resource<Record<RoomId, RoomData>>
  >(getLoadingResource(Collection.ROOM))

  useCollectionLoader(Collection.ROOM, setRoomsResource)

  if (isLoading(roomsResource)) {
    return <div>Loading rooms...</div>
  }

  if (isError(roomsResource)) {
    return <div>Failed to load rooms</div>
  }

  return <RoomListPage rooms={roomsResource.data} />
}

export default RoomListRoute
