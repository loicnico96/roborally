import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { ReduxActionCreator, ReduxActionDispatch } from './types'
import { Params } from '../utils/types'

function useAction<P extends Params, T>(
  actionCreator: ReduxActionCreator<P, T>
): ReduxActionDispatch<P> {
  const dispatch = useDispatch()
  return useCallback(
    (...args) => {
      dispatch(actionCreator(...args))
    },
    [dispatch, actionCreator]
  )
}

export default useAction
