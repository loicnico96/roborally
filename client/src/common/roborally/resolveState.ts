import { FeatureType } from "./model/BoardData"
import { GamePhase } from "./model/RoborallyState"
import { resolveCheckpoints } from "./resolveCheckpoints"
import { resolveConveyors } from "./resolveConveyors"
import { resolveCrushers } from "./resolveCrushers"
import { resolveGears } from "./resolveGears"
// import { resolveCrushers } from "./resolveCrushers"
import {
  checkDamage,
  resolveBoardLasers,
  resolvePlayerLasers,
} from "./resolveLasers"
import { resolvePlayerActions } from "./resolvePlayerActions"
import { resolvePushers } from "./resolvePushers"
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
  const { features } = ctx.getBoard()

  await setGamePhase(ctx, GamePhase.RESOLVE_PLAYERS)
  await resolvePlayerActions(ctx, sequence)

  if (features.includes(FeatureType.CONVEYOR_FAST)) {
    await setGamePhase(ctx, GamePhase.RESOLVE_CONVEYORS_FAST)
    await resolveConveyors(ctx, true)
  }

  if (features.includes(FeatureType.CONVEYOR)) {
    await setGamePhase(ctx, GamePhase.RESOLVE_CONVEYORS)
    await resolveConveyors(ctx)
  }

  if (features.includes(FeatureType.PUSHER)) {
    await setGamePhase(ctx, GamePhase.RESOLVE_PUSHERS)
    await resolvePushers(ctx, sequence)
  }

  if (features.includes(FeatureType.CRUSHER)) {
    await setGamePhase(ctx, GamePhase.RESOLVE_CRUSHERS)
    await resolveCrushers(ctx, sequence)
  }

  if (features.includes(FeatureType.GEAR)) {
    await setGamePhase(ctx, GamePhase.RESOLVE_GEARS)
    await resolveGears(ctx)
  }

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
