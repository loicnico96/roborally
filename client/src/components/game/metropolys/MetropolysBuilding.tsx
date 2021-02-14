import React from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { styledDivWithProps } from "utils/styles"

import { useMetropolysState } from "./hooks/useMetropolysState"

export type DivProps = React.HTMLAttributes<HTMLDivElement>

export type PlayerBuildingProps = DivProps & {
  height: number
  isSelectable?: boolean
  isSelected?: boolean
  onClick?: () => void
  opacity?: number
  playerId: PlayerId
  showHeight?: boolean
  transparent?: boolean
}

const BUILDING_COLORS = ["red", "lightblue", "white", "gray"]

const MetropolysBuildingContainer = styledDivWithProps<{
  color: string
  isSelectable: boolean
  isSelected: boolean
  onClick?: () => void
  opacity: number
}>()`
  align-items: center;
  align-self: end;
  background-color: ${props => props.color};
  border-color: black;
  border-style: solid;
  border-width: ${props => (props.isSelected ? 3 : 1)}px;
  box-sizing: border-box;
  color: black;
  cursor: ${props =>
    props.onClick
      ? props.isSelectable
        ? "pointer"
        : "not-allowed"
      : "default"};
  display: flex;
  font-weight: ${props => (props.isSelected ? "bold" : "normal")};
  justify-content: center;
  opacity: ${props => props.opacity};
`

function getHeightLabel(height: number): string {
  return String(height + 1)
}

const MetropolysBuilding = ({
  height,
  isSelectable = false,
  isSelected = false,
  onClick,
  opacity = 1.0,
  playerId,
  showHeight = true,
  transparent = false,
  ...props
}: PlayerBuildingProps) => {
  const playerOrder = useMetropolysState(state => state.playerOrder)
  const playerIndex = playerOrder.indexOf(playerId)

  return (
    <MetropolysBuildingContainer
      color={transparent ? "transparent" : BUILDING_COLORS[playerIndex]}
      isSelectable={isSelectable}
      isSelected={isSelected}
      onClick={onClick}
      opacity={opacity}
      {...props}
    >
      {showHeight ? getHeightLabel(height) : null}
    </MetropolysBuildingContainer>
  )
}

export default MetropolysBuilding
