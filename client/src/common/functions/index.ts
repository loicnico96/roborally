import { HttpReadyParams } from "./httpReady"
import { HttpRoomCloseParams, HttpRoomCloseResponse } from "./httpRoomClose"
import { HttpRoomCreateParams, HttpRoomCreateResponse } from "./httpRoomCreate"
import { HttpRoomEnterParams, HttpRoomEnterResponse } from "./httpRoomEnter"
import { HttpRoomLeaveParams, HttpRoomLeaveResponse } from "./httpRoomLeave"
import { HttpRoomStartParams, HttpRoomStartResponse } from "./httpRoomStart"

export const DEPLOYMENT_REGION = "europe-west3"

export type HttpBasicResponse = {
  success: boolean
}

export enum HttpTrigger {
  READY = "httpReady",
  ROOM_CREATE = "httpRoomCreate",
  ROOM_ENTER = "httpRoomEnter",
  ROOM_LEAVE = "httpRoomLeave",
  ROOM_START = "httpRoomStart",
  ROOM_CLOSE = "httpRoomClose",
}

export type HttpParams<T extends HttpTrigger = HttpTrigger> = {
  [HttpTrigger.READY]: HttpReadyParams
  [HttpTrigger.ROOM_CREATE]: HttpRoomCreateParams
  [HttpTrigger.ROOM_ENTER]: HttpRoomEnterParams
  [HttpTrigger.ROOM_LEAVE]: HttpRoomLeaveParams
  [HttpTrigger.ROOM_START]: HttpRoomStartParams
  [HttpTrigger.ROOM_CLOSE]: HttpRoomCloseParams
}[T]

export type HttpResponse<T extends HttpTrigger = HttpTrigger> = {
  [HttpTrigger.READY]: HttpBasicResponse
  [HttpTrigger.ROOM_CREATE]: HttpRoomCreateResponse
  [HttpTrigger.ROOM_ENTER]: HttpRoomEnterResponse
  [HttpTrigger.ROOM_LEAVE]: HttpRoomLeaveResponse
  [HttpTrigger.ROOM_START]: HttpRoomStartResponse
  [HttpTrigger.ROOM_CLOSE]: HttpRoomCloseResponse
}[T]

export type HttpPayload<T extends HttpTrigger = HttpTrigger> = {
  trigger: T
  data: HttpParams<T>
}
