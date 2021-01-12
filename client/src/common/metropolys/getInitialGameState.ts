import { PlayerId } from "common/model/GameStateBasic"
import { shuffle } from "common/utils/arrays"
import { enumValues } from "common/utils/enums"

import {
  MetropolysPlayer,
  MissionColor,
  MissionShape,
} from "./model/MetropolysPlayer"
import { MetropolysState } from "./model/MetropolysState"

const BUILDING_COUNT = 13
const DISTRICT_COUNT = 64 // To be determined

export function getInitialPlayerState(
  isStartingPlayer: boolean,
  color: MissionColor,
  shape: MissionShape
): MetropolysPlayer {
  return {
    buildings: Array(BUILDING_COUNT).fill(true),
    color,
    pass: false,
    ready: !isStartingPlayer,
    shape,
    tokens: {},
  }
}

export async function getInitialGameState(
  playerIds: PlayerId[]
): Promise<MetropolysState> {
  const colors = shuffle(enumValues(MissionColor))
  const shapes = shuffle(enumValues(MissionShape))

  return {
    bids: [],
    districts: Array(DISTRICT_COUNT).fill({}),
    currentPlayer: playerIds[0],
    mostMetro: null,
    mostRuins: null,
    playerOrder: playerIds,
    players: playerIds.reduce((players, playerId, playerIndex) => {
      const isStartingPlayer = playerIndex === 0
      const color = colors[playerIndex]
      const shape = shapes[playerIndex]
      players[playerId] = getInitialPlayerState(isStartingPlayer, color, shape)
      return players
    }, {} as Record<PlayerId, MetropolysPlayer>),
    turn: 0,
    winners: null,
  }
}
