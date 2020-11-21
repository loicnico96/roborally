import { HttpReadyParams } from "./httpReady"
import { HttpRoomCreateParams, HttpRoomCreateResponse } from "./httpRoomCreate"
import { HttpRoomStartParams, HttpRoomStartResponse } from "./httpRoomStart"

export const DEPLOYMENT_REGION = "europe-west3"

export type HttpBasicResponse = {
  success: boolean
}

export enum HttpTrigger {
  READY = "httpReady",
  ROOM_CREATE = "httpRoomCreate",
  ROOM_START = "httpRoomStart",
}

export type HttpParams<T extends HttpTrigger = HttpTrigger> = {
  [HttpTrigger.READY]: HttpReadyParams
  [HttpTrigger.ROOM_CREATE]: HttpRoomCreateParams
  [HttpTrigger.ROOM_START]: HttpRoomStartParams
}[T]

export type HttpResponse<T extends HttpTrigger = HttpTrigger> = {
  [HttpTrigger.READY]: HttpBasicResponse
  [HttpTrigger.ROOM_CREATE]: HttpRoomCreateResponse
  [HttpTrigger.ROOM_START]: HttpRoomStartResponse
}[T]
