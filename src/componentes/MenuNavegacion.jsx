import React from 'react'

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MenuNavegacion = () => {

  const menu = useSelector((state) => state.menu);

  return (
    <div className={`${menu} h-full flex flex-col gap-12 absolute bg-black/80 font-bold text-xl text-center text-white overflow-hidden`}>

        <Link
            to="/"
            className='px-6 pt-20'>
          Inicio
        </Link>

        <Link
            to="/iniciar-sesion"
            className='px-6'>
          Iniciar Sesion
        </Link>

        <Link
            to="/registrar"
            className='px-6'>
          Registrarme
        </Link>

    </div>
  )
}

export default MenuNavegacion