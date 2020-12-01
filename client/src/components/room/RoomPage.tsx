import React from "react"
import styled from "styled-components"

import { useCloseRoom } from "hooks/room/useCloseRoom"
import { useEnterRoom } from "hooks/room/useEnterRoom"
import { useLeaveRoom } from "hooks/room/useLeaveRoom"
import { useStartGame } from "hooks/room/useStartGame"
import { useTrans } from "hooks/useTrans"

import PageHeader from "../PageHeader"
import AsyncButton from "../primitives/AsyncButton"

import { useRoomData, useRoomId } from "./RoomContext"
import RoomOptions from "./RoomOptions"
import RoomPlayerItem from "./RoomPlayerItem"

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
  const t = useTrans("RoomPage")
  const roomId = useRoomId()
  const roomData = useRoomData()
  const [startGame, isStartGameEnabled] = useStartGame(roomId, roomData)
  const [enterRoom, isEnterRoomEnabled] = useEnterRoom(roomId, roomData)
  const [leaveRoom, isLeaveRoomEnabled] = useLeaveRoom(roomId, roomData)
  const [closeRoom, isCloseRoomEnabled] = useCloseRoom(roomId, roomData)

  return (
    <PageContainer>
      <PageHeader title={t("pageTitle", roomData)} />
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
            <AsyncButton onClick={startGame}>
              {t("startGameButton")}
            </AsyncButton>
          )}
          {isEnterRoomEnabled && (
            <AsyncButton onClick={enterRoom}>
              {t("enterRoomButton")}
            </AsyncButton>
          )}
          {isLeaveRoomEnabled && (
            <AsyncButton onClick={leaveRoom}>
              {t("leaveRoomButton")}
            </AsyncButton>
          )}
          {isCloseRoomEnabled && (
            <AsyncButton onClick={closeRoom}>
              {t("closeRoomButton")}
            </AsyncButton>
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
