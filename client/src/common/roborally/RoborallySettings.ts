import { Collection, DataFetcher } from "common/firestore/collections"
import { RoborallyAction } from "common/functions/httpGameAction"
import { StateChangeHandler } from "common/GameContext"
import { BaseSettings } from "common/GameSettings"
import { PlayerId } from "common/model/GameStateBasic"
import { shuffle } from "common/utils/arrays"
import { optional, validateArray, validateEnum } from "common/utils/validation"

import { BoardData, BoardId, mergeBoards } from "./model/BoardData"
import { RoborallyPlayer } from "./model/RoborallyPlayer"
import { getInitialGameState, RoborallyState } from "./model/RoborallyState"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { RoborallyContext } from "./RoborallyContext"
import { validateAction } from "./validateAction"

export type RoborallyOptions = {
  boardIds: BoardId[]
}

export const RoborallySettings: BaseSettings<
  RoborallyPlayer,
  RoborallyState,
  RoborallyOptions,
  RoborallyContext,
  RoborallyAction
> = {
  defaultOptions: {
    boardIds: [BoardId.ISLAND],
  },

  maxPlayers: 4,
  minPlayers: 1,

  optionsValidator: {
    boardIds: optional(
      validateArray(validateEnum(BoardId), {
        minSize: 1,
        maxSize: 4,
      })
    ),
  },

  async getInitialGameState(
    playerIds: PlayerId[],
    options: RoborallyOptions,
    fetchData: DataFetcher
  ): Promise<RoborallyState> {
    const { boardIds } = options

    async function fetchBoardData(boardId: BoardId): Promise<BoardData> {
      return fetchData(Collection.BOARD, boardId)
    }

    const boardData = await Promise.all(boardIds.map(fetchBoardData))
    const mergedBoard = mergeBoards(boardData)
    const checkpoints = shuffle(mergedBoard.checkpoints)
    return getInitialGameState(boardIds, mergedBoard, checkpoints, playerIds)
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
