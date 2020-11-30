import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomClose } from "functions/triggers"

export function isAbleToCloseRoom(
  room: RoomData,
  userId: PlayerId | null
): boolean {
  return room.status !== RoomStatus.ONGOING && room.ownerId === userId
}

export function useCloseRoom(
  roomId: RoomId,
  room: RoomData | null
): [() => Promise<void>, boolean] {
  const { userId } = useAuthContext()
  const isEnabled = room !== null && isAbleToCloseRoom(room, userId)
  const closeRoom = useCallback(async () => {
    if (isEnabled) {
      await triggerRoomClose({ roomId })
    }
  }, [roomId, isEnabled])

  return [closeRoom, isEnabled]
}
