import { HttpTrigger } from "common/functions"

import { HttpHandler } from "./handleTrigger"
import httpReady from "./httpReady"
import httpRoomClose from "./httpRoomClose"
import httpRoomCreate from "./httpRoomCreate"
import httpRoomEnter from "./httpRoomEnter"
import httpRoomLeave from "./httpRoomLeave"
import httpRoomStart from "./httpRoomStart"

const HANDLERS: { [T in HttpTrigger]: HttpHandler<T> } = {
  [HttpTrigger.READY]: httpReady,
  [HttpTrigger.ROOM_CREATE]: httpRoomCreate,
  [HttpTrigger.ROOM_ENTER]: httpRoomEnter,
  [HttpTrigger.ROOM_LEAVE]: httpRoomLeave,
  [HttpTrigger.ROOM_START]: httpRoomStart,
  [HttpTrigger.ROOM_CLOSE]: httpRoomClose,
}

export default HANDLERS
