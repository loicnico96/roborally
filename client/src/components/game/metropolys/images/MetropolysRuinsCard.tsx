import React from "react"

import MetropolysRuinsCardImageUrl from "assets/metropolys/cards/cardRuins.jpg"
import { RUINS_CARD_SCORE } from "common/metropolys/model/constants"
import { ImageProps } from "utils/dom"

export type MetropolysRuinsCardProps = Omit<ImageProps, "src">

const MetropolysRuinsCard = (props: MetropolysRuinsCardProps) => (
  <img
    src={MetropolysRuinsCardImageUrl}
    title={`Archeological site card\nThis card is worth ${RUINS_CARD_SCORE} Prestige Points at the end of the game.`}
    {...props}
  />
)

export default MetropolysRuinsCard
