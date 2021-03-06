import React from "react"

import { useAsyncHandler } from "hooks/useAsyncHandler"

export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export type AsyncButtonProps = Omit<ButtonProps, "onClick" | "onError"> & {
  onClick: (event: ButtonClickEvent) => Promise<any>
  onError?: (error: Error) => void
}

const AsyncButton = (props: AsyncButtonProps) => {
  const { disabled = false, onClick, onError, ...restProps } = props

  const [onClickAsync, isLoading] = useAsyncHandler(onClick, onError)

  return (
    <button
      disabled={disabled || isLoading}
      onClick={onClickAsync}
      {...restProps}
    />
  )
}

export default AsyncButton
