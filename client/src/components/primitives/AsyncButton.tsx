import { useAsyncHandler } from "hooks/useAsyncHandler"
import React from "react"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export type AsyncButtonProps = Omit<ButtonProps, "onClick" | "onError"> & {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<any>
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
