import React, { ReactNode } from "react"
import { ToastContainer } from "react-toastify"

export type ToastProviderProps = {
  children: ReactNode
}

const ToastProvider = ({ children }: ToastProviderProps) => (
  <>
    <ToastContainer
      closeOnClick
      draggable
      newestOnTop
      pauseOnFocusLoss
      pauseOnHover
      position="bottom-left"
    />
    {children}
  </>
)

export default ToastProvider
