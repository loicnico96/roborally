import { Collection, DataFetcher } from "common/firestore/collections"
import { HttpTrigger } from "common/functions"
import { getGameSettings, GameType, GameState } from "common/GameSettings"
import { RoomStatus, RoomData } from "common/model/RoomData"
import { validateString } from "common/utils/validation"

import { getCollection, getDataFetcher } from "../../utils/collections"
import { preconditionError, permissionError } from "../../utils/errors"
import { firestore } from "../../utils/firestore"

import { handleTrigger } from "./handleTrigger"

const validationSchema = {
  roomId: validateString(),
}

async function getInitialState<T extends GameType>(room: RoomData<T>, fetchData: DataFetcher): Promise<GameState<T>> {
  const { getInitialGameState } = getGameSettings(room.game)
  const initialState = await getInitialGameState(
    room.playerOrder,
    room.options as any,
    fetchData
  ) as GameState<T>
  return initialState
}

export default handleTrigger<HttpTrigger.ROOM_START>(
  validationSchema,
  async (data, userId) => {
    const success = await firestore.runTransaction(async transaction => {
      const roomRef = getCollection(Collection.ROOM).doc(data.roomId)
      const roomDoc = await transaction.get(roomRef)
      const roomData = roomDoc.data()
      if (roomData === undefined) {
        throw preconditionError("Invalid room ID")
      }

      if (roomData.status !== RoomStatus.OPENED) {
        throw preconditionError("Inconsistent status")
      }

      if (roomData.ownerId !== userId) {
        throw permissionError("Not allowed")
      }

      const { minPlayers } = getGameSettings(roomData.game)

      if (roomData.playerOrder.length < minPlayers) {
        throw preconditionError("Not enough players")
      }

      const fetchData = getDataFetcher(transaction)
      const initialState = await getInitialState(roomData, fetchData)

      const clientRef = getCollection(Collection.CLIENT).doc(data.roomId)
      const serverRef = getCollection(Collection.SERVER).doc(data.roomId)

      transaction.create(clientRef, initialState)
      transaction.create(serverRef, initialState)
      transaction.update(roomRef, { status: RoomStatus.ONGOING })

      return true
    })

    return { success }
  }
)
