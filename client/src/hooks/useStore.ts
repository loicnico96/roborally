import createHook from "zustand"

import { createStore } from "utils/store"

export const useStore = createHook(createStore)
