import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import HomeImageMetropolys from "assets/metropolys/home.jpg"
import HomeImageRoborally from "assets/roborally/home.jpg"
import { GameType } from "common/GameSettings"
import { getGameLabel } from "components/roomList/utils/getters"
import Box from "components/ui/Box"
import { ROUTES, withSearchParams } from "utils/navigation"

export type GameTileProps = {
  gameType: GameType
}

const StyledTile = styled(Box)`
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

const GameTile = ({ gameType }: GameTileProps) => {
  const linkTo = withSearchParams(ROUTES.roomList(), { game: gameType })

  const imageUrl = {
    [GameType.METROPOLYS]: HomeImageMetropolys,
    [GameType.ROBORALLY]: HomeImageRoborally,
  }[gameType]

  return (
    <Link to={linkTo} title="Click to show rooms">
      <StyledTile>
        <StyledImage src={imageUrl} />
      </StyledTile>
      <StyledLabel>{getGameLabel(gameType)}</StyledLabel>
    </Link>
  )
}

export default GameTile
