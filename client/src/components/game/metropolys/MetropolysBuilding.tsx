import React from "react"

import {
  BuildingSize,
  getBuildingSize,
} from "common/metropolys/model/constants"
import { PlayerId } from "common/model/GameStateBasic"
import { styledWithProps } from "utils/styles"

import { useMetropolysState } from "./hooks/useMetropolysState"
import { Selectable } from "./utils/Selectable"

export type DivProps = React.HTMLAttributes<HTMLDivElement>

export type PlayerBuildingProps = DivProps & {
  height: number
  isSelectable?: boolean
  isSelected?: boolean
  opacity?: number
  playerId: PlayerId
  showHeight?: boolean
  transparent?: boolean
}

export const BUILDING_COLORS = ["red", "lightblue", "white", "gray"]
export const BUILDING_WIDTH = 24
export const BUILDING_HEIGHT = {
  [BuildingSize.SMALL]: BUILDING_WIDTH * 1.0,
  [BuildingSize.MEDIUM]: BUILDING_WIDTH * 1.5,
  [BuildingSize.LARGE]: BUILDING_WIDTH * 2.0,
}

const MetropolysBuildingContainer = Selectable(styledWithProps<
  "div",
  {
    color: string
    opacity: number
    size: BuildingSize
  }
>("div")`
  align-items: center;
  background-color: ${props => props.color};
  border-color: black;
  border-style: solid;
  color: black;
  display: flex;
  height: ${props => BUILDING_HEIGHT[props.size]}px;
  justify-content: center;
  opacity: ${props => props.opacity};
  width: ${BUILDING_WIDTH}px;
`)

function getHeightLabel(height: number): string {
  return String(height + 1)
}

const MetropolysBuilding = ({
  height,
  isSelectable = false,
  isSelected = false,
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
      opacity={opacity}
      size={getBuildingSize(height)}
      {...props}
    >
      {showHeight ? getHeightLabel(height) : null}
    </MetropolysBuildingContainer>
  )
}

export default MetropolysBuilding
