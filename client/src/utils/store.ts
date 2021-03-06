import update from "immutability-helper"
import { SetState } from "zustand"

import { GameState, GameType } from "common/GameSettings"
import { RoomData, RoomId } from "common/model/RoomData"
import { UserId, UserInfo } from "common/model/UserInfo"
import { merge } from "common/utils/objects"
import { FirebaseUser } from "firestore/auth/Auth"

import { Resource } from "./resources"

export type AuthUser = UserInfo & {
  updateName: (name: string) => Promise<void>
}

export type AuthData = {
  isAnonymous: boolean
  isAuthenticated: boolean
  userId: UserId | null
  userInfo: AuthUser | null
}

export const UNAUTHENTICATED: AuthData = {
  isAnonymous: false,
  isAuthenticated: false,
  userId: null,
  userInfo: null,
}

export type State = {
  auth: AuthData
  games: { [T in GameType]?: Partial<Record<RoomId, Resource<GameState<T>>>> }
  rooms: Partial<Record<RoomId, Resource<RoomData>>>
}

export type StoreActions = {
  setCurrentUser: (user: FirebaseUser | null) => void
  setGameResource: <T extends GameType>(
    gameType: T,
    resource: Resource<GameState<T>>
  ) => void
  setRoomResource: (resource: Resource<RoomData>) => void
}

export type Store = State & {
  actions: StoreActions
}

export const INITIAL_STATE: State = {
  auth: UNAUTHENTICATED,
  games: {},
  rooms: {},
}

export function createActions(set: SetState<State>): StoreActions {
  function setCurrentUser(user: FirebaseUser | null) {
    if (user !== null) {
      set({
        auth: {
          isAnonymous: user.isAnonymous,
          isAuthenticated: true,
          userId: user.uid,
          userInfo: {
            name: user.displayName ?? "[Guest]",
            updateName: async (displayName: string) => {
              await user.updateProfile({ displayName })
              setCurrentUser(user)
            },
          },
        },
      })
    } else {
      set({ auth: UNAUTHENTICATED })
    }
  }

  function setGameResource<T extends GameType>(
    gameType: T,
    resource: Resource<GameState<T>>
  ) {
    set(state =>
      update(state, {
        games: {
          $set: {
            [gameType]: {
              [resource.id]: resource,
            },
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
    setCurrentUser,
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
