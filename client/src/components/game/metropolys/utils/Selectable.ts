import { Stylable, styledWithProps } from "utils/styles"

export type SelectableProps = {
  isSelectable: boolean
  isSelected: boolean
}

export function Selectable<C extends Stylable>(Component: C) {
  return styledWithProps<C, SelectableProps>(Component)`
    border-width: ${props => (props.isSelected ? 3 : 1)}px;
    box-sizing: border-box;
    cursor: ${props => (props.isSelectable ? "pointer" : "not-allowed")};
    font-weight: ${props => (props.isSelected ? "bold" : "normal")};
  `
}
