import React from "react"
import styled from "styled-components"

import MetropolysBoardImage from "assets/metropolys/board.png"
import {
  getAvailableDistricts,
  PlayerCount,
} from "common/metropolys/model/constants"
import { useAuthContext } from "firestore/auth/AuthContext"

import { useMetropolysState } from "./hooks/useMetropolysState"
import MetropolysActionBanner from "./MetropolysActionBanner"
import MetropolysContextProvider from "./MetropolysContextProvider"
import MetropolysDistrict from "./MetropolysDistrict"
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

const BoardImage = styled.img``

const BoardViewport = styled.div`
  margin: 24px;
  position: relative;
`

const GamePage = () => {
  const currentPlayerId = useMetropolysState(state => state.currentPlayer)
  const playerOrder = useMetropolysState(getPlayerOrder)
  const districts = getAvailableDistricts(playerOrder.length as PlayerCount)

  const { userId } = useAuthContext()

  return (
    <MetropolysContextProvider>
      <ContentWrapper>
        <ContentMain>
          <BoardView>
            {currentPlayerId === userId && <MetropolysActionBanner />}
            <BoardViewport>
              <BoardImage src={MetropolysBoardImage} />
              {districts.map(district => (
                <MetropolysDistrict
                  key={`district-${district}`}
                  district={district}
                />
              ))}
            </BoardViewport>
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
