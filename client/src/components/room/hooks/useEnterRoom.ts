import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomEnter } from "functions/triggers"
import { useRoomData } from "hooks/useRoomData"

export function isAbleToEnterRoom(
  room: RoomData,
  userId: PlayerId | null
): boolean {
  const { playerOrder, status } = room
  return (
    status === RoomStatus.OPENED &&
    userId !== null &&
    !playerOrder.includes(userId)
  )
}

export function useEnterRoom(roomId: RoomId): [() => Promise<void>, boolean] {
  const { userId } = useAuthContext()

  const isEnabled = useRoomData(
    roomId,
    useCallback(room => isAbleToEnterRoom(room, userId), [userId])
  )

  const enterRoom = useCallback(async () => {
    if (isEnabled) {
      await triggerRoomEnter({ roomId })
    }
  }, [roomId, isEnabled])

  return [enterRoom, isEnabled]
}
