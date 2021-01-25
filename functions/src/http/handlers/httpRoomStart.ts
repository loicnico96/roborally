import { Collection } from "common/firestore/collections"
import { HttpTrigger } from "common/functions"
import { getGameSettings } from "common/GameSettings"
import { RoomStatus } from "common/model/RoomData"
import { validateString } from "common/utils/validation"

import { getCollection, getDataFetcher } from "../../utils/collections"
import { preconditionError, permissionError } from "../../utils/errors"
import { firestore } from "../../utils/firestore"

import { handleTrigger } from "./handleTrigger"

const validationSchema = {
  roomId: validateString(),
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

      const { getInitialGameState, minPlayers } = getGameSettings(roomData.game)

      if (roomData.playerOrder.length < minPlayers) {
        throw preconditionError("Not enough players")
      }

      const fetchData = getDataFetcher(transaction)
      const initialState = await getInitialGameState(roomData, fetchData)

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
