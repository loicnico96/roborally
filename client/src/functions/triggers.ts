import firebase from "../firebase"
import {
  HttpTrigger,
  HttpParams,
  HttpResponse,
  DEPLOYMENT_REGION,
} from "common/functions"
import { getVar, isEnv, toInt } from "utils/environment"
import { RoomId } from "common/model/RoomData"

const functions = firebase.app().functions(DEPLOYMENT_REGION)

if (isEnv("development") && getVar("REACT_APP_EMULATOR") === "1") {
  const emulatorHost = getVar("REACT_APP_EMULATOR_HOST") ?? "localhost"
  const emulatorPort = toInt(getVar("REACT_APP_EMULATOR_PORT")) ?? 5001
  console.warn(`Emulating function calls at ${emulatorHost}:${emulatorPort}`)
  functions.useEmulator(emulatorHost, emulatorPort)
}

export async function httpTrigger<T extends HttpTrigger>(
  trigger: T,
  params: HttpParams<T>
): Promise<HttpResponse<T>> {
  const result = await functions.httpsCallable(trigger)(params)
  return result.data
}

export async function triggerReady(
  params: HttpParams<HttpTrigger.READY>
): Promise<boolean> {
  const response = await httpTrigger(HttpTrigger.READY, params)
  return response.success
}

export async function triggerRoomCreate(
  params: HttpParams<HttpTrigger.ROOM_CREATE>
): Promise<RoomId> {
  const response = await httpTrigger(HttpTrigger.ROOM_CREATE, params)
  return response.roomId
}

export async function triggerRoomStart(
  params: HttpParams<HttpTrigger.ROOM_START>
): Promise<boolean> {
  const response = await httpTrigger(HttpTrigger.ROOM_START, params)
  return response.success
}
