import React from 'react'

import App from './App'
import './app.module.scss'
import { BrowserRouter } from 'react-router-dom'

import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement!)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
