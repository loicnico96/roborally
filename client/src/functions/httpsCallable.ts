import firebase from "../firebase"
import { DEPLOYMENT_REGION } from "common/functions"
import { getVar, isEnv, toInt } from "utils/environment"

const functions = firebase.app().functions(DEPLOYMENT_REGION)

if (isEnv("development") && getVar("REACT_APP_EMULATOR") === "1") {
  const emulatorHost = getVar("REACT_APP_EMULATOR_HOST") ?? "localhost"
  const emulatorPort = toInt(getVar("REACT_APP_EMULATOR_PORT")) ?? 5001
  console.warn(`Emulating function calls at ${emulatorHost}:${emulatorPort}`)
  functions.useEmulator(emulatorHost, emulatorPort)
}

export async function httpsCallable<R = unknown>(
  name: string,
  payload: unknown
): Promise<R> {
  const response = await functions.httpsCallable(name)(payload)
  return response.data
}
