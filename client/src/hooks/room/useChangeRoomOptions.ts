import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import { RoborallyOptions } from "common/roborally/RoborallySettings"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomOptions } from "functions/triggers"

export function isAbleToChangeRoomOptions(
  room: RoomData,
  userId: PlayerId | null
): boolean {
  return room.status === RoomStatus.OPENED && room.ownerId === userId
}

export function useChangeRoomOptions(
  roomId: RoomId,
  room: RoomData
): [(options: RoborallyOptions) => Promise<void>, boolean] {
  const { userId } = useAuthContext()
  const isEnabled = isAbleToChangeRoomOptions(room, userId)
  const changeRoomOptions = useCallback(
    async (options: RoborallyOptions) => {
      if (isEnabled) {
        await triggerRoomOptions({ options, roomId })
      }
    },
    [roomId, isEnabled]
  )

  return [changeRoomOptions, isEnabled]
}
