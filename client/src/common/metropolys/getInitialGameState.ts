import { PlayerId } from "common/model/GameStateBasic"
import { UserInfo } from "common/model/UserInfo"
import { shuffle } from "common/utils/arrays"
import { enumValues } from "common/utils/enums"

import {
  getAvailableTokens,
  getAvailableDistricts,
  PlayerCount,
  isTokenAssignable,
  getBuildingCount,
  DistrictColor,
  MissionShape,
} from "./model/constants"
import { MetropolysPlayer } from "./model/MetropolysPlayer"
import { District, MetropolysState } from "./model/MetropolysState"
import { Token } from "./model/Token"

function getInitialBuildings(): boolean[] {
  return Array<boolean>(getBuildingCount()).fill(true)
}

function getInitialDistricts(playerCount: PlayerCount): District[] {
  const availableDistricts = shuffle(getAvailableDistricts(playerCount))
  const availableTokens = shuffle(getAvailableTokens(playerCount))

  const districts = Array(availableDistricts.length).fill({})

  // Filter out districts that cannot be assigned tokens
  const assignableDistricts = availableDistricts.filter(isTokenAssignable)

  // Assign tokens randomly
  availableTokens.forEach((token, index) => {
    districts[assignableDistricts[index]] = { token }
  })

  return districts
}

export function getInitialPlayerState(
  playerName: string,
  playerColor: DistrictColor,
  missionShape: MissionShape,
  isStartingPlayer: boolean
): MetropolysPlayer {
  return {
    buildings: getInitialBuildings(),
    color: playerColor,
    name: playerName,
    pass: false,
    ready: !isStartingPlayer,
    shape: missionShape,
    tokens: enumValues(Token).reduce(
      (result, token) =>
        Object.assign(result, {
          [token]: 0,
        }),
      {} as Record<Token, number>
    ),
  }
}

export function getInitialGameState(
  playerOrder: PlayerId[],
  playerInfos: Record<PlayerId, UserInfo>
): MetropolysState {
  const startingPlayerId = playerOrder[0]
  const playerCount = playerOrder.length as PlayerCount
  const playerColors = shuffle(enumValues(DistrictColor))
  const missionShapes = shuffle(enumValues(MissionShape))

  return {
    bids: [],
    currentPlayer: startingPlayerId,
    districts: getInitialDistricts(playerCount),
    lastRuins: null,
    mostMetro: null,
    playerOrder,
    players: playerOrder.reduce<Record<PlayerId, MetropolysPlayer>>(
      (players, playerId, playerIndex) =>
        Object.assign(players, {
          [playerId]: getInitialPlayerState(
            playerInfos[playerId].name,
            playerColors[playerIndex],
            missionShapes[playerIndex],
            playerId === startingPlayerId
          ),
        }),
      {}
    ),
    turn: 0,
  }
}
