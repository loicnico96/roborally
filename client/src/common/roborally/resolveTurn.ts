import { StateChangeHandler } from "common/GameContext"

import { RoborallyState } from "./model/RoborallyState"
import { RoborallyContext } from "./RoborallyContext"

export async function resolveTurn(
  initialState: RoborallyState,
  onStateChanged?: StateChangeHandler<RoborallyState>
): Promise<RoborallyState> {
  const ctx = new RoborallyContext(initialState, onStateChanged)
  await ctx.resolve()
  return ctx.getState()
}
