import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomLeave } from "functions/triggers"

export function isAbleToLeaveRoom(
  room: RoomData,
  userId: PlayerId | null
): boolean {
  return (
    room.status === RoomStatus.OPENED &&
    userId !== null &&
    userId !== room.ownerId &&
    room.playerOrder.includes(userId)
  )
}

export function useLeaveRoom(
  roomId: RoomId,
  room: RoomData | null
): [() => Promise<void>, boolean] {
  const { userId } = useAuthContext()
  const isEnabled = room !== null && isAbleToLeaveRoom(room, userId)
  const leaveRoom = useCallback(async () => {
    if (isEnabled) {
      await triggerRoomLeave({ roomId })
    }
  }, [roomId, isEnabled])

  return [leaveRoom, isEnabled]
}
