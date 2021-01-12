import { PlayerId } from "common/model/GameStateBasic"
import { merge } from "common/utils/objects"

import { MetropolysContext } from "./MetropolysContext"
import { MetropolysPlayer } from "./model/MetropolysPlayer"
import { Bid, MetropolysState } from "./model/MetropolysState"
import { TokenType } from "./model/TokenType"

const MAX_HEIGHT = 12

function getBids(state: MetropolysState): Bid[] {
  return state.bids
}

function getCurrentPlayerId(state: MetropolysState): PlayerId {
  return state.currentPlayer
}

function getHighestBid(state: MetropolysState): Bid | null {
  const bids = getBids(state)
  return bids[bids.length - 1] ?? null
}

function isPlayerCanPlay(player: MetropolysPlayer, minHeight: number) {
  if (player.pass) {
    return false
  } else {
    return player.buildings.some((available, height) => available && height >= minHeight)
  }
}

function getNextPlayerId(
  ctx: MetropolysContext,
  playerId: PlayerId,
  highestBid: Bid
): PlayerId {
  const playerIds = ctx.getPlayerOrder()
  const playerCount = playerIds.length
  const minHeight = highestBid.height + 1

  const playerIndex = playerIds.indexOf(playerId)
  for (let i = 1; i < playerCount; i++) {
    const nextPlayerIndex = (playerIndex + i) % playerCount
    const nextPlayerId = playerIds[nextPlayerIndex]
    const nextPlayer = ctx.getPlayer(nextPlayerId)
    if (isPlayerCanPlay(nextPlayer, minHeight)) {
      return nextPlayerId
    }
  }

  return playerId
}

export async function nextTurn(ctx: MetropolysContext, playerId: PlayerId) {
  ctx.updateState({
    players: {
      [playerId]: {
        ready: { $set: false },
      },
    },
  })
}

export async function nextRound(
  ctx: MetropolysContext,
  startingPlayerId: PlayerId
) {
  ctx.updateState({ turn: turn => turn + 1 })
  ctx.updatePlayers(player => merge(player, { pass: false }))
  await nextTurn(ctx, startingPlayerId)
}

export async function finishGame(ctx: MetropolysContext) {
  // TODO Determine winner
  ctx.win([])
}

export async function gainToken(
  ctx: MetropolysContext,
  playerId: PlayerId,
  token: TokenType
) {
  ctx.updatePlayer(playerId, {
    tokens: {
      [token]: (count = 0) => count + 1,
    },
  })

  // TODO Check for most metro/ruins tokens
}

export async function finishRound(ctx: MetropolysContext, highestBid: Bid) {
  const { district, height, playerId } = highestBid

  ctx.updateState({
    bids: { $set: [] },
    districts: {
      [district]: {
        building: {
          $set: {
            height,
            playerId,
          },
        },
      },
    },
  })

  ctx.updatePlayer(playerId, {
    buildings: {
      [height]: { $set: false },
    },
  })

  const { token } = ctx.getState().districts[district]
  if (token !== undefined) {
    await gainToken(ctx, playerId, token)
  }

  const player = ctx.getPlayer(playerId)
  if (!player.buildings.some(available => available)) {
    await finishGame(ctx)
  } else {
    await nextRound(ctx, playerId)
  }
}

export async function finishTurn(
  ctx: MetropolysContext,
  playerId: PlayerId,
  highestBid: Bid
) {
  if (highestBid.height === MAX_HEIGHT) {
    return finishRound(ctx, highestBid)
  }

  // Check if no adjacent available district

  const nextPlayerId = getNextPlayerId(ctx, playerId, highestBid)

  if (nextPlayerId === playerId) {
    return finishRound(ctx, highestBid)
  } else {
    return nextTurn(ctx, nextPlayerId)
  }
}

export async function resolveState(ctx: MetropolysContext) {
  if (ctx.allPlayersReady()) {
    const state = ctx.getState()
    const playerId = getCurrentPlayerId(state)
    const highestBid = getHighestBid(state)
    if (highestBid === null) {
      throw Error("Inconsistent state")
    }

    await finishTurn(ctx, playerId, highestBid)
  }
}
