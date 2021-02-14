import React from "react"

import MetropolysMissionShapeCardBack from "assets/metropolys/missionShapeBack.png"
import MetropolysMissionShapeCardBridges from "assets/metropolys/missionShapeBridges.jpg"
import MetropolysMissionShapeCardChains from "assets/metropolys/missionShapeChains.jpg"
import MetropolysMissionShapeCardLakes from "assets/metropolys/missionShapeLakes.jpg"
import MetropolysMissionShapeCardSectors from "assets/metropolys/missionShapeSectors.jpg"
import MetropolysMissionShapeCardTowers from "assets/metropolys/missionShapeTowers.jpg"
import {
  SHAPE_MISSION_SCORE,
  MissionShape,
} from "common/metropolys/model/constants"
import { ImageProps } from "utils/dom"

export type MetropolysMissionShapeCardProps = Omit<ImageProps, "src"> & {
  shape: MissionShape
  isHidden: boolean
}

export function getCardImage(shape: MissionShape, isHidden: boolean): string {
  if (isHidden) {
    return MetropolysMissionShapeCardBack
  }

  return {
    [MissionShape.BRIDGES]: MetropolysMissionShapeCardBridges,
    [MissionShape.CHAINS]: MetropolysMissionShapeCardChains,
    [MissionShape.LAKES]: MetropolysMissionShapeCardLakes,
    [MissionShape.SECTORS]: MetropolysMissionShapeCardSectors,
    [MissionShape.TOWERS]: MetropolysMissionShapeCardTowers,
  }[shape]
}

export function getCardLabel(shape: MissionShape, isHidden: boolean): string {
  if (isHidden) {
    return `Area objective (hidden)\nAt the end of the game, this player scores Prestige Points for each matching set of buildings.`
  }

  const shapeLabel = {
    [MissionShape.BRIDGES]: "Bridges",
    [MissionShape.CHAINS]: "Chains",
    [MissionShape.LAKES]: "Lakes",
    [MissionShape.SECTORS]: "Districts",
    [MissionShape.TOWERS]: "Statues",
  }[shape]

  const shapeDescription = {
    [MissionShape.BRIDGES]:
      "group of two buildings you have constructed on both sides of a bridge",
    [MissionShape.CHAINS]: "chain of three buildings you have constructed",
    [MissionShape.LAKES]:
      "group of three buildings you have constructed around a lake",
    [MissionShape.SECTORS]:
      "district where you have constructed at least three buildings",
    [MissionShape.TOWERS]:
      "group of three buildings you have constructed around a statue",
  }[shape]

  return `Area objective - ${shapeLabel}\nAt the end of the game, you score ${SHAPE_MISSION_SCORE[shape]} Prestige Points for each ${shapeDescription}. (Each building may only be used to attain an objective once.)`
}

const MetropolysMissionShapeCard = ({
  shape,
  isHidden,
  ...props
}: MetropolysMissionShapeCardProps) => (
  <img
    src={getCardImage(shape, isHidden)}
    title={getCardLabel(shape, isHidden)}
    {...props}
  />
)

export default MetropolysMissionShapeCard
