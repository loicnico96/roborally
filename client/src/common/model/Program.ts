import { Card } from "./Card"

export type Program = [
  Card | null,
  Card | null,
  Card | null,
  Card | null,
  Card | null,
]

export function getEmptyProgram(): Program {
  return [null, null, null, null, null]
}
