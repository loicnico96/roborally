import { PlayerId } from "common/model/GameStateBasic"
import { shuffle } from "common/utils/arrays"
import { enumValues } from "common/utils/enums"

import {
  BUILDING_COUNT,
  BoardColor,
  BoardShape,
  DISTRICT_COUNT,
} from "./model/board"
import { MetropolysPlayer } from "./model/MetropolysPlayer"
import { MetropolysState } from "./model/MetropolysState"

export function getInitialPlayerState(
  isStartingPlayer: boolean,
  color: BoardColor,
  shape: BoardShape
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
  const colors = shuffle(enumValues(BoardColor))
  const shapes = shuffle(enumValues(BoardShape))

  // TODO: Use only some sectors if less players
  // TODO: Place tokens

  return {
    bids: [],
    districts: Array(DISTRICT_COUNT).fill({}),
    currentPlayer: playerIds[0],
    mostMetro: null,
    lastRuins: null,
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
