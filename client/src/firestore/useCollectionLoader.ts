import { useCallback, useEffect } from "react"

import { Collection, CollectionData } from "common/firestore/collections"
import {
  Resource,
  getLoadingResource,
  getErrorResource,
  getLoadedResource,
  LoadedResource,
} from "utils/resources"

import { QueryOptions, useQuery } from "./useQuery"

export type CollectionResult<T extends Collection> = LoadedResource<
  CollectionData<T>
>[]

export function useCollectionLoader<T extends Collection>(
  collectionId: T,
  handler: (state: Resource<CollectionResult<T>>) => any,
  options: QueryOptions
): () => Promise<void> {
  const query = useQuery(collectionId, options)

  const refresh = useCallback(async () => {
    handler(getLoadingResource(collectionId))

    try {
      const snapshot = await query.get()
      const data = snapshot.docs.map(doc =>
        getLoadedResource(doc.id, doc.data() as CollectionData<T>)
      )
      handler(getLoadedResource(collectionId, data))
    } catch (error) {
      console.error(error.message)
      handler(getErrorResource(collectionId, error))
    }
  }, [collectionId, handler, query])

  useEffect(() => {
    refresh()
  }, [refresh])

  return refresh
}
