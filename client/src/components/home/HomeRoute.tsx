import React from "react"
import styled from "styled-components"

import { GameType } from "common/GameSettings"
import { enumValues } from "common/utils/enums"
import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import PageHeader from "components/ui/PageHeader"
import { useTranslations } from "hooks/useTranslations"

import GameTile from "./GameTile"

const StyledPageContent = styled(PageContent)`
  display: flex;
  gap: 0px 48px;
`

const HomeRoute = () => {
  const t = useTranslations()

  return (
    <PageContainer>
      <PageHeader title={t.home.pageTitle} />
      <StyledPageContent>
        {enumValues(GameType).map(game => (
          <GameTile key={game} game={game} />
        ))}
      </StyledPageContent>
    </PageContainer>
  )
}

export default HomeRoute
