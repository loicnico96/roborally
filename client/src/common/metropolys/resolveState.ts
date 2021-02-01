import { PlayerId } from "common/model/GameStateBasic"
import { merge } from "common/utils/objects"

import { MetropolysContext } from "./MetropolysContext"
import { Bid, getHighestBid, MetropolysState } from "./model/MetropolysState"
import { Token } from "./model/Token"

function canBeNextPlayer(
  gameState: MetropolysState,
  playerId: PlayerId,
  highestBid: Bid
): boolean {
  const player = gameState.players[playerId]
  if (player.pass) {
    return false
  }

  return player.buildings.some(
    (available, height) => available && height > highestBid.height
  )
}

function getNextPlayer(
  gameState: MetropolysState,
  playerId: PlayerId,
  highestBid: Bid
): PlayerId | undefined {
  if (highestBid.height === 12) {
    return undefined
  }

  // District adjacency check

  const { playerOrder } = gameState
  const currentPlayerIndex = playerOrder.indexOf(playerId)
  for (let i = 1; i < playerOrder.length; i++) {
    const nextPlayerIndex = (currentPlayerIndex + i) % playerOrder.length
    const nextPlayerId = playerOrder[nextPlayerIndex]
    if (canBeNextPlayer(gameState, playerId, highestBid)) {
      return nextPlayerId
    }
  }

  return undefined
}

async function nextPlayerTurn(ctx: MetropolysContext, nextPlayerId: PlayerId) {
  ctx.updateState({
    currentPlayer: {
      $set: nextPlayerId,
    },
  })
  ctx.updatePlayer(nextPlayerId, {
    ready: {
      $set: false,
    },
  })
}

async function nextRound(ctx: MetropolysContext, startingPlayerId: PlayerId) {
  ctx.updateState({
    turn: turn => turn + 1,
  })
  ctx.updatePlayers((player, playerId) =>
    merge(player, {
      pass: false,
      ready: playerId !== startingPlayerId,
    })
  )
}

async function gainToken(
  ctx: MetropolysContext,
  playerId: PlayerId,
  token: Token
) {
  ctx.updatePlayer(playerId, {
    tokens: {
      [token]: (count = 0) => count + 1,
    },
  })

  if (token === Token.RUINS) {
    ctx.updateState({
      lastRuins: {
        $set: playerId,
      },
    })
  }

  if (token === Token.METRO) {
    // Check most metro token
  }
}

async function winBid(ctx: MetropolysContext, bid: Bid) {
  const { district, height, playerId } = bid

  ctx.updatePlayer(playerId, {
    buildings: {
      [height]: {
        $set: false,
      },
    },
  })

  ctx.updateState({
    bids: {
      $set: [],
    },
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

  const {token} = ctx.getState().districts[district]
  if (token !== undefined) {
    await gainToken(ctx, playerId, token)
  }

  if (ctx.getState().players[playerId].buildings.some(Boolean)) {
    await nextRound(ctx, playerId)
  } else {
    // End of the game
    // Calculate scores and determine correct winner
    ctx.win([playerId])
  }
}

export async function resolveState(ctx: MetropolysContext) {
  const gameState = ctx.getState()
  const turnPlayerId = gameState.currentPlayer
  if (gameState.players[turnPlayerId].ready) {
    const highestBid = getHighestBid(gameState)
    if (highestBid === undefined) {
      throw Error("Inconsistent game state")
    }

    const nextPlayerId = getNextPlayer(gameState, turnPlayerId, highestBid)
    if (nextPlayerId !== undefined) {
      await nextPlayerTurn(ctx, nextPlayerId)
    } else {
      await winBid(ctx, highestBid)
    }
  }
}
