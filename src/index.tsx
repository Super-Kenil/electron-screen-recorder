import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './app'
import { HashRouter } from "react-router-dom"

const root = createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <App />
  </HashRouter>
)