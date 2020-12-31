import { RoomId } from "common/model/RoomData"
import { Program } from "common/roborally/model/Program"

import { HttpBasicResponse } from "."

export type RoborallyAction = {
  poweredDown: boolean
  program: Program
}

export type HttpGameActionParams = {
  roomId: RoomId
  action: unknown
}

export type HttpGameActionResponse = HttpBasicResponse
