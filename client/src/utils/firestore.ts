import {useState, useEffect} from 'react'
import firebase from '../firebase'

export type CollectionId = 'room' | 'game' | 'board'

export type DocumentData = firebase.firestore.DocumentData

type ResourceLoaded<T extends DocumentData> = {
  status: 'loaded'
  result: T
}

type ResourcePending = {
  status: 'pending'
  result: null
}

type ResourceError = {
  status: 'error'
  result: null
}

type Resource<T extends DocumentData> = ResourceLoaded<T> | ResourcePending | ResourceError

export const isLoaded = <T extends DocumentData>(resource: Resource<T>): resource is ResourceLoaded<T> => {
  return resource.status === 'loaded'
}

export const isPending = (resource: Resource<DocumentData>): resource is ResourcePending => {
  return resource.status === 'pending'
}

export const isError = (resource: Resource<DocumentData>): resource is ResourceError => {
  return resource.status === 'error'
}

const firestore = firebase.firestore()

export const useFirestore = <T extends DocumentData = DocumentData>(col_id: CollectionId, doc_id: string): Resource<T> => {
  const [result, set_result] = useState({status: 'pending', result: null} as Resource<T>)

  useEffect(() => {
    const subscription = firestore.collection(col_id).doc(doc_id).onSnapshot((snapshot) => {
      const data = snapshot.data()
      if (data) {
        set_result({
          status: 'loaded',
          result: data as T,
        })
      } else {
        console.warn('deleted')
        set_result({
          status: 'error',
          result: null,
        })
      }
    }, (error) => {
      console.warn(error)
      set_result({
        status: 'error',
        result: null,
      })
    })

    return subscription
  }, [set_result, col_id, doc_id])

  return result
}
