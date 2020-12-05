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
import { useToast } from "hooks/useToast"

export type CollectionResult<T extends Collection> = LoadedResource<
  CollectionData<T>
>[]

export function useCollectionLoader<T extends Collection>(
  collectionId: T,
  handler: (state: Resource<CollectionResult<T>>) => any,
  options: QueryOptions
): () => Promise<void> {
  const query = useQuery(collectionId, options)
  const toast = useToast()

  const refresh = useCallback(async () => {
    handler(getLoadingResource(collectionId))

    try {
      const snapshot = await query.get()
      const data = snapshot.docs.map(doc =>
        getLoadedResource(doc.id, doc.data() as CollectionData<T>)
      )
      handler(getLoadedResource(collectionId, data))
    } catch (error) {
      toast.error(error.message)
      handler(getErrorResource(collectionId, error))
    }
  }, [collectionId, handler, query])

  useEffect(() => {
    refresh()
  }, [refresh])

  return refresh
}
