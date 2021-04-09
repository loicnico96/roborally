import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { GameType } from "common/GameSettings"
import { BoardId } from "common/roborally/model/BoardData"
import { getBoardImage } from "components/game/roborally/BoardImage"
import Box from "components/ui/Box"
import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import PageHeader from "components/ui/PageHeader"
import { ROUTES, withSearchParams } from "utils/navigation"

const StyledPageContent = styled(PageContent)`
  display: flex;
  gap: 0px 48px;
`

const GameContainer = styled.div`
  width: 300px;
`

const GameIcon = styled(Box)`
  background-image: url("${getBoardImage(BoardId.ISLAND)}");
  background-position: -36px -36px;
  background-size: 600px 600px;
  box-sizing: border-box;
  height: 300px;
  width: 300px;
`

const GameTitle = styled.div`
  font-size: 1.5em;
  padding-top: 0.5em;
  text-align: center;
`

const HomeRoute = () => (
  <PageContainer>
    <PageHeader title="Home" />
    <StyledPageContent>
      <GameContainer>
        <Link
          to={withSearchParams(ROUTES.roomList(), {
            game: GameType.METROPOLYS,
          })}
          title="Click to show rooms"
        >
          <GameIcon />
          <GameTitle>Metropolys</GameTitle>
        </Link>
      </GameContainer>
      <GameContainer>
        <Link
          to={withSearchParams(ROUTES.roomList(), { game: GameType.ROBORALLY })}
          title="Click to show rooms"
        >
          <GameIcon />
          <GameTitle>Roborally</GameTitle>
        </Link>
      </GameContainer>
    </StyledPageContent>
  </PageContainer>
)

export default HomeRoute
