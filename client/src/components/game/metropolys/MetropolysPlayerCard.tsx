import React, { useCallback } from "react"
import styled from "styled-components"

import {
  getColorMissionCount,
  getPlayerScore,
  getShapeMissionCount,
} from "common/metropolys/model/getPlayerScore"
import { MetropolysPlayer } from "common/metropolys/model/MetropolysPlayer"
import {
  getHighestBid,
  MetropolysState,
} from "common/metropolys/model/MetropolysState"
import { Token } from "common/metropolys/model/Token"
import { PlayerId } from "common/model/GameStateBasic"
import { styledWithProps } from "utils/styles"

import { useMetropolysContext } from "./hooks/useMetropolysContext"
import { useMetropolysPlayer } from "./hooks/useMetropolysPlayer"
import { useMetropolysState } from "./hooks/useMetropolysState"
import MetropolysBuilding from "./MetropolysBuilding"
import MetropolysMetroCard from "./MetropolysMetroCard"
import MetropolysMissionColorCard from "./MetropolysMissionColorCard"
import MetropolysMissionShapeCard from "./MetropolysMissionShapeCard"
import MetropolysRuinsCard from "./MetropolysRuinsCard"
import MetropolysToken from "./MetropolysToken"
import { getPlayerColor, getPlayerName } from "./utils/getters"

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

const PlayerCardMetroImage = styledWithProps<
  typeof MetropolysMetroCard,
  {
    isMostMetro: boolean
  }
>(MetropolysMetroCard)`
  cursor: help;
  height: 72px;
  margin-right: 8px;
  opacity: ${props => (props.isMostMetro ? 1.0 : 0.3)};
  width: 48px;
`

const PlayerCardRuinsImage = styledWithProps<
  typeof MetropolysRuinsCard,
  {
    isLastRuins: boolean
  }
>(MetropolysRuinsCard)`
  cursor: help;
  height: 72px;
  opacity: ${props => (props.isLastRuins ? 1.0 : 0.3)};
  width: 48px;
`

function getPlayerStatus(player: MetropolysPlayer): string {
  if (player.ready) {
    if (player.pass) {
      return " (passed)"
    } else {
      return ""
    }
  } else {
    return " (bidding...)"
  }
}

function getPlayerBuildings(player: MetropolysPlayer): boolean[] {
  return player.buildings
}

function getMinimumHeight(state: MetropolysState): number {
  const highestBid = getHighestBid(state)
  return highestBid ? highestBid.height + 1 : 0
}

function usePlayerScore(playerId: PlayerId): number {
  return useMetropolysState(
    useCallback(state => getPlayerScore(state, playerId), [playerId])
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
  const playerName = useMetropolysPlayer(playerId, getPlayerName)
  const playerColor = useMetropolysPlayer(playerId, getPlayerColor)
  const playerShape = useMetropolysPlayer(playerId, player => player.shape)
  const playerStatus = useMetropolysPlayer(playerId, getPlayerStatus)
  const playerTokens = useMetropolysPlayer(playerId, player => player.tokens)
  const buildings = useMetropolysPlayer(playerId, getPlayerBuildings)
  const minimumHeight = useMetropolysState(getMinimumHeight)
  const playerScore = usePlayerScore(playerId)

  const colorMissionCount = useColorMissionCount(playerId)
  const shapeMissionCount = useShapeMissionCount(playerId)

  const isLastRuins = useMetropolysState(state => state.lastRuins) === playerId
  const isMostMetro = useMetropolysState(state => state.mostMetro) === playerId

  return (
    <PlayerCardContainer>
      <PlayerCardContentContainer>
        <PlayerCardContentRow>
          <PlayerCardName>
            {playerName}
            {playerStatus}
          </PlayerCardName>
          <PlayerCardScore>
            Score: {isCurrentUser ? playerScore : "??"}
          </PlayerCardScore>
        </PlayerCardContentRow>
        <PlayerCardContentRowBuildings>
          {buildings.map((isAvailable, height) => {
            const isPlayable = height >= minimumHeight

            return (
              <PlayerBuilding
                key={height}
                height={height}
                isSelectable={isCurrentUser && isAvailable && isPlayable}
                isSelected={isCurrentUser && height === selectedHeight}
                playerId={playerId}
                onClick={() => {
                  if (isCurrentUser && isAvailable && isPlayable) {
                    selectHeight(height)
                  }
                }}
                opacity={height >= minimumHeight ? 1.0 : 0.3}
                transparent={!isAvailable}
              />
            )
          })}
        </PlayerCardContentRowBuildings>
        <PlayerCardContentRow>
          <PlayerCardCounter>
            <PlayerCardColorImage
              color={playerColor}
              isHidden={!isCurrentUser}
            />
            {isCurrentUser ? colorMissionCount : "??"}
          </PlayerCardCounter>
          <PlayerCardCounter>
            <PlayerCardShapeImage
              shape={playerShape}
              isHidden={!isCurrentUser}
            />
            {isCurrentUser ? shapeMissionCount : "??"}
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
