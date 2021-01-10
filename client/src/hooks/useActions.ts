import { getActions, StoreActions } from "utils/store"

import { useStore } from "./useStore"

export function useActions(): StoreActions {
  return useStore(getActions)
}
