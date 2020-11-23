import React, { useCallback } from "react"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import {
  triggerRoomEnter,
  triggerRoomLeave,
  triggerRoomStart,
} from "functions/triggers"
import { PlayerId } from "common/model/GameStateBasic"
import { useAuthContext } from "firestore/auth/AuthContext"
import PageHeader from "./PageHeader"

type RoomPageProps = {
  roomId: RoomId
  room: RoomData
}

function isAbleToEnterRoom(room: RoomData, userId: PlayerId | null): boolean {
  return (
    room.status === RoomStatus.OPENED &&
    userId !== null &&
    !room.playerOrder.includes(userId)
  )
}

const useEnterRoom = (
  roomId: RoomId,
  room: RoomData | null
): [() => void, boolean] => {
  const { userId } = useAuthContext()
  const isEnabled = room !== null && isAbleToEnterRoom(room, userId)
  const enterRoom = useCallback(async () => {
    if (isEnabled) {
      await triggerRoomEnter({ roomId })
    }
  }, [roomId, isEnabled])

  return [enterRoom, isEnabled]
}

function isAbleToLeaveRoom(room: RoomData, userId: PlayerId | null): boolean {
  return (
    room.status === RoomStatus.OPENED &&
    userId !== null &&
    userId !== room.ownerId &&
    room.playerOrder.includes(userId)
  )
}

const useLeaveRoom = (
  roomId: RoomId,
  room: RoomData | null
): [() => void, boolean] => {
  const { userId } = useAuthContext()
  const isEnabled = room !== null && isAbleToLeaveRoom(room, userId)
  const leaveRoom = useCallback(async () => {
    if (isEnabled) {
      await triggerRoomLeave({ roomId })
    }
  }, [roomId, isEnabled])

  return [leaveRoom, isEnabled]
}

function isAbleToStartGame(room: RoomData, userId: PlayerId | null): boolean {
  return room.status === RoomStatus.OPENED && room.ownerId === userId
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
  const [enterRoom, isEnterRoomEnabled] = useEnterRoom(roomId, room)
  const [leaveRoom, isLeaveRoomEnabled] = useLeaveRoom(roomId, room)

  const ownerName = room.players[room.ownerId].name
  const playerNames = room.playerOrder.map(userId => room.players[userId].name)

  return (
    <div>
      <PageHeader title={`Room ${roomId} - ${room.status}`} />
      <div>Owner: {ownerName}</div>
      <div>Players: {playerNames.join(", ")}</div>
      <div>Options: {JSON.stringify(room.options)}</div>
      {isStartGameEnabled && <button onClick={startGame}>Start game</button>}
      {isEnterRoomEnabled && <button onClick={enterRoom}>Enter room</button>}
      {isLeaveRoomEnabled && <button onClick={leaveRoom}>Leave room</button>}
    </div>
  )
}

export default RoomPage
