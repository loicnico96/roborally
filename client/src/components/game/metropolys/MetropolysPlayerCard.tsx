import React, { useCallback } from "react"
import styled from "styled-components"

import {
  getColorMissionCount,
  getPlayerScore,
  getShapeMissionCount,
} from "common/metropolys/model/getPlayerScore"
import {
  getHighestBid,
  getLastRuinsPlayerId,
  getMostMetroPlayerId,
} from "common/metropolys/model/MetropolysState"
import { Token } from "common/metropolys/model/Token"
import { PlayerId } from "common/model/GameStateBasic"

import { useMetropolysContext } from "./hooks/useMetropolysContext"
import { useMetropolysPlayer } from "./hooks/useMetropolysPlayer"
import { useMetropolysState } from "./hooks/useMetropolysState"
import MetropolysMetroCard from "./images/MetropolysMetroCard"
import MetropolysMissionColorCard from "./images/MetropolysMissionColorCard"
import MetropolysMissionShapeCard from "./images/MetropolysMissionShapeCard"
import MetropolysRuinsCard from "./images/MetropolysRuinsCard"
import MetropolysToken from "./images/MetropolysToken"
import MetropolysBuilding from "./MetropolysBuilding"
import {
  getPlayerBuildings,
  getPlayerColor,
  getPlayerName,
  getPlayerPass,
  getPlayerReady,
  getPlayerShape,
  getPlayerTokens,
} from "./utils/getters"

