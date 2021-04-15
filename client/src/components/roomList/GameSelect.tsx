import React, { useCallback } from "react"

import { GameType } from "common/GameSettings"
import { enumValues, isEnum } from "common/utils/enums"
import { useTranslations } from "hooks/useTranslations"

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export type GameSelectProps = Omit<SelectProps, "onChange" | "value"> & {
  gameType?: GameType
  onChange: (gameType: GameType | undefined) => void
}

const VALUE_ALL = "all"

const GameSelect = ({ gameType, onChange, ...props }: GameSelectProps) => {
  const t = useTranslations()

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
        {t.roomList.allGames}
      </option>
      {enumValues(GameType).map(game => (
        <option key={game} value={game}>
          {t.games[game].name}
        </option>
      ))}
    </select>
  )
}

export default GameSelect
