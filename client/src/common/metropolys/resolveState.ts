import { PlayerId } from "common/model/GameStateBasic"
import { merge } from "common/utils/objects"

import { getPlayerScore } from "./model/getPlayerScore"
import { MetropolysContext } from "./model/MetropolysContext"
import { getTokenCount } from "./model/MetropolysPlayer"
import {
  Bid,
  getMostMetroCount,
  isLastRuinsPlayer,
  isMostMetroPlayer,
} from "./model/MetropolysState"
import { Token } from "./model/Token"

function getPlayerScores(ctx: MetropolysContext): Record<PlayerId, number> {
  return ctx.getPlayerOrder().reduce((scores, playerId) => {
    scores[playerId] = getPlayerScore(ctx.getState(), playerId)
    return scores
  }, {} as Record<PlayerId, number>)
}

async function endGame(ctx: MetropolysContext) {
  const playerScores = getPlayerScores(ctx)
  const highestScore = Math.max(...Object.values(playerScores))
  const winners = ctx.getPlayerOrder().filter(playerId => 
     playerScores[playerId] === highestScore
    // TODO: Tiebreaker rules
  )

  ctx.win(winners)
}

async function nextPlayerTurn(ctx: MetropolysContext, playerId: PlayerId) {
  // Change turn player
  ctx.updateState({ currentPlayer: { $set: playerId } })
  // Set next player to make an action
  ctx.updatePlayer(playerId, { ready: { $set: false } })
}

async function nextRound(ctx: MetropolysContext, playerId: PlayerId) {
  // Increase turn counter
  ctx.updateState({ turn: turn => turn + 1 })
  // Clear the "passed" status from all players
  ctx.updatePlayers(player => merge(player, { pass: false }))
  // Set next player to make an action
  ctx.updatePlayer(playerId, { ready: { $set: false } })
}

async function gainToken(
  ctx: MetropolysContext,
  playerId: PlayerId,
  token: Token
) {
  const player = ctx.getPlayer(playerId)
  const state = ctx.getState()

  const newCount = getTokenCount(player, token) + 1

  // Increase token count
  ctx.updatePlayer(playerId, {
    tokens: {
      [token]: {
        $set: newCount,
      },
    },
  })

  // Check if the "Metro" card should move
  if (token === Token.METRO && !isMostMetroPlayer(state, playerId)) {
    const mostMetroCount = getMostMetroCount(state)
    if (newCount > mostMetroCount) {
      ctx.updateState({
        mostMetro: {
          $set: playerId,
        },
      })
    }
  }

  // Check if the "Ruins" card should move
  if (token === Token.RUINS && !isLastRuinsPlayer(state, playerId)) {
    ctx.updateState({
      lastRuins: {
        $set: playerId,
      },
    })
  }
}

async function winBid(ctx: MetropolysContext, bid: Bid) {
  const { district, height, playerId } = bid

  // Resolve the bid:
  // - Clear all other bids
  // - Mark the corresponding district as built
  // - Mark the corresponding building as used for that player
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
    players: {
      [playerId]: {
        buildings: {
          [height]: {
            $set: false,
          },
        },
      },
    },
  })

  // Check if there is a token on the district
  const { token } = ctx.getDistrict(district)
  if (token !== undefined) {
    await gainToken(ctx, playerId, token)
  }

  // Check end-of-game trigger
  if (ctx.isEndOfGame(playerId)) {
    // End the game (calculate scores and determine winner)
    await endGame(ctx)
  } else {
    // End the round
    await nextRound(ctx, playerId)
  }
}

export async function resolveState(ctx: MetropolysContext) {
  if (ctx.allPlayersReady()) {
    const highestBid = ctx.getHighestBid()

    // First round action should always be a bid
    if (highestBid === undefined) {
      throw Error("Inconsistent game state")
    }

    const nextPlayerId = ctx.getNextPlayerId(highestBid)
    if (nextPlayerId !== undefined) {
      // Another player is able to outbid, switch to their turn
      await nextPlayerTurn(ctx, nextPlayerId)
    } else {
      // Otherwise, current player wins the bid
      await winBid(ctx, highestBid)
    }
  }
}
