import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector  } from "react-redux"

const Privada = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token') || "");
  
  const auth = useSelector((state) => state.isauth);
  const navigate = useNavigate();

  useEffect(() => {

    if (isAuth === "") {
        navigate("/iniciar-sesion");
    }
  }, [])

  useEffect(() => {

    const auth = localStorage.getItem('token') || "";

    if (auth === "") {
      navigate("/iniciar-sesion");
    }
  }, [auth])

  return (
    <>

      <Outlet />

    </>
  )
}

export default Privada