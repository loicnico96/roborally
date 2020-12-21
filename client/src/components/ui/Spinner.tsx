import React from "react"
import Loader from "react-loader-spinner"

export const DEFAULT_SIZE = 60
export const SPINNER_COLOR = "blue"
export const SPINNER_TYPE = "RevolvingDot"

export type SpinnerProps = {
  size?: number
}

const Spinner = ({ size = DEFAULT_SIZE }: SpinnerProps) => (
  <Loader
    color={SPINNER_COLOR}
    type={SPINNER_TYPE}
    height={size}
    width={size}
  />
)

export default Spinner
