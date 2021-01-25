import { isSamePos } from "./model/Position"
import { RoborallyContext } from "./model/RoborallyContext"
import { RoborallyEvent } from "./model/RoborallyEvent"
import { isAlive, isVirtual, materializePlayer } from "./model/RoborallyPlayer"

export async function resolveVirtualPlayers(ctx: RoborallyContext) {
  const updateCount = ctx.updatePlayers((player, playerId) => {
    if (isAlive(player) && isVirtual(player)) {
      const collidingPlayerId = ctx.findPlayer((otherPlayer, otherPlayerId) => {
        if (playerId === otherPlayerId) {
          return false
        }

        return isAlive(otherPlayer) && isSamePos(player.pos, otherPlayer.pos)
      })

      if (collidingPlayerId !== undefined) {
        return false
      }

      return materializePlayer(player)
    }

    return false
  })

  if (updateCount > 0) {
    await ctx.post(RoborallyEvent.MATERIALIZE)
  }
}
