import { Collection, DataFetcher } from "common/firestore/collections"
import { RoborallyAction } from "common/functions/httpGameAction"
import { StateChangeHandler } from "common/GameContext"
import { BaseSettings } from "common/GameSettings"
import { PlayerId } from "common/model/GameStateBasic"
import { shuffle } from "common/utils/arrays"

import { BoardData, BoardId, mergeBoards } from "./model/BoardData"
import { RoborallyPlayer } from "./model/RoborallyPlayer"
import { getInitialGameState, RoborallyState } from "./model/RoborallyState"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { RoborallyContext } from "./RoborallyContext"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"

export type RoborallyOptions = {
  checkpoints: number
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
    checkpoints: 3,
    boardIds: [BoardId.ISLAND],
  },

  maxPlayers: 4,
  minPlayers: 1,

  async getInitialGameState(
    playerIds: PlayerId[],
    options: RoborallyOptions,
    fetchData: DataFetcher
  ): Promise<RoborallyState> {
    const { checkpoints: numCheckpoints, boardIds } = options

    async function fetchBoardData(boardId: BoardId): Promise<BoardData> {
      return fetchData(Collection.BOARD, boardId)
    }

    const boardDatas = await Promise.all(boardIds.map(fetchBoardData))
    const boardData = mergeBoards(boardDatas)
    const checkpoints = shuffle(boardData.checkpoints).slice(0, numCheckpoints)
    return getInitialGameState(boardIds, boardData, checkpoints, playerIds)
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
  validateOptions,
}
