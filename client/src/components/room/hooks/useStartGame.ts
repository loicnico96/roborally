import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomStart } from "functions/triggers"
import { useRoomData } from "hooks/useRoomData"

export function isAbleToStartGame(
  room: RoomData,
  userId: PlayerId | null
): boolean {
  const { ownerId, status } = room
  return status === RoomStatus.OPENED && userId === ownerId
}

export function useStartGame(roomId: RoomId): [() => Promise<void>, boolean] {
  const { userId } = useAuthContext()

  const isEnabled = useRoomData(
    roomId,
    useCallback(room => isAbleToStartGame(room, userId), [userId])
  )

  const startGame = useCallback(async () => {
    if (isEnabled) {
      await triggerRoomStart({ roomId })
    }
  }, [roomId, isEnabled])

  return [startGame, isEnabled]
}
