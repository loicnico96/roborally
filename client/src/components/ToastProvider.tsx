import React from "react"
import { ToastContainer } from "react-toastify"

const TOAST_DURATION = 5000

const ToastProvider = () => (
  <ToastContainer
    autoClose={TOAST_DURATION}
    closeOnClick
    newestOnTop
    pauseOnFocusLoss
    pauseOnHover
    position="bottom-left"
  />
)

export default ToastProvider
