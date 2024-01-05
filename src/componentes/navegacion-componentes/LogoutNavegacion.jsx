import React from 'react'
import { Link } from 'react-router-dom'

import { FaTools } from "react-icons/fa";
import { useDispatch } from "react-redux"
import { logout } from '../../store/isAuth.js'

const LogoutNavegacion = () => {

  const dispatch = useDispatch();

  const handleClick = () => {

    dispatch(logout());
  }

  return (
    <>
        <Link
            to="/noticias"
            className='h-full w-[45px] bg-yellow-500 hover:bg-yellow-400 rounded-lg'>
          <img
            src="https://i.postimg.cc/zXPwjMVw/news-svgrepo-com.png"
            className='h-[45px] w-[45px] p-1'
            alt="noticias" />
        </Link>

        <Link
          to="/administracion"
          className='px-2 flex items-center bg-yellow-400 hover:bg-yellow-500 rounded-lg font-bold text-cyan-950'>
          <FaTools className='h-[40px] w-[40px] py-2'/>
        </Link>

        <p
            onClick={handleClick}
            className='h-full px-2 flex flex-col justify-center bg-black/30 hover:bg-cyan-900 rounded-lg font-bold text-white'>
          Cerrar Sesion
        </p>
    </>
  )
}

export default LogoutNavegacion