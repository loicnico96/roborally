import { HttpTrigger } from "common/functions"
import { getGameSettings } from "common/GameSettings"
import { RoomStatus } from "common/model/RoomData"
import { validateString } from "common/utils/validation"

import {
  getDataFetcher,
  getRoomRef,
  getClientRef,
  getServerRef,
} from "../../utils/collections"
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
      const roomRef = getRoomRef(data.roomId)
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

      const { game } = roomData
      const { getInitialGameState, minPlayers } = getGameSettings(game)

      if (roomData.playerOrder.length < minPlayers) {
        throw preconditionError("Not enough players")
      }

      const clientRef = getClientRef(game, data.roomId)
      const serverRef = getServerRef(game, data.roomId)

      const fetchData = getDataFetcher(game, transaction)
      const initialState = await getInitialGameState(roomData, fetchData)
      const initialGameData = {
        state: initialState,
        game,
      }

      transaction.create(clientRef, initialGameData)
      transaction.create(serverRef, initialGameData)
      transaction.update(roomRef, { status: RoomStatus.ONGOING })

      return true
    })

    return { success }
  }
)
