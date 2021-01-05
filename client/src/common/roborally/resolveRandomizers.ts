import update from "immutability-helper"

import { isRandomizer } from "./model/CellData"
import { isAffectedByCells } from "./model/RoborallyPlayer"
import { RoborallyContext } from "./RoborallyContext"

export async function resolveRandomizers(
  ctx: RoborallyContext,
  sequence: number
) {
  const deck = ctx.getDeck().slice()

  const updateCount = ctx.updatePlayers(player => {
    const cell = ctx.getCell(player.pos)
    if (isRandomizer(cell) && isAffectedByCells(player)) {
      const randomCard = deck.shift()
      if (randomCard !== undefined) {
        return update(player, {
          program: {
            [sequence]: {
              $set: randomCard,
            },
          },
        })
      } else {
        console.error("Deck is empty")
      }
    }

    return false
  })

  if (updateCount > 0) {
    ctx.mergeState({ deck })
    await ctx.post()
  }
}
