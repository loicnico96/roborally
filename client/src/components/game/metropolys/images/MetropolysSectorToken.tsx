import React from "react"

import MetropolysTokenSector from "assets/metropolys/tokenSector.png"
import { SECTOR_SCORE } from "common/metropolys/model/constants"
import { ImageProps } from "utils/dom"

export type MetropolysSectorTokenProps = Omit<ImageProps, "src">

const MetropolysSectorToken = ({ ...props }: MetropolysSectorTokenProps) => (
  <img
    src={MetropolysTokenSector}
    title={`District token\nFor each district, the player with the most tall buildings (10-13) gets a 'District' token. Each token gives ${SECTOR_SCORE} Prestige Points at the end of the game.\nIn case of tie, compare the number of medium buildings (height 6-9), then small buildings (height 1-5).`}
    {...props}
  />
)

export default MetropolysSectorToken
