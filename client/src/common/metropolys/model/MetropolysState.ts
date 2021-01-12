import { GameStateBasic, PlayerId } from "common/model/GameStateBasic"

import { MetropolysPlayer } from "./MetropolysPlayer"
import { TokenType } from "./TokenType"

export type Bid = {
  district: number
  height: number
  playerId: PlayerId
}

export type DistrictBuilding = {
  height: number
  playerId: PlayerId
}

export type District = {
  building?: DistrictBuilding
  token?: TokenType
}

export type MetropolysState = GameStateBasic<MetropolysPlayer> & {
  bids: Bid[]
  districts: District[]
  currentPlayer: PlayerId
  mostMetro: PlayerId | null
  mostRuins: PlayerId | null
}
