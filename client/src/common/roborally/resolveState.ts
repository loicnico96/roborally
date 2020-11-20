import { GamePhase } from "./model/RoborallyState"
import { resolveCheckpoints } from "./resolveCheckpoints"
import { resolveConveyors } from "./resolveConveyors"
import { resolveGears } from "./resolveGears"
// import { resolveCrushers } from "./resolveCrushers"
import {
  checkDamage,
  resolveBoardLasers,
  resolvePlayerLasers,
} from "./resolveLasers"
import { resolvePlayerActions } from "./resolvePlayerActions"
import { resolveRepairs } from "./resolveRepairs"
import { resolveRespawn } from "./resolveRespawn"
import { resolveVirtualPlayers } from "./resolveVirtualPlayers"
import { RoborallyContext } from "./RoborallyContext"
import { startNextTurn } from "./startNextTurn"

const SEQUENCE_COUNT = 5

async function setGamePhase(ctx: RoborallyContext, phase: GamePhase) {
  ctx.mergeState({ currentPlayer: null, phase })
  await ctx.post()
}

async function resolveTurnSequence(ctx: RoborallyContext, sequence: number) {
  await setGamePhase(ctx, GamePhase.RESOLVE_PLAYERS)
  await resolvePlayerActions(ctx, sequence)

  // TODO Enable when corresponding board is implemented
  // await setGamePhase(ctx, GamePhase.RESOLVE_CONVEYORS_FAST)
  // await resolveConveyors(ctx, true)

  await setGamePhase(ctx, GamePhase.RESOLVE_CONVEYORS)
  await resolveConveyors(ctx)

  await setGamePhase(ctx, GamePhase.RESOLVE_GEARS)
  await resolveGears(ctx)

  // TODO Enable when corresponding board is implemented
  // await setGamePhase(ctx, GamePhase.RESOLVE_CRUSHERS)
  // await resolveCrushers(ctx, sequence)

  await setGamePhase(ctx, GamePhase.RESOLVE_LASERS)
  await resolveBoardLasers(ctx)
  await resolvePlayerLasers(ctx)
  await checkDamage(ctx)

  await setGamePhase(ctx, GamePhase.RESOLVE_CHECKPOINTS)
  await resolveRepairs(ctx)
  await resolveCheckpoints(ctx)
}

async function resolveTurn(ctx: RoborallyContext) {
  for (let sequence = 0; sequence < SEQUENCE_COUNT; sequence++) {
    ctx.mergeState({ sequence })
    await ctx.post()
    await resolveTurnSequence(ctx, sequence)
  }

  await resolveVirtualPlayers(ctx)
  await resolveRespawn(ctx)
  await startNextTurn(ctx)
}

export async function resolveState(ctx: RoborallyContext) {
  if (ctx.getPhase() === GamePhase.PROGRAM && ctx.allPlayersReady()) {
    await resolveTurn(ctx)
  }
}
