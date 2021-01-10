import update from "immutability-helper"
import { SetState } from "zustand"

import { RoomData, RoomId } from "common/model/RoomData"
import { RoborallyState } from "common/roborally/model/RoborallyState"
import { merge } from "common/utils/objects"

import { Resource } from "./resources"

export type State = {
  games: Partial<Record<RoomId, Resource<RoborallyState>>>
  rooms: Partial<Record<RoomId, Resource<RoomData>>>
}

export type StoreActions = {
  setGameResource: (resource: Resource<RoborallyState>) => void
  setRoomResource: (resource: Resource<RoomData>) => void
}

export type Store = State & {
  actions: StoreActions
}

export const INITIAL_STATE: State = {
  games: {},
  rooms: {},
}

export function createActions(set: SetState<State>): StoreActions {
  function setGameResource(resource: Resource<RoborallyState>) {
    set(state =>
      update(state, {
        games: {
          $set: {
            [resource.id]: resource,
          },
        },
      })
    )
  }

  function setRoomResource(resource: Resource<RoomData>) {
    set(state =>
      update(state, {
        rooms: {
          $merge: {
            [resource.id]: resource,
          },
        },
      })
    )
  }

  return {
    setGameResource,
    setRoomResource,
  }
}

export function createStore(set: SetState<State>): Store {
  const actions = createActions(set)
  return merge(INITIAL_STATE, { actions })
}

export function getActions(store: Store): StoreActions {
  return store.actions
}
