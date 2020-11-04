export type Card = number

export enum CardAction {
  MOVE_1 = "move_1",
  MOVE_2 = "move_2",
  MOVE_3 = "move_3",
  MOVE_BACK = "move_back",
  ROTATE_LEFT = "rotate_left",
  ROTATE_RIGHT = "rotate_right",
  ROTATE_BACK = "rotate_back",
}

const ACTION_COUNTS: Record<CardAction, number> = {
  [CardAction.MOVE_1]: 20,
  [CardAction.MOVE_2]: 20,
  [CardAction.MOVE_3]: 20,
  [CardAction.MOVE_BACK]: 20,
  [CardAction.ROTATE_LEFT]: 20,
  [CardAction.ROTATE_RIGHT]: 20,
  [CardAction.ROTATE_BACK]: 20,
}

const ACTION_PRIORITY_ORDER = [
  CardAction.ROTATE_BACK,
  CardAction.ROTATE_LEFT,
  CardAction.ROTATE_RIGHT,
  CardAction.MOVE_BACK,
  CardAction.MOVE_1,
  CardAction.MOVE_2,
  CardAction.MOVE_3,
]

const CARD_ACTIONS = ACTION_PRIORITY_ORDER.reduce((actions, action) => {
  for (let i = 0; i < ACTION_COUNTS[action]; i++) {
    actions.push(action)
  }
  return actions
}, [] as CardAction[])

export function isValidCard(card: Card): boolean {
  return Number.isInteger(card) && card >= 0 && card < CARD_ACTIONS.length
}

export function getCardAction(card: Card): CardAction {
  return CARD_ACTIONS[card]
}

export function getCardPriority(card: Card): number {
  return card * 10
}

export function getAllCards(): Card[] {
  return Array(CARD_ACTIONS.length).map((_, i) => i)
}
