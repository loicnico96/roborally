import { mapValues, merge } from "common/utils/objects"

import { Position } from "./model/Position"
import {
  getLockedProgram,
  isAbleToRespawn,
  respawnPlayer,
  RoborallyPlayer,
} from "./model/RoborallyPlayer"
import { GamePhase } from "./model/RoborallyState"
import { RoborallyContext, RoborallyEvent } from "./RoborallyContext"

function applyPowerDown(player: RoborallyPlayer): RoborallyPlayer {
  return merge(player, {
    damage: player.downNext ? 0 : player.damage,
    down: player.downNext,
    downNext: false,
  })
}

function cleanUpProgram(player: RoborallyPlayer): RoborallyPlayer {
  return merge(player, {
    cards: [],
    program: getLockedProgram(player),
    ready: false,
  })
}

function turnEndPlayer(player: RoborallyPlayer, checkpoints: Position[]) {
  if (isAbleToRespawn(player)) {
    return respawnPlayer(player, checkpoints)
  } else {
    return cleanUpProgram(applyPowerDown(player))
  }
}

export async function resolveTurnEnd(ctx: RoborallyContext) {
  ctx.updateState(gameState => {
    const checkpoints = ctx.getCheckpoints()
    const deckCards = new Set(gameState.deck)

    const players = mapValues(gameState.players, player => {
      const playerNext = turnEndPlayer(player, checkpoints)

      for (const card of player.cards) {
        if (!playerNext.program.includes(card)) {
          deckCards.add(card)
        }
      }

      return playerNext
    })

    return merge(gameState, {
      deck: Array.from(deckCards),
      phase: GamePhase.STANDBY,
      players,
      turn: gameState.turn + 1,
    })
  })
  await ctx.post(RoborallyEvent.RESPAWN)
}
