import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomLeave } from "functions/triggers"
import { useRoomData } from "hooks/useRoomData"

export function isAbleToLeaveRoom(
  room: RoomData,
  userId: PlayerId | null
): boolean {
  const { ownerId, playerOrder, status } = room
  return (
    status === RoomStatus.OPENED &&
    userId !== null &&
    userId !== ownerId &&
    playerOrder.includes(userId)
  )
}

export function useLeaveRoom(roomId: RoomId): [() => Promise<void>, boolean] {
  const { userId } = useAuthContext()

  const isEnabled = useRoomData(
    roomId,
    useCallback(room => isAbleToLeaveRoom(room, userId), [userId])
  )

  const leaveRoom = useCallback(async () => {
    if (isEnabled) {
      await triggerRoomLeave({ roomId })
    }
  }, [roomId, isEnabled])

  return [leaveRoom, isEnabled]
}
