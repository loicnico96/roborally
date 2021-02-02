import React, { useCallback } from "react"
import styled, { ThemedStyledFunction } from "styled-components"

import { getPlayerScore } from "common/metropolys/model/getPlayerScore"
import { MetropolysPlayer } from "common/metropolys/model/MetropolysPlayer"
import {
  getHighestBid,
  MetropolysState,
} from "common/metropolys/model/MetropolysState"
import { PlayerId } from "common/model/GameStateBasic"

import { useMetropolysContext } from "./hooks/useMetropolysContext"
import { useMetropolysPlayer } from "./hooks/useMetropolysPlayer"
import { useMetropolysState } from "./hooks/useMetropolysState"
import { getPlayerName } from "./utils/getters"

export type MetropolysPlayerCardProps = {
  isCurrentUser: boolean
  playerId: PlayerId
  playerIndex: number
}

export type BuildingHeight = 0 | 1 | 2
const COLORS = ["red", "lightblue", "white", "gray"]
const HEIGHTS: BuildingHeight[] = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2]

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
  gap: 16px;
  margin: 4px 0px;
`

const PlayerCardName = styled.div`
  flex: 1 1 0;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export function styledWithProps<
  Tag extends keyof JSX.IntrinsicElements,
  Props extends Record<string, unknown>
>(tag: Tag): ThemedStyledFunction<Tag, any, Props, never> {
  return (styled[tag] as ThemedStyledFunction<
    any,
    any,
    Props,
    never
  >) as ThemedStyledFunction<Tag, any, Props, never>
}

const PlayerBuilding = styledWithProps<
  "div",
  {
    color: string
    height: BuildingHeight
    isAvailable: boolean
    isPlayable: boolean
    isSelectable: boolean
    isSelected: boolean
  }
>("div")`
  align-items: center;
  align-self: end;
  background-color: ${({ color, isAvailable }) =>
    isAvailable ? color : "transparent"};
  border-color: black;
  border-style: solid;
  border-width: ${({ isSelected }) => (isSelected ? 2 : 1)}px;
  color: black;
  ${({ isSelectable }) => (isSelectable ? "cursor: pointer;" : "")}
  display: flex;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  height: ${({ height }) => [24, 36, 48][height]}px;
  justify-content: center;
  opacity: ${({ isPlayable }) => (isPlayable ? 1.0 : 0.3)};
  width: 24px;
`

const PlayerCardScore = styled.div``

function getPlayerStatus(player: MetropolysPlayer): string {
  if (player.ready) {
    if (player.pass) {
      return "Passed"
    } else {
      return "-"
    }
  } else {
    return "Bidding..."
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

const MetropolysPlayerCard = ({
  isCurrentUser,
  playerId,
  playerIndex,
}: MetropolysPlayerCardProps) => {
  const { selectHeight, selectedHeight } = useMetropolysContext()
  const playerName = useMetropolysPlayer(playerId, getPlayerName)
  const playerStatus = useMetropolysPlayer(playerId, getPlayerStatus)
  const buildings = useMetropolysPlayer(playerId, getPlayerBuildings)
  const minimumHeight = useMetropolysState(getMinimumHeight)
  const playerScore = usePlayerScore(playerId)

  return (
    <PlayerCardContainer>
      <PlayerCardContentContainer>
        <PlayerCardContextRow>
          <PlayerCardName>
            {isCurrentUser ? `${playerName} (you)` : playerName}
          </PlayerCardName>
          <PlayerCardScore>Score: {playerScore}</PlayerCardScore>
        </PlayerCardContextRow>
        <PlayerCardContextRow>
          {buildings.map((available, height) => (
            <PlayerBuilding
              color={COLORS[playerIndex]}
              height={HEIGHTS[height]}
              isAvailable={available}
              isPlayable={height >= minimumHeight}
              isSelectable={
                isCurrentUser && height >= minimumHeight && available
              }
              isSelected={isCurrentUser && height === selectedHeight}
              key={height}
              onClick={() => {
                if (isCurrentUser && available && height >= minimumHeight) {
                  selectHeight(height)
                }
              }}
            >
              {height + 1}
            </PlayerBuilding>
          ))}
        </PlayerCardContextRow>
        <PlayerCardContextRow>{playerStatus}</PlayerCardContextRow>
      </PlayerCardContentContainer>
    </PlayerCardContainer>
  )
}

export default MetropolysPlayerCard
