import React, { useCallback } from "react"
import styled from "styled-components"

import AsyncButton from "components/ui/AsyncButton"

import GameSelect from "./GameSelect"
import { useCreateRoom } from "./hooks/useCreateRoom"
import { useGameParam } from "./hooks/useGameParam"
import { getGameLabel } from "./utils/getters"

const StyledContainer = styled.div`
  margin-bottom: 24px;
`

const StyledGameSelect = styled(GameSelect)`
  margin-right: 16px;
  min-width: 240px;
`

const RoomListPageHeader = () => {
  const { gameType, setGameType } = useGameParam()
  const [createRoom, isCreateRoomEnabled] = useCreateRoom()

  const createRoomWithType = useCallback(async () => {
    if (gameType) {
      await createRoom(gameType)
    }
  }, [createRoom, gameType])

  const createRoomTooltip = gameType
    ? `Create a room for ${getGameLabel(gameType)}`
    : "You must select a game"

  return (
    <StyledContainer>
      <StyledGameSelect gameType={gameType} onChange={setGameType} />
      <AsyncButton
        onClick={createRoomWithType}
        disabled={!isCreateRoomEnabled || !gameType}
        title={createRoomTooltip}
      >
        Create room
      </AsyncButton>
    </StyledContainer>
  )
}

export default RoomListPageHeader
