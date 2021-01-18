import React from "react"
import styled from "styled-components"

import { useAuthContext } from "firestore/auth/AuthContext"
import { useGameState } from "./hooks/useGameState"
import { getCurrentPlayer, getPlayerIds } from "./utils/getters"
import GameUiPlayerCard from "./GameUiPlayerCard"
import MetropolysActionFooter from "./MetropolysActionFooter"

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
  const playerIds = useGameState(getPlayerIds)
  const currentPlayerId = useGameState(getCurrentPlayer)

  const { userId } = useAuthContext()

  return (
    <GameUiContentWrapper>
      <GameUiContentMain>
        Metropolys
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
      {userId !== null && userId === currentPlayerId && (
        <MetropolysActionFooter />
      )}
    </GameUiContentWrapper>
  )
}

export default GamePage
