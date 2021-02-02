import { PlayerId } from "common/model/GameStateBasic"

import { MetropolysAction } from "./model/MetropolysAction"
import { MetropolysContext } from "./model/MetropolysContext"

function resolvePlayerBid(
  ctx: MetropolysContext,
  playerId: PlayerId,
  district: number,
  height: number
) {
  ctx.updateState({
    bids: {
      $push: [
        {
          district,
          height,
          playerId,
        },
      ],
    },
  })
  ctx.updatePlayer(playerId, {
    ready: { $set: true },
  })
}

function resolvePlayerPass(ctx: MetropolysContext, playerId: PlayerId) {
  ctx.updatePlayer(playerId, {
    pass: { $set: true },
    ready: { $set: true },
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
