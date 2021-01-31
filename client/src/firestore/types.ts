import firebase from "../firebase"

export type Firestore = firebase.firestore.Firestore
export type DocumentData = firebase.firestore.DocumentData
export type CollectionRef<
  T extends DocumentData
> = firebase.firestore.CollectionReference<T>
export type DocumentRef<
  T extends DocumentData
> = firebase.firestore.DocumentReference<T>
export type DocumentSnapshot<
  T extends DocumentData
> = firebase.firestore.DocumentSnapshot<T>
export type Query<T extends DocumentData> = firebase.firestore.Query<T>
