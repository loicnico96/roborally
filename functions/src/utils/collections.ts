import {
  Collection,
  CollectionData,
  DataFetcher,
} from "common/firestore/collections"

import { notFoundError } from "./errors"
import { firestore } from "./firestore"

type CollectionRef<
  T extends Collection
> = FirebaseFirestore.CollectionReference<CollectionData<T>>

export function getCollection<T extends Collection>(
  collectionId: T
): CollectionRef<T> {
  return firestore.collection(collectionId) as CollectionRef<T>
}

export function getDataFetcher(
  transaction: FirebaseFirestore.Transaction
): DataFetcher {
  return async <T extends Collection>(collectionId: T, documentId: string) => {
    const ref = getCollection(collectionId).doc(documentId)
    const doc = await transaction.get(ref)
    const data = doc.data()
    if (data === undefined) {
      const refId = `${collectionId}/${documentId}`
      throw notFoundError(`Document ${refId} could not be found`)
    }

    return data
  }
}
