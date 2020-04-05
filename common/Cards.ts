export type Card = number
export type CardAction =
  | 'move_1'
  | 'move_2'
  | 'move_3'
  | 'move_back'
  | 'turn_left'
  | 'turn_right'
  | 'turn_reverse'

const CARD_ACTIONS: [CardAction, number][] = [
  ['turn_reverse', 6],
  ['turn_left', 18],
  ['turn_right', 18],
  ['move_back', 6],
  ['move_1', 18],
  ['move_2', 12],
  ['move_3', 6],
]

const CARDS = []
for (const [action, count] of CARD_ACTIONS) {
  for (let i = 0; i < count; i++) {
    CARDS.push(action)
  }
}

export function is_valid_card(card: unknown): card is Card {
  return typeof card === 'number' && card >= 0 && card < CARDS.length
}

export function get_priority(card: Card): number {
  return card * 10 + 10
}

export function get_action(card: Card): CardAction {
  return CARDS[card]
}
