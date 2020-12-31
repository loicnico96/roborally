import { Collection, DataFetcher } from "common/firestore/collections"
import { RoborallyAction } from "common/functions/httpGameAction"
import { StateChangeHandler } from "common/GameContext"
import { BaseSettings } from "common/GameSettings"
import { PlayerId } from "common/model/GameStateBasic"
import { shuffle } from "common/utils/arrays"
import { optional, validateEnum } from "common/utils/validation"

import { BoardId } from "./model/BoardData"
import { RoborallyPlayer } from "./model/RoborallyPlayer"
import { getInitialGameState, RoborallyState } from "./model/RoborallyState"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { RoborallyContext } from "./RoborallyContext"
import { validateAction } from "./validateAction"

export type RoborallyOptions = {
  boardId: BoardId
}

export const RoborallySettings: BaseSettings<
  RoborallyPlayer,
  RoborallyState,
  RoborallyOptions,
  RoborallyContext,
  RoborallyAction
> = {
  defaultOptions: {
    boardId: BoardId.ISLAND,
  },

  maxPlayers: 8,
  minPlayers: 1,

  optionsValidator: {
    boardId: optional(validateEnum(BoardId)),
  },

  async getInitialGameState(
    playerIds: PlayerId[],
    options: RoborallyOptions,
    fetchData: DataFetcher
  ): Promise<RoborallyState> {
    const { boardId } = options
    const boardData = await fetchData(Collection.BOARD, boardId)
    const checkpoints = shuffle(boardData.checkpoints)
    return getInitialGameState(boardId, boardData, checkpoints, playerIds)
  },

  getContext(
    gameState: RoborallyState,
    onStateChanged?: StateChangeHandler<RoborallyState>
  ): RoborallyContext {
    return new RoborallyContext(gameState, onStateChanged)
  },

  resolvePlayerAction,
  resolveState,
  validateAction,
}
