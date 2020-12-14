import styled, { ThemedStyledFunction } from "styled-components"

import { ObjectRecord } from "common/utils/objects"

export function styledDivWithProps<
  T extends ObjectRecord
>(): ThemedStyledFunction<"div", any, T, never> {
  return styled.div as ThemedStyledFunction<"div", any, T, never>
}
