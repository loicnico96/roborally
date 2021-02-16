import { PlayerId } from "common/model/GameStateBasic"
import { merge } from "common/utils/objects"

import { getPlayerScore } from "./model/getPlayerScore"
import { MetropolysContext } from "./model/MetropolysContext"
import { getTokenCount } from "./model/MetropolysPlayer"
import {
  Bid,
  getLastRuinsPlayerId,
  getMostMetroCount,
  getMostMetroPlayerId,
} from "./model/MetropolysState"
import { Token } from "./model/Token"

function nextPlayerTurn(ctx: MetropolysContext, playerId: PlayerId) {
  ctx.mergeState({ currentPlayer: playerId })
  ctx.updatePlayer(playerId, player => merge(player, { ready: false }))
}

function nextRound(ctx: MetropolysContext, startingPlayerId: PlayerId) {
  ctx.updateState({ turn: turn => turn + 1 })
  nextPlayerTurn(ctx, startingPlayerId)
}

function endGame(ctx: MetropolysContext) {
  let highestPlayerIds: PlayerId[] = []
  let highestScore: number | null = null

  ctx.getPlayerOrder().forEach(playerId => {
    const playerScore = getPlayerScore(ctx.getState(), playerId, true)
    if (highestScore === null || playerScore > highestScore) {
      highestPlayerIds = [playerId]
      highestScore = playerScore
    } else if (playerScore === highestScore) {
      highestPlayerIds.push(playerId)
    }
  })

  ctx.win(highestPlayerIds)
}

function gainToken(
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

  if (token === Token.METRO && getMostMetroPlayerId(state) !== playerId) {
    const mostMetroCount = getMostMetroCount(state)
    if (newCount > mostMetroCount) {
      ctx.updateState({
        mostMetro: {
          $set: playerId,
        },
      })
    }
  }

  if (token === Token.RUINS && getLastRuinsPlayerId(state) !== playerId) {
    ctx.updateState({
      lastRuins: {
        $set: playerId,
      },
    })
  }
}

function winBid(ctx: MetropolysContext, bid: Bid) {
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
  })

  ctx.updatePlayers(player => merge(player, { pass: false }))

  ctx.updatePlayer(playerId, {
    buildings: {
      [height]: {
        $set: false,
      },
    },
  })

  const token = ctx.getDistrict(district)?.token
  if (token !== undefined) {
    gainToken(ctx, playerId, district, token)
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
      nextPlayerTurn(ctx, nextPlayerId)
    } else {
      winBid(ctx, highestBid)

      if (ctx.isEndOfGame()) {
        endGame(ctx)
      } else {
        nextRound(ctx, highestBid.playerId)
      }
    }
  }
}
