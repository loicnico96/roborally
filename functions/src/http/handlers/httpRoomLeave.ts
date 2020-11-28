import update from "immutability-helper"

import { Collection } from "common/firestore/collections"
import { HttpTrigger } from "common/functions"
import { RoomStatus } from "common/model/RoomData"
import { required, validateString } from "common/utils/validation"

import { getCollection } from "../../utils/collections"
import { preconditionError, permissionError } from "../../utils/errors"
import { firestore } from "../../utils/firestore"

import { handleTrigger } from "./handleTrigger"

const validationSchema = {
  roomId: required(validateString()),
}

export default handleTrigger<HttpTrigger.ROOM_LEAVE>(
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

      if (roomData.ownerId === userId) {
        throw permissionError("Not allowed")
      }

      if (!roomData.playerOrder.includes(userId)) {
        return false
      }

      transaction.update(
        roomRef,
        update(roomData, {
          playerOrder: playerOrder => playerOrder.filter(id => id !== userId),
          players: {
            $unset: [userId],
          },
        })
      )

      return true
    })

    return { success }
  }
)
