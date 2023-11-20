import React from 'react'
import Base from '../capas/Base'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../store/configureSlice.js'

import Inicio from '../paginas/Inicio'
import Registro from '../paginas/Registro'
import InicioSesion from '../paginas/InicioSesion'
import Noticias from '../paginas/Noticias'
import RecuperarClave from '../paginas/RecuperarClave.jsx'
import Denuncia from '../paginas/Denuncia.jsx'
import MenuAdministracion from '../paginas/MenuAdministracion.jsx'
import UsuariosAdministracion from '../paginas/UsuariosAdministracion.jsx'
import NoticiasAdministracion from '../paginas/NoticiasAdministracion.jsx'
import ZonasAdministracion from '../paginas/ZonasAdministracion.jsx'
import VehiculosAdministracion from '../paginas/VehiculosAdministracion.jsx'

const Enrutador = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Base>
              <Routes>

                  <Route path='/' element={ <Inicio /> }/>
                  <Route path='/registrar' element={ <Registro /> }/>
                  <Route path='/iniciar-sesion' element={ <InicioSesion /> }/>
                  <Route path='/recuperar-cuenta' element={ <RecuperarClave /> }/>

                  <Route path='/noticias' element={ <Noticias /> }/>
                  <Route path='/denunciar' element={ <Denuncia /> }/>
                  <Route path='/administracion' element={ <MenuAdministracion /> }/>
                  <Route path='/usuarios-administracion' element={ <UsuariosAdministracion /> }/>
                  <Route path='/noticias-administracion' element={ <NoticiasAdministracion /> }/>
                  <Route path='/zonas-administracion' element={ <ZonasAdministracion /> }/>
                  <Route path='/vehiculos-administracion' element={ <VehiculosAdministracion /> }/>

              </Routes>
          </Base>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default Enrutador