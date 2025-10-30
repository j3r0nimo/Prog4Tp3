import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { worker } from './mocks/browser'

// Solo iniciar el worker en desarrollo
async function prepare() {
  if (import.meta.env.DEV) {
    await worker.start()
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

prepare()
