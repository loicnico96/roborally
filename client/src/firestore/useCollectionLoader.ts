import { useCallback, useEffect } from "react"

import {
  Resource,
  getLoadingResource,
  getErrorResource,
  getLoadedResource,
  LoadedResource,
} from "utils/resources"

import { CollectionRef, DocumentData } from "./types"
import { QueryOptions, useQuery } from "./useQuery"

export type CollectionResult<T extends DocumentData> = LoadedResource<T>[]

export function useCollectionLoader<T extends DocumentData>(
  collectionRef: CollectionRef<T>,
  handler: (state: Resource<CollectionResult<T>>) => any,
  options: QueryOptions
): () => Promise<void> {
  const query = useQuery(collectionRef, options)

  const refresh = useCallback(async () => {
    const collectionId = collectionRef.id

    handler(getLoadingResource(collectionId))

    try {
      const snapshot = await query.get()
      const data = snapshot.docs.map(doc =>
        getLoadedResource(doc.id, doc.data())
      )
      handler(getLoadedResource(collectionId, data))
    } catch (error) {
      console.error(error.message)
      handler(getErrorResource(collectionId, error))
    }
  }, [collectionRef, handler, query])

  useEffect(() => {
    refresh()
  }, [refresh])

  return refresh
}
