import React, { useCallback } from "react"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import { triggerRoomStart } from "functions/triggers"
import { PlayerId } from "common/model/GameStateBasic"
import { useAuthContext } from "firestore/auth/AuthContext"

type RoomPageProps = {
  roomId: RoomId
  room: RoomData
}

function isAbleToStartGame(room: RoomData, userId: PlayerId | null): boolean {
  return room.status === RoomStatus.OPENED && room.owner === userId
}

const useStartGame = (
  roomId: RoomId,
  room: RoomData | null
): [() => void, boolean] => {
  const { userId } = useAuthContext()
  const isEnabled = room !== null && isAbleToStartGame(room, userId)
  const startGame = useCallback(async () => {
    if (isEnabled) {
      await triggerRoomStart({ roomId })
    }
  }, [roomId, isEnabled])

  return [startGame, isEnabled]
}

const RoomPage = ({ roomId, room }: RoomPageProps) => {
  const [startGame, isStartGameEnabled] = useStartGame(roomId, room)

  return (
    <div>
      <div>
        Room {roomId} - {room.status}
      </div>
      <div>Owner: {room.owner}</div>
      <div>Players: {room.playerOrder.join(", ")}</div>
      <div>Options: {JSON.stringify(room.options)}</div>
      {isStartGameEnabled && <button onClick={startGame}>Start game</button>}
    </div>
  )
}

export default RoomPage
