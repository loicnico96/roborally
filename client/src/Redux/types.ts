import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Fn, Params } from '../utils/types'

export type ReduxState = {
  // TODO
}

export type ReduxReducer<T> = (state: ReduxState, payload: T) => ReduxState

export type ReduxActionType = string

export type ReduxAction<T = any> = {
  type: ReduxActionType
  payload: T
  reducer: ReduxReducer<T>
}

export type ReduxThunk<T = void> = ThunkAction<T, ReduxState, {}, ReduxAction>

export type ReduxDispatch = ThunkDispatch<ReduxState, {}, ReduxAction>

export type ReduxActionCreator<P extends Params, T> = Fn<P, ReduxAction<T>>

export type ReduxActionDispatch<P extends Params> = Fn<P, void>
