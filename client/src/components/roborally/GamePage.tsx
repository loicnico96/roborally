import React, { useMemo } from "react"
import styled from "styled-components"

import { BoardId } from "common/roborally/model/BoardData"
import ImageLoader from "components/ui/ImageLoader"
import { useAuthContext } from "firestore/auth/AuthContext"

import { getBoardImage } from "./BoardImage"
import GameUiBoard from "./GameUiBoard"
import { CARD_IMAGES } from "./GameUiCard"
import GameUiCheckpoint from "./GameUiCheckpoint"
import GameUiPlayerCard from "./GameUiPlayerCard"
import GameUiPlayerRobot from "./GameUiPlayerRobot"
import GameUiProgram from "./GameUiProgram"
import GameUiTurnPhaseSequence from "./GameUiTurnPhaseSequence"
import GameUiViewport from "./GameUiViewport"
import { useGameState } from "./hooks/useGameState"
import { ROBOT_IMAGES } from "./RobotImage"
import { getBoardIds, getCheckpoints, getPlayerIds } from "./utils/getters"
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

function getPreloadUrls(boardIds: BoardId[]): string[] {
  return [...CARD_IMAGES, ...ROBOT_IMAGES, ...boardIds.map(getBoardImage)]
}

const GamePage = () => {
  const checkpoints = useGameState(getCheckpoints)
  const playerIds = useGameState(getPlayerIds)
  const viewportHeight = useGameState(getViewportHeight)
  const viewportWidth = useGameState(getViewportWidth)
  const boardIds = useGameState(getBoardIds)

  const imageUrls = useMemo(() => getPreloadUrls(boardIds), [boardIds])

  const { userId } = useAuthContext()

  return (
    <ImageLoader imageUrls={imageUrls}>
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
    </ImageLoader>
  )
}

export default GamePage
