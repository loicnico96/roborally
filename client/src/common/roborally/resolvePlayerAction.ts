import { RoborallyAction } from "common/functions/httpGameAction"
import { PlayerId } from "common/model/GameStateBasic"

import { confirmPlayerProgram } from "./confirmPlayerProgram"
import { GamePhase } from "./model/RoborallyState"
import { readyPlayerForTurn } from "./readyPlayerForTurn"
import { RoborallyContext } from "./RoborallyContext"
import { startTurn } from "./startTurn"

export async function resolvePlayerAction(
  ctx: RoborallyContext,
  playerId: PlayerId,
  action: RoborallyAction
) {
  switch (ctx.getPhase()) {
    case GamePhase.STANDBY:
      ctx.updateState(state => readyPlayerForTurn(state, playerId))
      if (ctx.allPlayersReady()) {
        ctx.updateState(startTurn)
      }
      break

    case GamePhase.PROGRAM:
      ctx.updateState(state =>
        confirmPlayerProgram(
          state,
          playerId,
          action.program,
          action.poweredDown
        )
      )
      break

    default:
      break
  }
}
