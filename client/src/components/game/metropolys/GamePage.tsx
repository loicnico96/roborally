import React from "react"
import styled from "styled-components"

import MetropolysBoardImage from "assets/metropolys/board.png"
import { useAuthContext } from "firestore/auth/AuthContext"

import { useMetropolysState } from "./hooks/useMetropolysState"
import MetropolysActionBanner from "./MetropolysActionBanner"
import MetropolysContextProvider from "./MetropolysContextProvider"
import MetropolysPlayerCard from "./MetropolysPlayerCard"
import { getPlayerOrder } from "./utils/getters"

const ContentWrapper = styled.div`
  background-color: lightgray;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const ContentMain = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  overflow: hidden;
`

const BoardView = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: start;
`

const BoardImage = styled.img`
  padding: 24px;
`

const GamePage = () => {
  const currentPlayerId = useMetropolysState(state => state.currentPlayer)
  const playerOrder = useMetropolysState(getPlayerOrder)

  const { userId } = useAuthContext()

  return (
    <MetropolysContextProvider>
      <ContentWrapper>
        <ContentMain>
          <BoardView>
            {currentPlayerId === userId && <MetropolysActionBanner />}
            <BoardImage src={MetropolysBoardImage} />
          </BoardView>
          <div id="GameUiContentMainRight">
            {playerOrder.map((playerId, index) => (
              <MetropolysPlayerCard
                key={playerId}
                isCurrentUser={playerId === userId}
                playerId={playerId}
                playerIndex={index}
              />
            ))}
          </div>
        </ContentMain>
      </ContentWrapper>
    </MetropolysContextProvider>
  )
}

export default GamePage
