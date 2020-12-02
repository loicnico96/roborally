import React, { useState } from "react"

import { Collection } from "common/firestore/collections"
import { RoomData } from "common/model/RoomData"
import { SortDirection } from "common/utils/arrays"
import { useCollectionLoader } from "firestore/useCollectionLoader"
import {
  Resource,
  isLoading,
  isError,
  getLoadingResource,
  LoadedResource,
} from "utils/resources"

import RoomListPage from "./RoomListPage"

const RoomListRoute = () => {
  const [roomsResource, setRoomsResource] = useState<
    Resource<LoadedResource<RoomData>[]>
  >(getLoadingResource(Collection.ROOM))

  useCollectionLoader(Collection.ROOM, setRoomsResource, {
    sortDirection: SortDirection.DESC,
    sortField: "createdAt",
  })

  if (isLoading(roomsResource)) {
    return <div>Loading rooms...</div>
  }

  if (isError(roomsResource)) {
    return <div>Failed to load rooms</div>
  }

  return <RoomListPage rooms={roomsResource.data} />
}

export default RoomListRoute
