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
  const [resource, setResource] = useState<Resource<RoomData>>(
    getLoadingResource(roomId)
  )

  useFirestoreLoader(Collection.ROOM, roomId, setResource)

  if (isLoading(resource)) {
    return renderLoading()
  }

  if (isError(resource)) {
    return renderError(resource.error)
  }

  return (
    <RoomContext.Provider value={resource}>
      {renderLoaded(resource.data)}
    </RoomContext.Provider>
  )
}

export default RoomContextProvider
