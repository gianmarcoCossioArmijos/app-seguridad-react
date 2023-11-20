import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"

import { login } from '../store/isAuth.js'
import axios from 'axios'
import { toast } from 'sonner';

const InicioSesion = () => {
    const [formulario, setFormulario] = useState({
        email: "",
        clave: ""
    })

    const dispatch = useDispatch();
    const naviagte = useNavigate();

    const handleChange = (event) => {

        const nombre = event.target.name;
        const valor = event.target.value;
        setFormulario({...formulario, [nombre]: valor});
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        const url = "https://alerta-jaen-backend.onrender.com/auth/login";
        let respuesta = "";
        
        try {
            respuesta = await axios.post(url, formulario);
            if (respuesta) {
        
                toast.success("Bienvenido")
                setFormulario({
                    email: "",
                    clave: ""
                })
                dispatch(login(respuesta.data))
            }
        } catch (error) {
            
            console.error(error.message);
        }

        if (respuesta) {
        
            localStorage.setItem("token",JSON.stringify(respuesta.data));
            toast.success("Bienvenido")
            setFormulario({
                email: "",
                clave: ""
            })
            naviagte("/noticias")
        } else {
            toast.error("Usuario no encontrado")
        }
    }

  return (
    <main className='w-full px-4 py-20 min-h-screen text-cyan-950'>

        <section className='w-full p-4 bg-white rounded-lg'>
            <h3 className='pb-8 text-4xl text-center font-bold'>Iniciar Sesion</h3>

            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4'>
                <label className='flex flex-col gap-2'>
                    Email
                    <input
                        type="email"
                        name='email'
                        value={formulario.email}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    Clave
                    <input
                        type="password"
                        name='clave'
                        value={formulario.clave}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <input
                    type="submit"
                    value="Iniciar Sesion"
                    className='w-full mt-6 mb-6 p-3 text-lg font-bold rounded-lg border-2 border-cyan-950 bg-yellow-500 hover:bg-yellow-400'/>
            </form>

            <div className='w-full flex flex-col gap-1 text-center text-sm'>
                <Link to="/recuperar-cuenta">
                    ¿Haz olvidado tu contraseña? <strong>Recupera tu contraseña</strong>
                </Link>

                <Link to="/registro">
                    ¿Aun no estas registrado? <strong>Registrate aqui</strong>
                </Link>
            </div>

        </section>

    </main>
  )
}

export default InicioSesion