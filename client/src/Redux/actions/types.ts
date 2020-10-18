import { ReduxReducer } from "../types"
import ACTIONS from "./index"

export type Action<T extends string, P> = {
  type: T
  payload: P
  reducer: ReduxReducer<P>
}

export type ActionCreators = typeof ACTIONS
