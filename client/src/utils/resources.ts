export type ResourceId = string

export type LoadingResource = {
  id: ResourceId
  loading: true
  error: null
  data: null
}

export type ErrorResource = {
  id: ResourceId
  loading: false
  error: Error
  data: null
}

export type LoadedResource<T> = {
  id: ResourceId
  loading: false
  error: null
  data: T
}

export type Resource<T> = LoadingResource | ErrorResource | LoadedResource<T>

export function isLoading<T>(
  resource: Resource<T>
): resource is LoadingResource {
  return resource.loading
}

export function getLoadingResource(objectId: ResourceId): LoadingResource {
  return {
    id: objectId,
    loading: true,
    error: null,
    data: null,
  }
}

export function isError<T>(resource: Resource<T>): resource is ErrorResource {
  return resource.error !== null
}

export function getErrorResource(
  objectId: ResourceId,
  error: Error
): ErrorResource {
  return {
    id: objectId,
    loading: false,
    error,
    data: null,
  }
}

export function isLoaded<T>(
  resource: Resource<T>
): resource is LoadedResource<T> {
  return resource.data !== null
}

export function getLoadedResource<T>(
  objectId: ResourceId,
  data: T
): LoadedResource<T> {
  return {
    id: objectId,
    loading: false,
    error: null,
    data,
  }
}
