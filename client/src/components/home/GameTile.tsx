import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import HomeImageMetropolys from "assets/metropolys/home.jpg"
import HomeImageRoborally from "assets/roborally/home.jpg"
import { GameType } from "common/GameSettings"
import Box from "components/ui/Box"
import { useTranslations } from "hooks/useTranslations"
import { ROUTES, withSearchParams } from "utils/navigation"

export type GameTileProps = {
  game: GameType
}

const StyledBox = styled(Box)`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 300px;
  justify-content: center;
  width: 300px;
`

const StyledImage = styled.img`
  max-height: 100%;
  max-width: 100%;
`

const StyledLabel = styled.div`
  font-size: 1.5em;
  padding-top: 0.5em;
  text-align: center;
`

const IMAGES = {
  [GameType.METROPOLYS]: HomeImageMetropolys,
  [GameType.ROBORALLY]: HomeImageRoborally,
}

const GameTile = ({ game }: GameTileProps) => {
  const linkTo = withSearchParams(ROUTES.roomList(), { game })
  const t = useTranslations()

  return (
    <Link to={linkTo} title={t.gameTile.tooltip}>
      <StyledBox>
        <StyledImage src={IMAGES[game]} />
      </StyledBox>
      <StyledLabel>{t.games[game].name}</StyledLabel>
    </Link>
  )
}

export default GameTile
