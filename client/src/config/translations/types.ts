import { GameType } from "common/GameSettings"
import { RoomStatus } from "common/model/RoomData"
import { BoardId } from "common/roborally/model/BoardData"

export type TranslationConfig = {
  games: Record<GameType, { name: string }>
  gameTile: {
    tooltip: string
  }
  home: {
    pageTitle: string
  }
  login: {
    pageTitle: string
    rememberMe: string
    signIn: string
    signInAnonymous: string
    signInWithGoogle: string
    signOut: string
  }
  roborally: {
    board: Record<BoardId, string>
    options: {
      boards: Replace<"boardNames">
    }
  }
  room: {
    players: Replace<"playerNames">
    roomTitle: Replace<"gameType" | "roomStatus">
    status: Record<RoomStatus, string>
  }
  roomList: {
    allGames: string
    createRoom: {
      label: string
      noGameSelected: string
      tooltip: Replace<"gameType">
    }
    noRooms: string
    pageLoading: string
    pageTitle: string
  }
}

export type ReplaceParams = Record<string, unknown>

export type Replace<T extends string> = (params: Record<T, unknown>) => string

export function replace<T extends string>(entry: string): Replace<T> {
  return (params: Record<T, unknown>) =>
    entry.replace(/{{([a-zA-Z0-9_]+)}}/g, (match, key: T) => {
      if (params[key]) {
        return String(params[key])
      }

      if (process.env.NODE_ENV !== "production") {
        console.error(`Could not replace parameters ${key}`, params)
      }

      return match
    })
}
