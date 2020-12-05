import React from "react"
import ReactDOM from "react-dom"

import "./index.css"
import App from "./App"
import ToastProvider from "./components/ToastProvider"

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
