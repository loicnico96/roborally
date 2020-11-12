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

export type DeckSpec = {
  actions: CardAction[]
  count: number
}[]

function buildActions(deckSpec: DeckSpec): CardAction[] {
  return deckSpec.reduce<CardAction[]>((deck, spec) => {
    for (let i = 0; i < spec.count; i++) {
      deck.push(...spec.actions)
    }
    return deck
  }, [])
}

const DEFAULT_DECK_SPEC: DeckSpec = [
  {
    actions: [CardAction.ROTATE_BACK],
    count: 6,
  },
  {
    actions: [CardAction.ROTATE_LEFT, CardAction.ROTATE_RIGHT],
    count: 18,
  },
  {
    actions: [CardAction.MOVE_BACK],
    count: 6,
  },
  {
    actions: [CardAction.MOVE_1],
    count: 18,
  },
  {
    actions: [CardAction.MOVE_2],
    count: 12,
  },
  {
    actions: [CardAction.MOVE_3],
    count: 6,
  },
]

const CARD_ACTIONS = buildActions(DEFAULT_DECK_SPEC)

export function isValidCard(card: Card): boolean {
  return Number.isInteger(card) && card >= 0 && card < CARD_ACTIONS.length
}

export function getCardAction(card: Card): CardAction {
  return CARD_ACTIONS[card]
}

export function getCardPriority(card: Card): number {
  return (card + 1) * 10
}

export function getAllCards(): Card[] {
  return Array(CARD_ACTIONS.length)
    .fill(0)
    .map((_, i) => i)
}
