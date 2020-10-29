import { HttpReadyParams } from "./httpReady"

export const DEPLOYMENT_REGION = "europe-west3"

export type HttpBasicResponse = {
  success: boolean
}

export enum HttpTrigger {
  READY = "httpReady"
}

export type HttpParams<T extends HttpTrigger = HttpTrigger> = {
  [HttpTrigger.READY]: HttpReadyParams
}[T]

export type HttpResponse<T extends HttpTrigger = HttpTrigger> = {
  [HttpTrigger.READY]: HttpBasicResponse
}[T]
