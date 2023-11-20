import React from 'react'
import ReactDOM from 'react-dom/client'
import Enrutador from './rutas/Enrutador.jsx'
import './index.css'
import { Toaster } from 'sonner'
import '../src/App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
      <Enrutador />
      <Toaster
          richColors
          position="bottom-center"/>
    </>
)
