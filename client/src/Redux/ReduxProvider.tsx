import React from "react"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, Middleware } from "redux"
import { createLogger } from "redux-logger"
import thunkMiddleware from "redux-thunk"
import { ReduxActionType, ReduxActionPayload } from "./types"
import { ReduxState, INITIAL_STATE } from "./ReduxState"
import { Action } from "./actions"

const REDUX_LOGGING_ENABLED = true

function initStore(initialState: ReduxState) {
  const reducer = (
    state: ReduxState = initialState,
    action: Action<ReduxActionType, ReduxActionPayload>
  ): ReduxState => action.reducer(state, action.payload)

  const middlewares: Middleware[] = [thunkMiddleware]

  if (REDUX_LOGGING_ENABLED) {
    const loggerMiddleware = createLogger({ collapsed: true })
    middlewares.push(loggerMiddleware)
  }

  return createStore(reducer, initialState, applyMiddleware(...middlewares))
}

const store = initStore(INITIAL_STATE)

type ReduxProviderProps = {
  children: React.ReactNode
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
