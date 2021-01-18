import React, { useCallback } from "react"
import styled from "styled-components"

import { PlayerId } from "common/model/GameStateBasic"
import { usePlayerName } from "hooks/usePlayerName"
import { useRoomId } from "hooks/useRoomId"

import { useGameState } from "./hooks/useGameState"
import { usePlayerState } from "./hooks/usePlayerState"
import { getCurrentPlayer } from "./utils/getters"
import { getScore } from "common/metropolys/model/MetropolysState"

type GameUiPlayerCardProps = {
  isCurrentUser: boolean
  playerId: PlayerId
  playerIndex: number
}

const PlayerCardContainer = styled.div`
  align-items: center;
  background-color: #aaa;
  border-color: #888;
  border-style: solid;
  border-width: 1px;
  display: flex;
  flex-direction: row;
  padding: 16px;
`

const PlayerCardContentContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`

const PlayerCardContextRow = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  margin: 4px 0px;
  width: 272px;
`

const PlayerCardName = styled.div`
  flex: 1 1 0;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const PlayerCardScore = styled.div``

const GameUiPlayerCard = ({
  isCurrentUser,
  playerId,
}: GameUiPlayerCardProps) => {
  const roomId = useRoomId()
  const playerName = usePlayerName(roomId, playerId)
  const currentPlayer = useGameState(getCurrentPlayer)
  const playerBuildings = usePlayerState(playerId, player => player.buildings).reduce((buildings, available, index) => {
    if (available) {
      buildings.push(index + 1)
    }

    return buildings
  }, [] as number[])

  const playerScore = useGameState(useCallback(state => getScore(state, playerId), [playerId]))

  const playerStatus = currentPlayer === playerId ? "Waiting..." : "-"

  return (
    <PlayerCardContainer>
      <PlayerCardContentContainer>
        <PlayerCardContextRow>
          <PlayerCardName>
            {isCurrentUser ? `${playerName} (you)` : playerName}
          </PlayerCardName>
          <PlayerCardScore>
            Score: {playerScore}
          </PlayerCardScore>
        </PlayerCardContextRow>
        <PlayerCardContextRow>Buildings: {playerBuildings.join(", ")}</PlayerCardContextRow>
        <PlayerCardContextRow>{playerStatus}</PlayerCardContextRow>
      </PlayerCardContentContainer>
    </PlayerCardContainer>
  )
}

export default GameUiPlayerCard
