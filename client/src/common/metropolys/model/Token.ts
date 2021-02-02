export enum Token {
  FANCY = "fancy",
  METRO = "metro",
  RUINS = "ruins",
}

export const TOKEN_COUNT: Record<number, Record<Token, number>> = {
  2: {
    [Token.FANCY]: 5,
    [Token.METRO]: 6,
    [Token.RUINS]: 6,
  },
  3: {
    [Token.FANCY]: 8,
    [Token.METRO]: 7,
    [Token.RUINS]: 7,
  },
  4: {
    [Token.FANCY]: 9,
    [Token.METRO]: 9,
    [Token.RUINS]: 9,
  },
}
