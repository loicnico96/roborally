import { GameType } from "common/GameSettings"

export function getGameLabel(gameType: GameType): string {
  return {
    [GameType.METROPOLYS]: "Metropolys",
    [GameType.ROBORALLY]: "Roborally",
  }[gameType]
}
