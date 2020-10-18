import { ReduxReducer } from "../types"
import ACTIONS from "."

export type Action<T extends string, P> = {
  type: T
  payload: P
  reducer: ReduxReducer<P>
}

export type ActionCreators = typeof ACTIONS
