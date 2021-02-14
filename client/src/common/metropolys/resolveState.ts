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

async function endGame(ctx: MetropolysContext) {
  const playerScores = ctx.getPlayerOrder().reduce<Record<PlayerId, number>>(
    (scores, playerId) =>
      Object.assign(scores, {
        [playerId]: getPlayerScore(ctx.getState(), playerId, true),
      }),
    {}
  )

  const highestScore = Math.max(...Object.values(playerScores))
  const winners = ctx.getPlayerOrder().filter(
    playerId => playerScores[playerId] === highestScore
    // TODO: Tiebreaker rules
  )

  ctx.win(winners)
}

async function nextPlayerTurn(ctx: MetropolysContext, playerId: PlayerId) {
  ctx.updateState({ currentPlayer: { $set: playerId } })
  ctx.updatePlayer(playerId, { ready: { $set: false } })
}

async function nextRound(ctx: MetropolysContext, playerId: PlayerId) {
  ctx.updateState({ turn: turn => turn + 1 })
  ctx.updatePlayers(player => merge(player, { pass: false }))
  await nextPlayerTurn(ctx, playerId)
}

async function gainToken(
  ctx: MetropolysContext,
  playerId: PlayerId,
  district: number,
  token: Token
) {
  const player = ctx.getPlayer(playerId)
  const state = ctx.getState()

  const newCount = getTokenCount(player, token) + 1

  ctx.updateState({
    districts: {
      [district]: {
        $unset: ["token"],
      },
    },
  })

  ctx.updatePlayer(playerId, {
    tokens: {
      [token]: {
        $set: newCount,
      },
    },
  })

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

  const token = ctx.getDistrict(district)?.token
  if (token !== undefined) {
    await gainToken(ctx, playerId, district, token)
  }

  if (ctx.isEndOfGame(playerId)) {
    await endGame(ctx)
  } else {
    await nextRound(ctx, playerId)
  }
}

export async function resolveState(ctx: MetropolysContext) {
  if (ctx.allPlayersReady()) {
    const highestBid = ctx.getHighestBid()

    if (highestBid === undefined) {
      throw Error("Inconsistent game state")
    }

    const nextPlayerId = ctx.getNextPlayerId(highestBid)
    if (nextPlayerId !== undefined) {
      await nextPlayerTurn(ctx, nextPlayerId)
    } else {
      await winBid(ctx, highestBid)
    }
  }
}
