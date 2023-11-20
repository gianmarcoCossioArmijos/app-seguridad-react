import React from 'react'
import { Link } from 'react-router-dom'

const LoginNavegacion = () => {

  return (
    <>
        <Link
            to="/iniciar-sesion"
            className='h-full px-2 flex flex-col justify-center bg-yellow-500 hover:bg-yellow-400 rounded-lg'>
          <img
            src="https://i.postimg.cc/J4C4b7pt/login-svgrepo-com.png"
            className='h-[45px] w-[45px] p-1'
            alt="login" />
        </Link>

        <Link
            to="/registrar"
            className='h-full px-2 flex flex-col justify-center bg-black/30 hover:bg-cyan-900 rounded-lg font-bold text-white'>
          Registrarme
        </Link>
    </>
  )
}

export default LoginNavegacion