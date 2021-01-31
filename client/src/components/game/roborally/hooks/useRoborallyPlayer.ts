import { GameType } from "common/GameSettings"
import { PlayerId } from "common/model/GameStateBasic"
import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"
import { usePlayerState } from "components/game/hooks/usePlayerState"

export function useRoborallyPlayer<S>(
  playerId: PlayerId,
  selector: (state: RoborallyPlayer) => S
): S {
  return usePlayerState(GameType.ROBORALLY, playerId, selector)
}
