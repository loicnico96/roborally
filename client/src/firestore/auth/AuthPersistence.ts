import { isEnv } from "utils/environment"

export enum AuthPersistence {
  LOCAL = "local",
  SESSION = "session",
}

export function getDefaultAuthPersistence(): AuthPersistence {
  return isEnv("production") ? AuthPersistence.LOCAL : AuthPersistence.SESSION
}
