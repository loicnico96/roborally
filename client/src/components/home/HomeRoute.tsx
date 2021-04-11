import React from "react"
import styled from "styled-components"

import { GameType } from "common/GameSettings"
import { enumValues } from "common/utils/enums"
import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import PageHeader from "components/ui/PageHeader"

import GameTile from "./GameTile"

const StyledPageContent = styled(PageContent)`
  display: flex;
  gap: 0px 48px;
`

const HomeRoute = () => (
  <PageContainer>
    <PageHeader title="Home" />
    <StyledPageContent>
      {enumValues(GameType).map(gameType => (
        <GameTile key={gameType} gameType={gameType} />
      ))}
    </StyledPageContent>
  </PageContainer>
)

export default HomeRoute
