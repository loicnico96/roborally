import React from "react"

import MetropolysTokenFancy from "assets/metropolys/tokens/tokenFancy.png"
import MetropolysTokenMetro from "assets/metropolys/tokens/tokenMetro.png"
import MetropolysTokenRuins from "assets/metropolys/tokens/tokenRuins.png"
import {
  FANCY_TOKEN_SCORE,
  METRO_CARD_SCORE,
  METRO_TOKEN_SCORE,
  RUINS_CARD_SCORE,
  RUINS_TOKEN_SCORE,
} from "common/metropolys/model/constants"
import { Token } from "common/metropolys/model/Token"
import { ImageProps } from "utils/dom"

export type MetropolysTokenProps = Omit<ImageProps, "src"> & {
  token: Token
}

export function getTokenImage(token: Token): string {
  return {
    [Token.FANCY]: MetropolysTokenFancy,
    [Token.METRO]: MetropolysTokenMetro,
    [Token.RUINS]: MetropolysTokenRuins,
  }[token]
}

export function getTokenLabel(token: Token): string {
  return {
    [Token.FANCY]: `Trendy neighborhood\nEach 'Trendy neighborhood' token gives ${FANCY_TOKEN_SCORE} Prestige Points.`,
    [Token.METRO]: `Subway\nEach 'Subway' token gives ${METRO_TOKEN_SCORE} Prestige Point. The player with the most of these tokens gets the 'Subway' card, which is worth an additional ${METRO_CARD_SCORE} Prestige Points at the end of the game. (If several players have the same number of tokens, the current owner of the card keeps it.)`,
    [Token.RUINS]: `Archeological site\nEach 'Archeological site' token gives ${RUINS_TOKEN_SCORE} Prestige Point. The last player to take one of these tokens gets the 'Archeological site' card, which is worth an additional ${RUINS_CARD_SCORE} Prestige Points at the end of the game.`,
  }[token]
}

const MetropolysToken = ({ token, ...props }: MetropolysTokenProps) => (
  <img src={getTokenImage(token)} title={getTokenLabel(token)} {...props} />
)

export default MetropolysToken
