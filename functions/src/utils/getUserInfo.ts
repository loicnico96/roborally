import * as firebase from "firebase-admin"
import { UserId, UserInfo } from "common/model/UserInfo"

const firebaseAuth = firebase.auth()

export async function getUserInfo(userId: UserId): Promise<UserInfo> {
  const userRecord = await firebaseAuth.getUser(userId)
  return {
    name: userRecord.displayName ?? "Anonymous",
  }
}
