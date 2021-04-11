import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { GameType } from "common/GameSettings"
import { BoardId } from "common/roborally/model/BoardData"
import { getBoardImage } from "components/game/roborally/BoardImage"
import { getGameLabel } from "components/roomList/utils/getters"
import Box from "components/ui/Box"
import { ROUTES, withSearchParams } from "utils/navigation"

const StyledIcon = styled(Box)`
  background-image: url("${getBoardImage(BoardId.ISLAND)}");
  background-position: -36px -36px;
  background-size: 600px 600px;
  box-sizing: border-box;
  height: 300px;
  width: 300px;
`

const StyledLabel = styled.div`
  font-size: 1.5em;
  padding-top: 0.5em;
  text-align: center;
`

export type GameTileProps = {
  gameType: GameType
}

const GameTile = ({ gameType }: GameTileProps) => {
  const linkTo = withSearchParams(ROUTES.roomList(), { game: gameType })

  return (
    <Link to={linkTo} title="Click to show rooms">
      <StyledIcon />
      <StyledLabel>{getGameLabel(gameType)}</StyledLabel>
    </Link>
  )
}

export default GameTile
