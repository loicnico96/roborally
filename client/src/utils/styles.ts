import styled, { ThemedStyledFunction } from "styled-components"

import { ObjectRecord } from "common/utils/objects"

export type Stylable = keyof JSX.IntrinsicElements | React.ComponentType<any>

export function styledWithProps<C extends Stylable, T extends ObjectRecord>(
  Component: C
) {
  return styled(Component) as ThemedStyledFunction<C, never, T>
}

export function styledDivWithProps<T extends ObjectRecord>() {
  return styled.div as ThemedStyledFunction<"div", never, T>
}
