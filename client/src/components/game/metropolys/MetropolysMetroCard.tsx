import React from "react"

import MetropolysMetroCardImageUrl from "assets/metropolys/cardMetro.jpg"
import { METRO_CARD_SCORE } from "common/metropolys/model/constants"
import { ImageProps } from "utils/dom"

export type MetropolysMetroCardProps = Omit<ImageProps, "src">

const MetropolysMetroCard = (props: MetropolysMetroCardProps) => (
  <img
    src={MetropolysMetroCardImageUrl}
    title={`Subway card\nThis card is worth ${METRO_CARD_SCORE} Prestige Points at the end of the game.`}
    {...props}
  />
)

export default MetropolysMetroCard
