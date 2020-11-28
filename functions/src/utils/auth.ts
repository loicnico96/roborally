import * as firebase from "firebase-admin"

import { UserId, UserInfo } from "common/model/UserInfo"

import { authenticationError } from "./errors"

const Auth = firebase.auth()

export type FirebaseAuth = {
  uid: string
}

export function validateAuth(auth: FirebaseAuth | undefined): UserId {
  if (auth === undefined) {
    throw authenticationError("Not unauthenticated")
  }

  return auth.uid
}

export async function getUserInfo(userId: UserId): Promise<UserInfo> {
  const userRecord = await Auth.getUser(userId)
  return {
    name: userRecord.displayName ?? "Anonymous",
  }
}

export default Auth
