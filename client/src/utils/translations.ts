import { GameOptions, GameType } from "common/GameSettings"
import { RoomData, RoomStatus } from "common/model/RoomData"
import { BoardId } from "common/roborally/model/BoardData"
import { Key, reduce } from "common/utils/objects"

export type TranslationKey = string | number

export type Transform<P extends any> = (t: Translations, props: P) => string

export type Entry = string | Transform<undefined>

export type Entries<K extends TranslationKey> = {
  [key in K]: Entry
}

export type NamespaceConfig<K extends TranslationKey = TranslationKey> = {
  [key in K]: Entry | Transform<any>
}

export type TranslationFn<C extends NamespaceConfig> = <K extends Key<C>>(
  key: K,
  ...props: C[K] extends Transform<infer P> ? [P] : []
) => string

export type TranslationConfig = {
  BoardName: Entries<BoardId>
  GameType: Entries<GameType>
  HomePage: {
    pageTitle: Entry
    roomListLink: Entry
  }
  LoginPage: {
    pageTitle: Entry
    signedIn: Transform<{ username: string }>
    signInAnonymous: Entry
  }
  PageHeader: {
    signIn: Entry
    signOut: Entry
    userNamePrompt: Entry
    userNameTooltip: Entry
  }
  RoomListPage: {
    createRoomButton: Entry
    pageTitle: Entry
    roomOptions: Transform<GameOptions>
    roomPlayers: Transform<string[]>
    roomTitle: Transform<RoomData>
  }
  RoomOptions: {
    boardLabel: Entry
    title: Entry
  }
  RoomPage: {
    closeRoomButton: Entry
    enterRoomButton: Entry
    leaveRoomButton: Entry
    pageTitle: Transform<RoomData>
    startGameButton: Entry
  }
  RoomStatus: Entries<RoomStatus>
}

export type Translations = {
  [N in Key<TranslationConfig>]: TranslationFn<TranslationConfig[N]>
}

export function getTranslationFn<Config extends NamespaceConfig>(
  t: Translations,
  config: Config
): TranslationFn<Config> {
  return (key: Key<Config>, props?: unknown): string => {
    const value = config[key]
    if (typeof value === "function") {
      return (value as Transform<any>)(t, props)
    } else {
      return value as string
    }
  }
}

export function getTranslations(config: TranslationConfig): Translations {
  return reduce(
    config,
    (t, namespaceConfig, namespace) => {
      t[namespace] = getTranslationFn(t, namespaceConfig)
      return t
    },
    {} as Translations
  )
}
