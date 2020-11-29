import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomStart } from "functions/triggers"

export function isAbleToStartGame(
  room: RoomData,
  userId: PlayerId | null
): boolean {
  return room.status === RoomStatus.OPENED && room.ownerId === userId
}

export function useStartGame(
  roomId: RoomId,
  room: RoomData | null
): [() => Promise<void>, boolean] {
  const { userId } = useAuthContext()
  const isEnabled = room !== null && isAbleToStartGame(room, userId)
  const startGame = useCallback(async () => {
    if (isEnabled) {
      await triggerRoomStart({ roomId })
    }
  }, [roomId, isEnabled])

  return [startGame, isEnabled]
}
