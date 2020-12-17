import { HttpTrigger } from "common/functions"

import { HttpHandler } from "./handleTrigger"
import httpGameAction from "./httpGameAction"
import httpRoomClose from "./httpRoomClose"
import httpRoomCreate from "./httpRoomCreate"
import httpRoomEnter from "./httpRoomEnter"
import httpRoomLeave from "./httpRoomLeave"
import httpRoomOptions from "./httpRoomOptions"
import httpRoomStart from "./httpRoomStart"

const HANDLERS: { [T in HttpTrigger]: HttpHandler<T> } = {
  [HttpTrigger.GAME_ACTION]: httpGameAction,
  [HttpTrigger.ROOM_CLOSE]: httpRoomClose,
  [HttpTrigger.ROOM_CREATE]: httpRoomCreate,
  [HttpTrigger.ROOM_ENTER]: httpRoomEnter,
  [HttpTrigger.ROOM_LEAVE]: httpRoomLeave,
  [HttpTrigger.ROOM_OPTIONS]: httpRoomOptions,
  [HttpTrigger.ROOM_START]: httpRoomStart,
}

export default HANDLERS
