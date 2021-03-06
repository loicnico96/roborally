import {
  HttpTrigger,
  HttpParams,
  HttpResponse,
  HttpPayload,
} from "common/functions"
import { HttpGameActionParams } from "common/functions/httpGameAction"
import { HttpRoomCloseParams } from "common/functions/httpRoomClose"
import { HttpRoomCreateParams } from "common/functions/httpRoomCreate"
import { HttpRoomEnterParams } from "common/functions/httpRoomEnter"
import { HttpRoomLeaveParams } from "common/functions/httpRoomLeave"
import { HttpRoomOptionsParams } from "common/functions/httpRoomOptions"
import { HttpRoomStartParams } from "common/functions/httpRoomStart"
import { GameOptions } from "common/GameSettings"
import { RoomId } from "common/model/RoomData"

import { httpsCallable } from "./httpsCallable"

export function getPayload<T extends HttpTrigger>(
  trigger: T,
  data: HttpParams<T>
): HttpPayload<T> {
  return {
    trigger,
    data,
  }
}

export async function httpTrigger<T extends HttpTrigger>(
  trigger: T,
  params: HttpParams<T>
): Promise<HttpResponse<T>> {
  const payload = getPayload(trigger, params)
  const response = await httpsCallable<HttpResponse<T>>("httpTrigger", payload)
  return response
}

export async function triggerGameAction(
  params: HttpGameActionParams
): Promise<boolean> {
  const response = await httpTrigger(HttpTrigger.GAME_ACTION, params)
  return response.success
}

export async function triggerRoomClose(
  params: HttpRoomCloseParams
): Promise<boolean> {
  const response = await httpTrigger(HttpTrigger.ROOM_CLOSE, params)
  return response.success
}

export async function triggerRoomCreate(
  params: HttpRoomCreateParams
): Promise<RoomId> {
  const response = await httpTrigger(HttpTrigger.ROOM_CREATE, params)
  return response.roomId
}

export async function triggerRoomEnter(
  params: HttpRoomEnterParams
): Promise<boolean> {
  const response = await httpTrigger(HttpTrigger.ROOM_ENTER, params)
  return response.success
}

export async function triggerRoomLeave(
  params: HttpRoomLeaveParams
): Promise<boolean> {
  const response = await httpTrigger(HttpTrigger.ROOM_LEAVE, params)
  return response.success
}

export async function triggerRoomOptions<T extends GameOptions>(
  params: HttpRoomOptionsParams<T>
): Promise<boolean> {
  const response = await httpTrigger(HttpTrigger.ROOM_OPTIONS, params)
  return response.success
}

export async function triggerRoomStart(
  params: HttpRoomStartParams
): Promise<boolean> {
  const response = await httpTrigger(HttpTrigger.ROOM_START, params)
  return response.success
}
