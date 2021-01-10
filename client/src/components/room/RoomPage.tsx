import React from "react"
import styled from "styled-components"

import { GameType } from "common/GameSettings"
import { RoomData, RoomStatus } from "common/model/RoomData"
import AsyncButton from "components/ui/AsyncButton"
import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import PageHeader from "components/ui/PageHeader"
import { useRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"
import { ROUTES } from "utils/navigation"

import { useCloseRoom } from "./hooks/useCloseRoom"
import { useEnterRoom } from "./hooks/useEnterRoom"
import { useLeaveRoom } from "./hooks/useLeaveRoom"
import { useStartGame } from "./hooks/useStartGame"
import RoomOptions from "./RoomOptions"
import RoomPlayerItem from "./RoomPlayerItem"
import { getPlayerIds } from "./utils/getters"

const NAVIGATION_PARENTS = [
  { title: "HOME", path: ROUTES.home() },
  {
    title: "ROOMS",
    path: ROUTES.roomList(),
  },
]

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

const RoomPageContent = styled(PageContent)`
  column-gap: 48px;
  display: flex;
  flex-direction: row;
`

const RoomPageColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
`

const RoomPage = () => {
  const roomId = useRoomId()
  const roomTitle = useRoomData(roomId, getRoomTitle)
  const playerIds = useRoomData(roomId, getPlayerIds)
  const [startGame, isStartGameEnabled] = useStartGame(roomId)
  const [enterRoom, isEnterRoomEnabled] = useEnterRoom(roomId)
  const [leaveRoom, isLeaveRoomEnabled] = useLeaveRoom(roomId)
  const [closeRoom, isCloseRoomEnabled] = useCloseRoom(roomId)

  return (
    <PageContainer>
      <PageHeader parents={NAVIGATION_PARENTS} title={roomTitle} />
      <RoomPageContent>
        <RoomPageColumn>
          {playerIds.map(playerId => (
            <RoomPlayerItem key={playerId} playerId={playerId} />
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
      </RoomPageContent>
    </PageContainer>
  )
}

export default RoomPage
