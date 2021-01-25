import { useState, useCallback } from "react"
import { toast } from "react-toastify"

export type Params = any[]
export type AsyncFn<P extends Params, T = any> = (...args: P) => Promise<T>

export function handleGenericError(error: Error) {
  console.error(error)
  toast.error(error.message)
}

export function useAsyncHandler<P extends Params>(
  handler: AsyncFn<P>,
  onError: (error: Error) => void = handleGenericError
): [AsyncFn<P, void>, boolean] {
  const [isRunning, setIsRunning] = useState(false)
  const safeHandler = useCallback(
    async (...args: P) => {
      if (!isRunning) {
        try {
          setIsRunning(true)
          await handler(...args)
        } catch (error) {
          onError(error)
        } finally {
          setIsRunning(false)
        }
      }
    },
    [handler, isRunning, onError]
  )
  return [safeHandler, isRunning]
}
