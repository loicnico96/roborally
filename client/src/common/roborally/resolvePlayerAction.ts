import { PlayerId } from "common/model/GameStateBasic"
import { shuffle } from "common/utils/arrays"

import { confirmPlayerProgram } from "./confirmPlayerProgram"
import { RoborallyAction } from "./model/RoborallyAction"
import { RoborallyContext } from "./model/RoborallyContext"
import { GamePhase } from "./model/RoborallyState"
import { readyPlayerForTurn } from "./readyPlayerForTurn"
import { startProgramPhase } from "./startProgramPhase"

export async function resolvePlayerAction(
  ctx: RoborallyContext,
  playerId: PlayerId,
  action: RoborallyAction
) {
  switch (ctx.getPhase()) {
    case GamePhase.STANDBY:
      ctx.updateState(state => readyPlayerForTurn(state, playerId))
      if (ctx.allPlayersReady()) {
        ctx.updateState(startProgramPhase)
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

      if (ctx.allPlayersReady()) {
        ctx.updateState({ deck: shuffle })
      }
      break

    default:
      break
  }
}
