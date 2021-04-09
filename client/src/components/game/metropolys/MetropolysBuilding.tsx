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
  size?: number
  transparent?: boolean
}

export const BUILDING_COLORS = ["red", "lightblue", "white", "gray"]
export const BUILDING_WIDTH = 30
export const BUILDING_HEIGHT: Record<BuildingSize, number> = {
  [BuildingSize.SMALL]: 1.0,
  [BuildingSize.MEDIUM]: 1.5,
  [BuildingSize.LARGE]: 2.0,
}

export const BUILDING_TOOLTIP: Record<BuildingSize, string> = {
  [BuildingSize.SMALL]: "Small building",
  [BuildingSize.MEDIUM]: "Medium building",
  [BuildingSize.LARGE]: "Tall building",
}

const MetropolysBuildingContainer = Selectable(styledWithProps<
  "div",
  {
    color: string
    height: number
    opacity: number
    width: number
  }
>("div")`
  align-items: center;
  background-color: ${props => props.color};
  border-color: black;
  border-style: solid;
  color: black;
  display: flex;
  height: ${props => props.height}px;
  justify-content: center;
  opacity: ${props => props.opacity};
  width: ${props => props.width}px;
  ${props =>
    props.color === "transparent"
      ? ""
      : `
    box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    &:hover {
      box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
    }
  `}
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
  size = BUILDING_WIDTH,
  transparent = false,
  ...props
}: PlayerBuildingProps) => {
  const playerOrder = useMetropolysState(state => state.playerOrder)
  const playerIndex = playerOrder.indexOf(playerId)

  return (
    <MetropolysBuildingContainer
      color={transparent ? "transparent" : BUILDING_COLORS[playerIndex]}
      height={size * BUILDING_HEIGHT[getBuildingSize(height)]}
      isSelectable={isSelectable}
      isSelected={isSelected}
      opacity={opacity}
      title={BUILDING_TOOLTIP[getBuildingSize(height)]}
      width={size}
      {...props}
    >
      {showHeight ? getHeightLabel(height) : null}
    </MetropolysBuildingContainer>
  )
}

export default MetropolysBuilding
