import { PlayerId } from "common/model/GameStateBasic"
import { findKey, merge } from "common/utils/objects"

import { MetropolysContext } from "./MetropolysContext"
import { isAdjacent, MAX_HEIGHT } from "./model/board"
import { MetropolysPlayer } from "./model/MetropolysPlayer"
import { Bid, getScore, isAvailable } from "./model/MetropolysState"
import { TokenType } from "./model/TokenType"

function isPlayerCanPlay(player: MetropolysPlayer, minHeight: number) {
  if (player.pass) {
    return false
  } else {
    return player.buildings.some(
      (available, height) => available && height >= minHeight
    )
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
  const scores = ctx.getPlayerOrder().reduce((result, playerId) => {
    result[playerId] = getScore(ctx.getState(), playerId)
    return result
  }, {} as Record<PlayerId, number>)

  const highestScore = Math.max(...Object.values(scores))
  const highestScorePlayerId = findKey(scores, score => score === highestScore)

  // TODO Tiebreaker

  if (highestScorePlayerId === undefined) {
    throw Error("Inconsistent state")
  }

  ctx.win([highestScorePlayerId])
}

export async function gainToken(
  ctx: MetropolysContext,
  playerId: PlayerId,
  token: TokenType
) {
  const { tokens } = ctx.getPlayer(playerId)
  const tokenCount = tokens[token] ?? 0

  ctx.updatePlayer(playerId, {
    tokens: {
      [token]: {
        $set: tokenCount + 1,
      },
    },
  })

  switch (token) {
    case TokenType.METRO: {
      if (ctx.getState().mostMetro !== playerId) {
        const mostMetroPlayer = ctx.findPlayer((otherPlayer, otherPlayerId) => {
          if (playerId !== otherPlayerId) {
            const otherTokenCount = otherPlayer.tokens[token] ?? 0
            return otherTokenCount > tokenCount
          } else {
            return false
          }
        })

        if (mostMetroPlayer === undefined) {
          ctx.mergeState({ mostMetro: playerId })
        }
      }
      break
    }

    case TokenType.RUINS: {
      if (ctx.getState().lastRuins !== playerId) {
        ctx.mergeState({ lastRuins: playerId })
      }
      break
    }

    default:
      break
  }
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

  const { token } = ctx.getDistrict(district)
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

  const isPossibleOutbid = ctx
    .getState()
    .districts.some(
      (_, index) =>
        isAdjacent(highestBid.district, index) &&
        isAvailable(ctx.getState(), index)
    )

  if (!isPossibleOutbid) {
    return finishRound(ctx, highestBid)
  }

  const nextPlayerId = getNextPlayerId(ctx, playerId, highestBid)

  if (nextPlayerId === playerId) {
    return finishRound(ctx, highestBid)
  } else {
    return nextTurn(ctx, nextPlayerId)
  }
}

export async function resolveState(ctx: MetropolysContext) {
  if (ctx.allPlayersReady()) {
    const playerId = ctx.getCurrentPlayerId()
    const highestBid = ctx.getHighestBid()
    if (highestBid === null) {
      throw Error("Inconsistent state")
    }

    await finishTurn(ctx, playerId, highestBid)
  }
}
