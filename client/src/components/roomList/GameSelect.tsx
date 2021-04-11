import React, { useCallback } from "react"

import { GameType } from "common/GameSettings"
import { enumValues, isEnum } from "common/utils/enums"

import { getGameLabel } from "./utils/getters"

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export type GameSelectProps = Omit<SelectProps, "onChange" | "value"> & {
  gameType?: GameType
  onChange: (gameType: GameType | undefined) => void
}

const VALUE_ALL = "all"

const GameSelect = ({ gameType, onChange, ...props }: GameSelectProps) => {
  const onSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target
      onChange(isEnum(value, GameType) ? value : undefined)
    },
    [onChange]
  )

  return (
    <select {...props} onChange={onSelect} value={gameType ?? VALUE_ALL}>
      <option key={VALUE_ALL} value={VALUE_ALL}>
        All games
      </option>
      {enumValues(GameType).map(game => (
        <option key={game} value={game}>
          {getGameLabel(game)}
        </option>
      ))}
    </select>
  )
}

export default GameSelect
