import { useMemo, useState } from "react"

import { Collection } from "common/firestore/collections"
import { GameType } from "common/GameSettings"
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
  gameType?: GameType
}

const RoomListProvider = ({ children, gameType }: RoomListProviderProps) => {
  const [roomsResource, setRoomsResource] = useState<
    Resource<LoadedResource<RoomData>[]>
  >(getLoadingResource(Collection.ROOM))

  const filters = useMemo(() => {
    if (gameType) {
      return [
        {
          field: "game",
          value: gameType,
        },
      ]
    }

    return []
  }, [gameType])

  const collectionRef = useRoomCollection()
  useCollectionLoader(collectionRef, setRoomsResource, {
    filters,
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
