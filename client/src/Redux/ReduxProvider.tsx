import React from "react"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, Middleware } from "redux"
import { createLogger } from "redux-logger"
import thunkMiddleware from "redux-thunk"
import { ReduxAction, ReduxState } from "./types"
import { INITIAL_STATE } from "./ReduxState"

const REDUX_LOGGING_ENABLED = true

function initStore(initialState: ReduxState) {
  const reducer = (
    state: ReduxState = initialState,
    action: ReduxAction
  ): ReduxState => {
    return action.reducer(state, action.payload)
  }

  const middlewares: Middleware[] = [thunkMiddleware]

  if (REDUX_LOGGING_ENABLED) {
    middlewares.push(createLogger({ collapsed: true }))
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
