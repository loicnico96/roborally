import firebase from "firebase"
import { HttpTrigger, HttpParams, HttpResponse, DEPLOYMENT_REGION } from "../common/functions"

const functions = firebase.app().functions(DEPLOYMENT_REGION)

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

