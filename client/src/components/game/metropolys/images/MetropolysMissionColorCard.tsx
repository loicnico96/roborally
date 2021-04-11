import React from "react"

import MetropolysMissionColorCardBack from "assets/metropolys/cards/missionColorBack.png"
import MetropolysMissionColorCardBlue from "assets/metropolys/cards/missionColorBlue.jpg"
import MetropolysMissionColorCardGray from "assets/metropolys/cards/missionColorGray.jpg"
import MetropolysMissionColorCardGreen from "assets/metropolys/cards/missionColorGreen.jpg"
import MetropolysMissionColorCardOrange from "assets/metropolys/cards/missionColorOrange.jpg"
import MetropolysMissionColorCardRed from "assets/metropolys/cards/missionColorRed.jpg"
import {
  COLOR_MISSION_SCORE,
  DistrictColor,
} from "common/metropolys/model/constants"
import { ImageProps } from "utils/dom"

export type MetropolysMissionColorCardProps = Omit<ImageProps, "src"> & {
  color: DistrictColor
  isHidden: boolean
}

export function getCardImage(color: DistrictColor, isHidden: boolean): string {
  if (isHidden) {
    return MetropolysMissionColorCardBack
  }

  return {
    [DistrictColor.BLUE]: MetropolysMissionColorCardBlue,
    [DistrictColor.GRAY]: MetropolysMissionColorCardGray,
    [DistrictColor.GREEN]: MetropolysMissionColorCardGreen,
    [DistrictColor.ORANGE]: MetropolysMissionColorCardOrange,
    [DistrictColor.RED]: MetropolysMissionColorCardRed,
  }[color]
}

export function getCardLabel(color: DistrictColor, isHidden: boolean): string {
  if (isHidden) {
    return `Neighborhood card (hidden)\nAt the end of the game, this player scores ${COLOR_MISSION_SCORE} Prestige Points for each neighborhood of the appropriate type.`
  }

  const colorLabel = {
    [DistrictColor.BLUE]: "Administration",
    [DistrictColor.GRAY]: "Industrial",
    [DistrictColor.GREEN]: "Lodgings",
    [DistrictColor.ORANGE]: "Park",
    [DistrictColor.RED]: "Mall",
  }[color]

  return `Neighborhood card - ${colorLabel}\nAt the end of the game, you score ${COLOR_MISSION_SCORE} Prestige Points for each '${colorLabel}' neighborhood you have constructed on.`
}

const MetropolysMissionColorCard = ({
  color,
  isHidden,
  ...props
}: MetropolysMissionColorCardProps) => (
  <img
    src={getCardImage(color, isHidden)}
    title={getCardLabel(color, isHidden)}
    {...props}
  />
)

export default MetropolysMissionColorCard
