import { useCallback } from "react"

import { RoomData, RoomId } from "common/model/RoomData"
import { useStore } from "hooks/useStore"
import { isLoaded, Resource } from "utils/resources"
import { Store } from "utils/store"

export function getRoomResource(
  store: Store,
  roomId: RoomId
): Resource<RoomData> | undefined {
  return store.rooms[roomId]
}

export function getRoomData(store: Store, roomId: RoomId): RoomData {
  const resource = getRoomResource(store, roomId)

  if (resource === undefined || !isLoaded(resource)) {
    throw Error("Invalid room context")
  }

  return resource.data
}

export function useRoomData<T>(
  roomId: RoomId,
  selector: (room: RoomData) => T
): T {
  return useStore(
    useCallback(store => selector(getRoomData(store, roomId)), [
      roomId,
      selector,
    ])
  )
}
