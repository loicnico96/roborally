import React, { useCallback } from "react"
import styled from "styled-components"

import AsyncButton from "components/ui/AsyncButton"
import { useTranslations } from "hooks/useTranslations"

import GameSelect from "./GameSelect"
import { useCreateRoom } from "./hooks/useCreateRoom"
import { useGameParam } from "./hooks/useGameParam"

const StyledContainer = styled.div`
  margin-bottom: 24px;
`

const StyledGameSelect = styled(GameSelect)`
  margin-right: 16px;
  min-width: 240px;
`

const RoomListPageHeader = () => {
  const t = useTranslations()

  const { gameType, setGameType } = useGameParam()
  const [createRoom, isCreateRoomEnabled] = useCreateRoom()

  const createRoomWithType = useCallback(async () => {
    if (gameType) {
      await createRoom(gameType)
    }
  }, [createRoom, gameType])

  const createRoomTooltip = gameType
    ? t.roomList.createRoom.tooltip({ gameType })
    : t.roomList.createRoom.noGameSelected

  return (
    <StyledContainer>
      <StyledGameSelect gameType={gameType} onChange={setGameType} />
      <AsyncButton
        onClick={createRoomWithType}
        disabled={!isCreateRoomEnabled || !gameType}
        title={createRoomTooltip}
      >
        {t.roomList.createRoom.label}
      </AsyncButton>
    </StyledContainer>
  )
}

export default RoomListPageHeader
