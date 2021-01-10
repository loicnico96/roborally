import React from "react"
import styled from "styled-components"

import { useAuthContext } from "firestore/auth/AuthContext"

import GameUiBoard from "./GameUiBoard"
import GameUiCheckpoint from "./GameUiCheckpoint"
import GameUiPlayerCard from "./GameUiPlayerCard"
import GameUiPlayerRobot from "./GameUiPlayerRobot"
import GameUiProgram from "./GameUiProgram"
import GameUiTurnPhaseSequence from "./GameUiTurnPhaseSequence"
import GameUiViewport from "./GameUiViewport"
import { useGameState } from "./hooks/useGameState"
import { getCheckpoints, getPlayerIds } from "./utils/getters"
import { getViewportHeight, getViewportWidth } from "./Viewport"

const GameUiContentWrapper = styled.div`
  background-color: lightgray;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const GameUiContentMain = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  overflow: hidden;
`

const GamePage = () => {
  const checkpoints = useGameState(getCheckpoints)
  const playerIds = useGameState(getPlayerIds)
  const viewportHeight = useGameState(getViewportHeight)
  const viewportWidth = useGameState(getViewportWidth)

  const { userId } = useAuthContext()

  return (
    <GameUiContentWrapper>
      <GameUiContentMain>
        <GameUiTurnPhaseSequence />
        <GameUiViewport
          viewportHeight={viewportHeight}
          viewportWidth={viewportWidth}
        >
          <GameUiBoard />
          {checkpoints.map((checkpoint, index) => (
            <GameUiCheckpoint key={index} index={index} pos={checkpoint} />
          ))}
          {playerIds.map((playerId, index) => (
            <GameUiPlayerRobot
              key={playerId}
              playerId={playerId}
              playerIndex={index}
            />
          ))}
        </GameUiViewport>
        <div id="GameUiContentMainRight">
          {playerIds.map((playerId, index) => (
            <GameUiPlayerCard
              key={playerId}
              isCurrentUser={playerId === userId}
              playerId={playerId}
              playerIndex={index}
            />
          ))}
        </div>
      </GameUiContentMain>
      {userId !== null && playerIds.includes(userId) && (
        <GameUiProgram playerId={userId} />
      )}
    </GameUiContentWrapper>
  )
}

export default GamePage
