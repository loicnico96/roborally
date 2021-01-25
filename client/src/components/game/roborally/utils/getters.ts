import { PlayerId } from "common/model/GameStateBasic"
import { BoardId, FeatureType } from "common/roborally/model/BoardData"
import { Position } from "common/roborally/model/Position"
import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"
import {
  GamePhase,
  RoborallyState,
} from "common/roborally/model/RoborallyState"

export function getBoardFeatures(state: RoborallyState): FeatureType[] {
  return state.board.features
}

export function getBoardHeight(state: RoborallyState): number {
  return state.board.dimensions.y
}

export function getBoardIds(state: RoborallyState): BoardId[] {
  return state.boardIds
}

export function getBoardWidth(state: RoborallyState): number {
  return state.board.dimensions.x
}

export function getCheckpoints(state: RoborallyState): Position[] {
  return state.checkpoints
}

export function getCurrentPhase(state: RoborallyState): GamePhase {
  return state.phase
}

export function getCurrentSequence(state: RoborallyState): number {
  return state.sequence
}

export function getCurrentTurn(state: RoborallyState): number {
  return state.turn
}

export function getPlayer(
  state: RoborallyState,
  playerId: PlayerId
): RoborallyPlayer {
  return state.players[playerId]
}

export function getPlayerIds(state: RoborallyState): PlayerId[] {
  return state.playerOrder
}

export function getPlayerCheckpoint(player: RoborallyPlayer): number {
  return player.checkpoint
}

export function getPlayerDamage(player: RoborallyPlayer): number {
  return player.damage
}

export function getPlayerDestroyed(player: RoborallyPlayer): boolean {
  return player.destroyed
}

export function getPlayerPositionX(player: RoborallyPlayer): number {
  return player.pos.x
}

export function getPlayerPositionY(player: RoborallyPlayer): number {
  return player.pos.y
}

export function getPlayerPoweredDown(player: RoborallyPlayer): boolean {
  return player.down
}

export function getPlayerReady(player: RoborallyPlayer): boolean {
  return player.ready
}

export function getPlayerRotation(player: RoborallyPlayer): number {
  return player.rot
}

export function getPlayerVirtual(player: RoborallyPlayer): boolean {
  return player.virtual
}

export function getTotalCheckpoints(state: RoborallyState): number {
  return state.checkpoints.length - 1
}
