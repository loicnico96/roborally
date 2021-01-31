import update from "immutability-helper"

import { HttpTrigger } from "common/functions"
import { getGameSettings } from "common/GameSettings"
import { RoomStatus } from "common/model/RoomData"
import { validateString } from "common/utils/validation"

import { getRoomRef } from "../../utils/collections"
import { preconditionError } from "../../utils/errors"
import { firestore } from "../../utils/firestore"

import { handleTrigger } from "./handleTrigger"

const validationSchema = {
  roomId: validateString(),
}

export default handleTrigger<HttpTrigger.ROOM_ENTER>(
  validationSchema,
  async (data, userId, userInfo) => {
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

      const { maxPlayers } = getGameSettings(roomData.game)

      if (roomData.playerOrder.length >= maxPlayers) {
        throw preconditionError("Full")
      }

      if (roomData.playerOrder.includes(userId)) {
        return false
      }

      transaction.update(
        roomRef,
        update(roomData, {
          playerOrder: {
            $push: [userId],
          },
          players: {
            $merge: {
              [userId]: userInfo,
            },
          },
        })
      )

      return true
    })

    return { success }
  }
)
