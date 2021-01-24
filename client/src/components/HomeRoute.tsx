import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { BoardId } from "common/roborally/model/BoardData"
import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import PageHeader from "components/ui/PageHeader"
import { ROUTES } from "utils/navigation"

import { getBoardImage } from "./roborally/BoardImage"
import Box from "./ui/Box"

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
    <PageContent>
      <GameContainer>
        <Link to={ROUTES.roomList()} title="Click to open rooms">
          <GameIcon />
          <GameTitle>Roborally</GameTitle>
        </Link>
      </GameContainer>
    </PageContent>
  </PageContainer>
)

export default HomeRoute
