import React, { useState } from "react"

import { Collection } from "common/firestore/collections"
import { RoomData, RoomId } from "common/model/RoomData"
import { useFirestoreLoader } from "firestore/useFirestoreLoader"
import {
  Resource,
  isLoading,
  isError,
  getLoadingResource,
} from "utils/resources"

import RoomContext from "./RoomContext"

export type RoomContextProviderProps = {
  renderError: (error: Error) => JSX.Element
  renderLoaded: (data: RoomData) => JSX.Element
  renderLoading: () => JSX.Element
  roomId: RoomId
}

const RoomContextProvider = ({
  renderError,
  renderLoaded,
  renderLoading,
  roomId,
}: RoomContextProviderProps) => {
  const [roomResource, setRoomResource] = useState<Resource<RoomData>>(
    getLoadingResource(roomId)
  )

  useFirestoreLoader(Collection.ROOM, roomId, setRoomResource)

  return (
    <RoomContext.Provider value={roomResource}>
      {isLoading(roomResource)
        ? renderLoading()
        : isError(roomResource)
        ? renderError({ error: roomResource.error })
        : renderLoaded(roomResource.data)}
    </RoomContext.Provider>
  )
}

export default RoomContextProvider
