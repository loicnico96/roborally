import React from "react"

import MetropolysTokenFancy from "assets/metropolys/tokenFancy.png"
import MetropolysTokenMetro from "assets/metropolys/tokenMetro.png"
import MetropolysTokenRuins from "assets/metropolys/tokenRuins.png"
import { Token } from "common/metropolys/model/Token"

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

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
    [Token.FANCY]: "Trendy",
    [Token.METRO]: "Subway",
    [Token.RUINS]: "Archeological site",
  }[token]
}

const MetropolysToken = ({ token, ...props }: MetropolysTokenProps) => (
  <img src={getTokenImage(token)} title={getTokenLabel(token)} {...props} />
)

export default MetropolysToken
