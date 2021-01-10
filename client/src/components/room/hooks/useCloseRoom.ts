import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomClose } from "functions/triggers"
import { useRoomData } from "hooks/useRoomData"

export function isAbleToCloseRoom(
  room: RoomData,
  userId: PlayerId | null
): boolean {
  const { ownerId, status } = room
  return status !== RoomStatus.ONGOING && userId === ownerId
}

export function useCloseRoom(roomId: RoomId): [() => Promise<void>, boolean] {
  const { userId } = useAuthContext()

  const isEnabled = useRoomData(
    roomId,
    useCallback(room => isAbleToCloseRoom(room, userId), [userId])
  )

  const closeRoom = useCallback(async () => {
    if (isEnabled) {
      await triggerRoomClose({ roomId })
    }
  }, [roomId, isEnabled])

  return [closeRoom, isEnabled]
}
