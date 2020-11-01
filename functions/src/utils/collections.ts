import { firestore } from "./firestore"
import { Collection, CollectionData } from "common/firestore/collections"

type CollectionRef<
  T extends Collection
> = FirebaseFirestore.CollectionReference<CollectionData<T>>

export function getCollection<T extends Collection>(
  collectionId: T
): CollectionRef<T> {
  return firestore.collection(collectionId) as CollectionRef<T>
}
