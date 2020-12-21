import { createContext, useContext } from "react"

import { RoomData, RoomId } from "common/model/RoomData"
import { isLoaded, Resource } from "utils/resources"

const RoomContext = createContext<Resource<RoomData> | null>(null)

export function useRoomId(): RoomId {
  const resource = useContext(RoomContext)
  if (resource === null) {
    throw Error("Invalid room context")
  }

  return resource.id
}

export function useRoomData(): RoomData {
  const resource = useContext(RoomContext)
  if (resource === null || !isLoaded(resource)) {
    throw Error("Invalid room context")
  }

  return resource.data
}

export default RoomContext
