import { useCallback, useEffect } from "react"
import { Collection, CollectionData } from "common/firestore/collections"
import {
  Resource,
  getLoadingResource,
  getErrorResource,
  getLoadedResource,
} from "utils/resources"
import { useFirestore } from "./useFirestore"

export function useCollectionLoader<T extends Collection>(
  collectionId: T,
  handler: (state: Resource<Record<string, CollectionData<T>>>) => any
): () => Promise<void> {
  const firestore = useFirestore()

  const reload = useCallback(async () => {
    handler(getLoadingResource(collectionId))

    try {
      const snapshot = await firestore.collection(collectionId).get()
      const data = snapshot.docs.reduce((result, doc) => {
        result[doc.id] = doc.data() as CollectionData<T>
        return result
      }, {} as Record<string, CollectionData<T>>)
      handler(getLoadedResource(collectionId, data))
    } catch (error) {
      console.error(error.message)
      handler(getErrorResource(collectionId, error))
    }
  }, [firestore, collectionId, handler])

  useEffect(() => {
    reload()
  }, [reload])

  return reload
}