export type MetropolysPlayerCardProps = {
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

const PlayerCardContentRow = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  margin: 4px 0px;
`

const PlayerCardContentRowBuildings = styled(PlayerCardContentRow)`
  gap: 16px;
`

const PlayerCardName = styled.div`
  flex: 1 1 0;
  font-weight: bold;
  opacity: ${({ isPass }: { isPass: boolean }) => (isPass ? 0.3 : 1.0)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const PlayerBuilding = styled(MetropolysBuilding)`
  align-self: end;
`

const PlayerCardScore = styled.div``

const PlayerCardCounter = styled.div`
  align-items: center;
  display: flex;
  width: 80px;
`

const PlayerCardColorImage = styled(MetropolysMissionColorCard)`
  cursor: help;
  height: 72px;
  margin-right: 4px;
  width: 48px;
`

const PlayerCardShapeImage = styled(MetropolysMissionShapeCard)`
  cursor: help;
  height: 72px;
  margin-right: 4px;
  width: 48px;
`

const PlayerCardTokenImage = styled(MetropolysToken)`
  cursor: help;
  height: 48px;
  margin-right: 4px;
  width: 48px;
`

const PlayerCardMetroImage = styled(MetropolysMetroCard)`
  cursor: help;
  height: 72px;
  margin-right: 8px;
  opacity: ${({ isMostMetro }: { isMostMetro: boolean }) =>
    isMostMetro ? 1.0 : 0.3};
  width: 48px;
`

const PlayerCardRuinsImage = styled(MetropolysRuinsCard)`
  cursor: help;
  height: 72px;
  opacity: ${({ isLastRuins }: { isLastRuins: boolean }) =>
    isLastRuins ? 1.0 : 0.3};
  width: 48px;
`

function usePlayerScore(playerId: PlayerId): number {
  return useMetropolysState(
    useCallback(
      state => getPlayerScore(state, playerId, state.winners !== undefined),
      [playerId]
    )
  )
}

function useColorMissionCount(playerId: PlayerId): number {
  return useMetropolysState(
    useCallback(state => getColorMissionCount(state, playerId), [playerId])
  )
}

function useShapeMissionCount(playerId: PlayerId): number {
  return useMetropolysState(
    useCallback(state => getShapeMissionCount(state, playerId), [playerId])
  )
}

const MetropolysPlayerCard = ({
  isCurrentUser,
  playerId,
}: MetropolysPlayerCardProps) => {
  const { selectHeight, selectedHeight } = useMetropolysContext()
  const playerBuildings = useMetropolysPlayer(playerId, getPlayerBuildings)
  const playerColor = useMetropolysPlayer(playerId, getPlayerColor)
  const playerName = useMetropolysPlayer(playerId, getPlayerName)
  const playerPass = useMetropolysPlayer(playerId, getPlayerPass)
  const playerReady = useMetropolysPlayer(playerId, getPlayerReady)
  const playerShape = useMetropolysPlayer(playerId, getPlayerShape)
  const playerTokens = useMetropolysPlayer(playerId, getPlayerTokens)

  const highestBid = useMetropolysState(getHighestBid)
  const winners = useMetropolysState(state => state.winners)

  const playerScore = usePlayerScore(playerId)

  const colorMissionCount = useColorMissionCount(playerId)
  const shapeMissionCount = useShapeMissionCount(playerId)

  const isCurrentPlayer = !playerReady
  const isHighestBid = highestBid?.playerId === playerId
  const isLastRuins = useMetropolysState(getLastRuinsPlayerId) === playerId
  const isMostMetro = useMetropolysState(getMostMetroPlayerId) === playerId
  const isWinner = winners?.includes(playerId) ?? false

  const isScoreVisible = isCurrentUser || winners !== undefined
  const minBidHeight = highestBid ? highestBid.height + 1 : 0

  return (
    <PlayerCardContainer>
      <PlayerCardContentContainer>
        <PlayerCardContentRow>
          <PlayerCardName isPass={playerPass}>
            {playerName}
            {isCurrentPlayer && " (bidding...)"}
            {isHighestBid && " (highest bid)"}
            {isWinner && " (winner)"}
            {playerPass && " (passed)"}
          </PlayerCardName>
          <PlayerCardScore>
            Score: {isScoreVisible ? playerScore : "??"}
          </PlayerCardScore>
        </PlayerCardContentRow>
        <PlayerCardContentRowBuildings>
          {playerBuildings.map((isAvailable, height) => {
            const isPlayable = height >= minBidHeight && !playerPass
            const isSelectable =
              isCurrentPlayer && isCurrentUser && isAvailable && isPlayable
            const isSelected =
              isCurrentPlayer && isCurrentUser && height === selectedHeight
            const onClick = () => {
              if (isSelectable) {
                selectHeight(height)
              }
            }

            return (
              <PlayerBuilding
                key={height}
                height={height}
                isSelectable={isSelectable}
                isSelected={isSelected}
                playerId={playerId}
                onClick={onClick}
                opacity={isPlayable ? 1.0 : 0.3}
                transparent={!isAvailable}
              />
            )
          })}
        </PlayerCardContentRowBuildings>
        <PlayerCardContentRow>
          <PlayerCardCounter>
            <PlayerCardColorImage
              color={playerColor}
              isHidden={!isScoreVisible}
            />
            {isScoreVisible ? colorMissionCount : "??"}
          </PlayerCardCounter>
          <PlayerCardCounter>
            <PlayerCardShapeImage
              shape={playerShape}
              isHidden={!isScoreVisible}
            />
            {isScoreVisible ? shapeMissionCount : "??"}
          </PlayerCardCounter>
          <PlayerCardCounter>
            <PlayerCardTokenImage token={Token.FANCY} />
            {playerTokens[Token.FANCY]}
          </PlayerCardCounter>
          <PlayerCardCounter>
            <PlayerCardTokenImage token={Token.METRO} />
            {playerTokens[Token.METRO]}
          </PlayerCardCounter>
          <PlayerCardCounter>
            <PlayerCardTokenImage token={Token.RUINS} />
            {playerTokens[Token.RUINS]}
          </PlayerCardCounter>
          <PlayerCardMetroImage isMostMetro={isMostMetro} />
          <PlayerCardRuinsImage isLastRuins={isLastRuins} />
        </PlayerCardContentRow>
      </PlayerCardContentContainer>
    </PlayerCardContainer>
  )
}

export default MetropolysPlayerCard
