import { useState } from "react"

import { Collection } from "common/firestore/collections"
import { RoomData } from "common/model/RoomData"
import { SortDirection } from "common/utils/arrays"
import { renderError } from "components/ui/PageError"
import { renderLoader } from "components/ui/PageLoader"
import { useCollectionLoader } from "firestore/useCollectionLoader"
import {
  Resource,
  isLoading,
  isError,
  getLoadingResource,
  LoadedResource,
} from "utils/resources"

import { useRoomCollection } from "./hooks/useRoomCollection"

export type RoomListProviderProps = {
  children: (rooms: LoadedResource<RoomData>[]) => JSX.Element
}

const RoomListProvider = ({ children }: RoomListProviderProps) => {
  const [roomsResource, setRoomsResource] = useState<
    Resource<LoadedResource<RoomData>[]>
  >(getLoadingResource(Collection.ROOM))

  const collectionRef = useRoomCollection()
  useCollectionLoader(collectionRef, setRoomsResource, {
    sortDirection: SortDirection.DESC,
    sortField: "createdAt",
  })

  if (isLoading(roomsResource)) {
    return renderLoader("Loading rooms...")
  } else if (isError(roomsResource)) {
    return renderError(roomsResource.error)
  } else {
    return children(roomsResource.data)
  }
}

export default RoomListProvider
