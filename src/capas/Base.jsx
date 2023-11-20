import React from 'react'

import Navegacion from '../componentes/Navegacion'
import PiePagina from '../componentes/PiePagina'
import MenuNavegacion from '../componentes/MenuNavegacion'

const Base = (props) => {
  return (
    <div className='w-full min-h-screen bg-blue-100'>

        <Navegacion />

        <div className='w-full min-h-screen relative'>

          <MenuNavegacion />
          {props.children}
          
        </div>

        <PiePagina />

    </div>
  )
}

export default Base