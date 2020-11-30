import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomEnter } from "functions/triggers"

export function isAbleToEnterRoom(
  room: RoomData,
  userId: PlayerId | null
): boolean {
  return (
    room.status === RoomStatus.OPENED &&
    userId !== null &&
    !room.playerOrder.includes(userId)
  )
}

export function useEnterRoom(
  roomId: RoomId,
  room: RoomData | null
): [() => Promise<void>, boolean] {
  const { userId } = useAuthContext()
  const isEnabled = room !== null && isAbleToEnterRoom(room, userId)
  const enterRoom = useCallback(async () => {
    if (isEnabled) {
      await triggerRoomEnter({ roomId })
    }
  }, [roomId, isEnabled])

  return [enterRoom, isEnabled]
}
