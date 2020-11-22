export type UserInfo = {
  image: string | null
  name: string
  updateName: (name: string) => Promise<void>
}

export type AuthData = {
  isAnonymous: boolean
  isAuthenticated: boolean
  userId: string | null
  userInfo: UserInfo | null
}

export const UNAUTHENTICATED = Object.freeze<AuthData>({
  isAnonymous: false,
  isAuthenticated: false,
  userId: null,
  userInfo: null,
})
