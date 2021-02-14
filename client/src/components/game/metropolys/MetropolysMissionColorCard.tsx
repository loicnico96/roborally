import React from "react"

import MetropolysMissionColorCardBack from "assets/metropolys/missionColorBack.png"
import MetropolysMissionColorCardBlue from "assets/metropolys/missionColorBlue.jpg"
import MetropolysMissionColorCardGray from "assets/metropolys/missionColorGray.jpg"
import MetropolysMissionColorCardGreen from "assets/metropolys/missionColorGreen.jpg"
import MetropolysMissionColorCardOrange from "assets/metropolys/missionColorOrange.jpg"
import MetropolysMissionColorCardRed from "assets/metropolys/missionColorRed.jpg"
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
    return `Neighborhood card (hidden)\nThis players gains ${COLOR_MISSION_SCORE} Prestige Points for each neighborhood of the appropriate type.`
  }

  const colorLabel = {
    [DistrictColor.BLUE]: "Administration",
    [DistrictColor.GRAY]: "Industrial",
    [DistrictColor.GREEN]: "Lodgings",
    [DistrictColor.ORANGE]: "Park",
    [DistrictColor.RED]: "Mall",
  }[color]

  return `Neighborhood card - ${colorLabel}\nYou gain ${COLOR_MISSION_SCORE} Prestige Points for each '${colorLabel}' neighborhood you build on.`
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
