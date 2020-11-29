import React from "react"
import styled from "styled-components"

import { GameType } from "common/GameSettings"
import { RoomData, RoomStatus } from "common/model/RoomData"

import PageHeader from "../PageHeader"
import AsyncButton from "../primitives/AsyncButton"

import { useRoomData, useRoomId } from "./RoomContext"
import RoomOptions from "./RoomOptions"
import RoomPlayerItem from "./RoomPlayerItem"
import { useCloseRoom } from "./useCloseRoom"
import { useEnterRoom } from "./useEnterRoom"
import { useLeaveRoom } from "./useLeaveRoom"
import { useStartGame } from "./useStartGame"

function getRoomTitle(room: RoomData): string {
  const gameName = {
    [GameType.ROBORALLY]: "Roborally",
  }[room.game]

  const statusName = {
    [RoomStatus.OPENED]: "Open",
    [RoomStatus.ONGOING]: "Ongoing",
    [RoomStatus.FINISHED]: "Finished",
  }[room.status]

  return `${gameName} - ${statusName}`.toUpperCase()
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const RoomPageContainer = styled.div`
  background-color: #eee;
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  padding: 24px;
`

const RoomPageColumn = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 0px 24px;
`

const RoomPage = () => {
  const roomId = useRoomId()
  const roomData = useRoomData()
  const [startGame, isStartGameEnabled] = useStartGame(roomId, roomData)
  const [enterRoom, isEnterRoomEnabled] = useEnterRoom(roomId, roomData)
  const [leaveRoom, isLeaveRoomEnabled] = useLeaveRoom(roomId, roomData)
  const [closeRoom, isCloseRoomEnabled] = useCloseRoom(roomId, roomData)

  return (
    <PageContainer>
      <PageHeader title={getRoomTitle(roomData)} />
      <RoomPageContainer>
        <RoomPageColumn>
          {roomData.playerOrder.map(playerId => (
            <RoomPlayerItem
              key={playerId}
              isRoomOwner={playerId === roomData.ownerId}
              userInfo={roomData.players[playerId]}
            />
          ))}
          {isStartGameEnabled && (
            <AsyncButton onClick={startGame}>Start game</AsyncButton>
          )}
          {isEnterRoomEnabled && (
            <AsyncButton onClick={enterRoom}>Enter room</AsyncButton>
          )}
          {isLeaveRoomEnabled && (
            <AsyncButton onClick={leaveRoom}>Leave room</AsyncButton>
          )}
          {isCloseRoomEnabled && (
            <AsyncButton onClick={closeRoom}>Close room</AsyncButton>
          )}
        </RoomPageColumn>
        <RoomPageColumn>
          <RoomOptions />
        </RoomPageColumn>
      </RoomPageContainer>
    </PageContainer>
  )
}

export default RoomPage
