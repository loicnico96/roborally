import { GameType } from "common/GameSettings"
import { MetropolysPlayer } from "common/metropolys/model/MetropolysPlayer"
import { PlayerId } from "common/model/GameStateBasic"
import { usePlayerState } from "components/game/hooks/usePlayerState"

export function useMetropolysPlayer<S>(
  playerId: PlayerId,
  selector: (state: MetropolysPlayer) => S
): S {
  return usePlayerState(GameType.METROPOLYS, playerId, selector)
}
