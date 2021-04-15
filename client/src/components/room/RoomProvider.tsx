import { useCallback } from "react"

import { RoomId } from "common/model/RoomData"
import { renderError } from "components/ui/PageError"
import { renderLoader } from "components/ui/PageLoader"
import { useFirestoreLoader } from "firestore"
import { useActions } from "hooks/useActions"
import { getRoomResource } from "hooks/useRoomData"
import { useStore } from "hooks/useStore"
import { useTranslations } from "hooks/useTranslations"
import { isLoading } from "utils/resources"

import { useRoomRef } from "./hooks/useRoomRef"

export type RoomProviderProps = {
  children: JSX.Element
  roomId: RoomId
}

export function useRoomLoading(roomId: RoomId): boolean {
  return useStore(
    useCallback(
      store => {
        const resource = getRoomResource(store, roomId)
        return resource === undefined || isLoading(resource)
      },
      [roomId]
    )
  )
}

export function useRoomError(roomId: RoomId): Error | null {
  return useStore(
    useCallback(
      store => {
        const resource = getRoomResource(store, roomId)
        return resource?.error ?? null
      },
      [roomId]
    )
  )
}

const RoomProvider = ({ children, roomId }: RoomProviderProps) => {
  const t = useTranslations()

  const { setRoomResource } = useActions()

  const roomLoading = useRoomLoading(roomId)
  const roomError = useRoomError(roomId)

  const roomRef = useRoomRef(roomId)
  useFirestoreLoader(roomRef, setRoomResource)

  if (roomLoading) {
    return renderLoader(t.room.pageLoading)
  } else if (roomError !== null) {
    return renderError(roomError)
  } else {
    return children
  }
}

export default RoomProvider
