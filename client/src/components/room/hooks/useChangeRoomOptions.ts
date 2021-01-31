import { useCallback } from "react"

import { GameOptions, GameType } from "common/GameSettings"
import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomOptions } from "functions/triggers"
import { useRoomData } from "hooks/useRoomData"

export function isAbleToChangeRoomOptions(
  room: RoomData,
  userId: PlayerId | null
): boolean {
  const { ownerId, status } = room
  return status === RoomStatus.OPENED && userId === ownerId
}

export function useChangeRoomOptions<T extends GameType>(
  roomId: RoomId
): [(options: GameOptions<T>) => Promise<void>, boolean] {
  const { userId } = useAuthContext()

  const isEnabled = useRoomData(
    roomId,
    useCallback(room => isAbleToChangeRoomOptions(room, userId), [userId])
  )

  const changeRoomOptions = useCallback(
    async (options: GameOptions<T>) => {
      if (isEnabled) {
        await triggerRoomOptions({ options, roomId })
      }
    },
    [roomId, isEnabled]
  )

  return [changeRoomOptions, isEnabled]
}
