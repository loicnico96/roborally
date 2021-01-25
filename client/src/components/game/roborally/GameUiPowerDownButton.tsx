import React, { useCallback } from "react"

export type GameUiPowerDownButtonProps = {
  disabled?: boolean
  isPoweredDown: boolean
  onChange?: (down: boolean) => void
  titlePoweredDown: string
  titlePoweredUp: string
}

const GameUiPowerDownButton = ({
  disabled = false,
  isPoweredDown,
  onChange,
  titlePoweredDown,
  titlePoweredUp,
}: GameUiPowerDownButtonProps) => {
  const onClick = useCallback(() => {
    if (onChange) {
      onChange(!isPoweredDown)
    }
  }, [isPoweredDown, onChange])

  return (
    <button disabled={disabled} onClick={onClick}>
      {isPoweredDown ? titlePoweredDown : titlePoweredUp}
    </button>
  )
}

export default GameUiPowerDownButton
