import { GameStateBasic, PlayerId } from "common/model/GameStateBasic"
import { UserInfo } from "common/model/UserInfo"

import { getInitialPlayerState, MetropolysPlayer } from "./MetropolysPlayer"
import { Token } from "./Token"

export const DISTRICT_COUNT = 55

export type DistrictBuilding = {
  height: number
  playerId: PlayerId
}

export type District = {
  building?: DistrictBuilding
  token?: Token
}

export type Bid = {
  building: number
  height: number
  playerId: PlayerId
}

export type MetropolysState = GameStateBasic & {
  bids: Bid[]
  currentPlayer: PlayerId
  districts: District[]
  players: Record<PlayerId, MetropolysPlayer>
}

export function getInitialGameState(
  playerOrder: PlayerId[],
  playerInfos: Record<PlayerId, UserInfo>
): MetropolysState {
  const startingPlayerId = playerOrder[0]

  return {
    bids: [],
    currentPlayer: startingPlayerId,
    districts: Array<District>(DISTRICT_COUNT).fill({}),
    playerOrder,
    players: playerOrder.reduce(
      (players, playerId) =>
        Object.assign(players, {
          [playerId]: getInitialPlayerState(
            playerInfos[playerId].name,
            playerId === startingPlayerId
          ),
        }),
      {} as Record<PlayerId, MetropolysPlayer>
    ),
    turn: 0,
  }
}
