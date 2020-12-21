import { Component, PropsWithChildren } from "react"

import { toError } from "common/utils/errors"

export type ErrorComponentProps = {
  error: Error
}

export type ErrorBoundaryProps = PropsWithChildren<{
  onError?: (error: Error) => void
  renderError?: (error: Error) => JSX.Element
}>

export type ErrorBoundaryState = {
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(rawError: unknown): ErrorBoundaryState {
    return { error: toError(rawError) }
  }

  componentDidCatch(rawError: unknown, errorInfo: unknown) {
    const { onError } = this.props

    console.error("Caught in ErrorBoundary:", rawError, errorInfo)

    if (onError) {
      onError(toError(rawError))
    }
  }

  render() {
    const { children, renderError } = this.props
    const { error } = this.state

    if (error !== null) {
      return renderError ? renderError({ error }) : error.message
    }

    return children
  }
}

export default ErrorBoundary
