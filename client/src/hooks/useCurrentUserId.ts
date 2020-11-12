import { PlayerId } from "common/model/RoborallyPlayer"
import { useSearchParams } from "./useSearchParams"

export function useCurrentUserId(): PlayerId {
  // TODO: Use Firebase Auth
  const searchParamPlayerId = useSearchParams().get("p") ?? "1"
  return `id_player_${searchParamPlayerId}`
}
