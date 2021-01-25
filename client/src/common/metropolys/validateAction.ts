import { PlayerId } from "common/model/GameStateBasic"
import { validateBoolean, validateObject } from "common/utils/validation"
import { MetropolysAction } from "./model/MetropolysAction"
import { MetropolysState } from "./model/MetropolysState"

export function validateAction(
  _gameState: MetropolysState,
  _playerId: PlayerId,
  action: unknown
): MetropolysAction {
  const typedAction = validateObject({
    pass: validateBoolean(),
  })(action)

  return typedAction
}
