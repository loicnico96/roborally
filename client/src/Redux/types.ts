import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { ActionCreators } from "./actions"
import { ReduxState } from "./ReduxState"

export type ReduxReducer<T> = (state: ReduxState, payload: T) => ReduxState

export type ReduxActionType = keyof ActionCreators

export type ReduxActionCreator<
  T extends ReduxActionType = ReduxActionType
> = ActionCreators[T]

export type ReduxAction<
  T extends ReduxActionType = ReduxActionType
> = ReturnType<ReduxActionCreator<T>>

export type ReduxActionPayload<
  T extends ReduxActionType = ReduxActionType
> = ReduxAction<T>["payload"]

export type ReduxThunk<T = void> = ThunkAction<T, ReduxState, {}, ReduxAction>

export type ReduxDispatch = ThunkDispatch<ReduxState, {}, ReduxAction>

export type ReduxActionDispatch<T extends ReduxActionType> = (
  ...args: Parameters<ReduxActionCreator<T>>
) => void
