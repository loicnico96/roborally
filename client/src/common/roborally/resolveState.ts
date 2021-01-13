import { FeatureType } from "./model/BoardData"
import { GamePhase } from "./model/RoborallyState"
import { resolveCheckpoints } from "./resolveCheckpoints"
import { resolveConveyors } from "./resolveConveyors"
import { resolveCrushers } from "./resolveCrushers"
import { resolveGears } from "./resolveGears"
import {
  checkDamage,
  resolveBoardLasers,
  resolvePlayerLasers,
} from "./resolveLasers"
import { checkHoles } from "./resolveMovement"
import { resolvePlayerActions } from "./resolvePlayerActions"
import { resolvePushers } from "./resolvePushers"
import { resolveRandomizers } from "./resolveRandomizers"
import { resolveRepairs } from "./resolveRepairs"
import { resolveTurnEnd } from "./resolveTurnEnd"
import { resolveVirtualPlayers } from "./resolveVirtualPlayers"
import { RoborallyContext, RoborallyEvent } from "./RoborallyContext"

const SEQUENCE_COUNT = 5

async function setGamePhase(ctx: RoborallyContext, phase: GamePhase) {
  ctx.mergeState({ currentPlayer: null, phase })
  await ctx.post(RoborallyEvent.CHANGE_PHASE)
}

async function resolveTurnSequence(ctx: RoborallyContext, sequence: number) {
  const { features } = ctx.getBoard()

  if (features.includes(FeatureType.TRAP)) {
    await setGamePhase(ctx, GamePhase.RESOLVE_TRAPS)
    await checkHoles(ctx)
  }

  if (features.includes(FeatureType.RANDOM)) {
    await setGamePhase(ctx, GamePhase.RESOLVE_RANDOMIZERS)
    await resolveRandomizers(ctx, sequence)
  }

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

  if (features.includes(FeatureType.REPAIR)) {
    await setGamePhase(ctx, GamePhase.RESOLVE_REPAIRS)
    await resolveRepairs(ctx)
  }

  await setGamePhase(ctx, GamePhase.RESOLVE_CHECKPOINTS)
  await resolveCheckpoints(ctx)
}

async function resolveTurn(ctx: RoborallyContext) {
  for (let sequence = 0; sequence < SEQUENCE_COUNT; sequence++) {
    ctx.mergeState({ sequence })
    await resolveTurnSequence(ctx, sequence)
  }

  await resolveVirtualPlayers(ctx)
  await resolveTurnEnd(ctx)
}

export async function resolveState(ctx: RoborallyContext) {
  if (ctx.getPhase() === GamePhase.PROGRAM && ctx.allPlayersReady()) {
    await resolveTurn(ctx)
  }
}
