import { HttpReadyParams } from "./httpReady"
import { HttpRoomCreateParams, HttpRoomCreateResponse } from "./httpRoomCreate"

export const DEPLOYMENT_REGION = "europe-west3"

export type HttpBasicResponse = {
  success: boolean
}

export enum HttpTrigger {
  READY = "httpReady",
  ROOM_CREATE = "httpRoomCreate",
}

export type HttpParams<T extends HttpTrigger = HttpTrigger> = {
  [HttpTrigger.READY]: HttpReadyParams
  [HttpTrigger.ROOM_CREATE]: HttpRoomCreateParams
}[T]

export type HttpResponse<T extends HttpTrigger = HttpTrigger> = {
  [HttpTrigger.READY]: HttpBasicResponse
  [HttpTrigger.ROOM_CREATE]: HttpRoomCreateResponse
}[T]
