import { HttpTrigger } from "common/functions"
import httpReady from "./httpReady"
import httpRoomCreate from "./httpRoomCreate"
import httpRoomEnter from "./httpRoomEnter"
import httpRoomLeave from "./httpRoomLeave"
import httpRoomStart from "./httpRoomStart"
import { HttpHandler } from "./handleTrigger"

const HANDLERS: { [T in HttpTrigger]: HttpHandler<T> } = {
  [HttpTrigger.READY]: httpReady,
  [HttpTrigger.ROOM_CREATE]: httpRoomCreate,
  [HttpTrigger.ROOM_ENTER]: httpRoomEnter,
  [HttpTrigger.ROOM_LEAVE]: httpRoomLeave,
  [HttpTrigger.ROOM_START]: httpRoomStart,
}

export default HANDLERS
