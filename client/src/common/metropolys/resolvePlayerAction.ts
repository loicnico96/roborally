import { PlayerId } from "common/model/GameStateBasic"

import { MetropolysContext } from "./MetropolysContext"
import { MetropolysAction } from "./MetropolysSettings"
import { Bid } from "./model/MetropolysState"

export function resolvePlayerBid(
  ctx: MetropolysContext,
  playerId: PlayerId,
  district: number,
  height: number
) {
  const bid: Bid = {
    district,
    height,
    playerId,
  }

  ctx.updateState({
    bids: {
      $push: [bid],
    },
    players: {
      [playerId]: {
        ready: { $set: true },
      },
    },
  })
}

export function resolvePlayerPass(ctx: MetropolysContext, playerId: PlayerId) {
  ctx.updateState({
    players: {
      [playerId]: {
        pass: { $set: true },
        ready: { $set: true },
      },
    },
  })
}

export async function resolvePlayerAction(
  ctx: MetropolysContext,
  playerId: PlayerId,
  action: MetropolysAction
) {
  if (action.pass) {
    resolvePlayerPass(ctx, playerId)
  } else {
    resolvePlayerBid(ctx, playerId, action.district, action.height)
  }
}
