import React, { useCallback } from "react"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import {
  triggerRoomEnter,
  triggerRoomLeave,
  triggerRoomStart,
} from "functions/triggers"
import { PlayerId } from "common/model/GameStateBasic"
import { useAuthContext } from "firestore/auth/AuthContext"
import PageHeader from "../PageHeader"
import AsyncButton from "../primitives/AsyncButton"
import { useRoomData, useRoomId } from "./RoomContext"

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
): [() => Promise<void>, boolean] => {
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
): [() => Promise<void>, boolean] => {
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
): [() => Promise<void>, boolean] => {
  const { userId } = useAuthContext()
  const isEnabled = room !== null && isAbleToStartGame(room, userId)
  const startGame = useCallback(async () => {
    if (isEnabled) {
      await triggerRoomStart({ roomId })
    }
  }, [roomId, isEnabled])

  return [startGame, isEnabled]
}

const RoomPage = () => {
  const roomId = useRoomId()
  const roomData = useRoomData()
  const [startGame, isStartGameEnabled] = useStartGame(roomId, roomData)
  const [enterRoom, isEnterRoomEnabled] = useEnterRoom(roomId, roomData)
  const [leaveRoom, isLeaveRoomEnabled] = useLeaveRoom(roomId, roomData)

  const ownerName = roomData.players[roomData.ownerId].name
  const playerNames = roomData.playerOrder.map(
    playerId => roomData.players[playerId].name
  )

  return (
    <div>
      <PageHeader title={`Room ${roomId} - ${roomData.status}`} />
      <div>Owner: {ownerName}</div>
      <div>Players: {playerNames.join(", ")}</div>
      <div>Options: {JSON.stringify(roomData.options)}</div>
      {isStartGameEnabled && (
        <AsyncButton onClick={startGame}>Start game</AsyncButton>
      )}
      {isEnterRoomEnabled && (
        <AsyncButton onClick={enterRoom}>Enter room</AsyncButton>
      )}
      {isLeaveRoomEnabled && (
        <AsyncButton onClick={leaveRoom}>Leave room</AsyncButton>
      )}
    </div>
  )
}

export default RoomPage
