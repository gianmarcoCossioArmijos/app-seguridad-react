import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux"
import { hidde, show } from '../store/menuSlice.js'
import LoginNavegacion from './navegacion-componentes/LoginNavegacion.jsx'
import LogoutNavegacion from './navegacion-componentes/LogoutNavegacion.jsx'
 
const Navegacion = () => {

  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu);
  const isauth = useSelector((state) => state.isauth);

  useEffect(() => {

  }, [isauth])

  const handleClick = () => {

    if (menu === "open") {
        
        dispatch(hidde());
    } else {
        
        dispatch(show());
    }
  }

  return (
    <header className='w-full h-[60px] px-3 flex justify-between bg-cyan-950'>

      <Link
        to="/">
        <img
            src="https://i.postimg.cc/cJznNb3x/logo-alerta-jaen.png"
            className='h-full p-3'
            alt="logo" />
      </Link>

      <div className='h-full my-auto p-2 flex gap-3'>

        {isauth !== "" ? <LogoutNavegacion /> : <LoginNavegacion />}

        <img
            onClick={handleClick}
            src="https://i.postimg.cc/rsgpJvjS/menu-boxed-svgrepo-com.png"
            className='h-[45px] w-[45px] p-1 bg-black/30 hover:bg-cyan-900 rounded-lg'
            alt="logo" />

      </div>

    </header>
  )
}

export default Navegacion