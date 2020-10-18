export type ObjectId = string

export type ObjectStateLoading = {
  id: ObjectId
  loading: true
  error: null
  data: null
}

export type ObjectStateError = {
  id: ObjectId
  loading: false
  error: Error
  data: null
}

export type ObjectStateLoaded<T> = {
  id: ObjectId
  loading: false
  error: null
  data: T
}

export type ObjectState<T> =
  | ObjectStateLoading
  | ObjectStateError
  | ObjectStateLoaded<T>

export function isLoading<T>(
  state: ObjectState<T>
): state is ObjectStateLoading {
  return state.loading
}

export function getLoadingState(objectId: ObjectId): ObjectStateLoading {
  return {
    id: objectId,
    loading: true,
    error: null,
    data: null,
  }
}

export function isError<T>(state: ObjectState<T>): state is ObjectStateError {
  return state.error !== null
}

export function getErrorState(
  objectId: ObjectId,
  error: Error
): ObjectStateError {
  return {
    id: objectId,
    loading: false,
    error,
    data: null,
  }
}

export function isLoaded<T>(
  state: ObjectState<T>
): state is ObjectStateLoaded<T> {
  return state.data !== null
}

export function getLoadedState<T>(
  objectId: ObjectId,
  data: T
): ObjectStateLoaded<T> {
  return {
    id: objectId,
    loading: false,
    error: null,
    data,
  }
}
