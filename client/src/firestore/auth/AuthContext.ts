import { useStore } from "hooks/useStore"
import { AuthData, Store } from "utils/store"

export function getAuthContext(store: Store): AuthData {
  return store.auth
}

export function useAuthContext(): AuthData {
  return useStore(getAuthContext)
}
