import { useState, useCallback } from "react"

export type Params = any[]
export type Fn<P extends Params, T = any> = (...args: P) => T
export type AsyncFn<P extends Params, T = any> = (...args: P) => Promise<T>
export type ErrorHandler = (error: Error) => any

export function useAsyncHandler<P extends Params>(
  handler: AsyncFn<P>,
  onError: ErrorHandler = console.error
): [AsyncFn<P, void>, boolean] {
  const [running, setRunning] = useState(false)
  const safeHandler = useCallback(
    async (...args: P) => {
      if (!running) {
        try {
          setRunning(true)
          await handler(...args)
        } catch (error) {
          onError(error)
        } finally {
          setRunning(false)
        }
      }
    },
    [handler, running, onError]
  )
  return [safeHandler, running]
}
