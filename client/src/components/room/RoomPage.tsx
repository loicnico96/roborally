import React from "react"
import styled from "styled-components"

import AsyncButton from "components/ui/AsyncButton"
import PageContent from "components/ui/PageContent"
import { useRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"

import { useCloseRoom } from "./hooks/useCloseRoom"
import { useEnterRoom } from "./hooks/useEnterRoom"
import { useLeaveRoom } from "./hooks/useLeaveRoom"
import { useStartGame } from "./hooks/useStartGame"
import RoomOptions from "./RoomOptions"
import RoomPlayerItem from "./RoomPlayerItem"
import { getPlayerIds } from "./utils/getters"

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
  const playerIds = useRoomData(roomId, getPlayerIds)
  const t = useTranslations()
  const [startGame, isStartGameEnabled] = useStartGame(roomId)
  const [enterRoom, isEnterRoomEnabled] = useEnterRoom(roomId)
  const [leaveRoom, isLeaveRoomEnabled] = useLeaveRoom(roomId)
  const [closeRoom, isCloseRoomEnabled] = useCloseRoom(roomId)

  return (
    <RoomPageContent>
      <RoomPageColumn>
        {playerIds.map(playerId => (
          <RoomPlayerItem key={playerId} playerId={playerId} />
        ))}
        {isStartGameEnabled && (
          <AsyncButton onClick={startGame}>
            {t.room.startGame.label}
          </AsyncButton>
        )}
        {isEnterRoomEnabled && (
          <AsyncButton onClick={enterRoom}>
            {t.room.enterRoom.label}
          </AsyncButton>
        )}
        {isLeaveRoomEnabled && (
          <AsyncButton onClick={leaveRoom}>
            {t.room.leaveRoom.label}
          </AsyncButton>
        )}
        {isCloseRoomEnabled && (
          <AsyncButton onClick={closeRoom}>
            {t.room.closeRoom.label}
          </AsyncButton>
        )}
      </RoomPageColumn>
      <RoomPageColumn>
        <RoomOptions />
      </RoomPageColumn>
    </RoomPageContent>
  )
}

export default RoomPage
