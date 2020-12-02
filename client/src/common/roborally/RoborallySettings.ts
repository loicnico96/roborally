import { Collection, DataFetcher } from "common/firestore/collections"
import { BaseSettings } from "common/GameSettings"
import { PlayerId } from "common/model/GameStateBasic"
import { shuffle } from "common/utils/arrays"
import { optional, validateEnum } from "common/utils/validation"

import { BoardId } from "./model/BoardData"
import { getInitialGameState, RoborallyState } from "./model/RoborallyState"

export type RoborallyOptions = {
  boardId: BoardId
}

export const RoborallySettings: BaseSettings<
  RoborallyState,
  RoborallyOptions
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
}
