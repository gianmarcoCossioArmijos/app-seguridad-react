import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"

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
        const urlLogin = "https://alerta-jaen-backend.onrender.com/auth/login";
        const urlUsuario = "https://alerta-jaen-backend.onrender.com/usuarios/";
        let respuesta = "";
        let auth = "";
        
        try {

            respuesta = await axios.post(urlLogin, formulario);

            if (respuesta) {
            
                const token = `Bearer ${respuesta.data.access_token}`;
                auth = await axios.get(urlUsuario + formulario.email,{
                    headers: {
                        Authorization: token
                    }
                })
                
                if (auth.data.rol_id === 1) {
    
                    toast.success("Bienvenido")
                    localStorage.setItem("token", JSON.stringify(respuesta.data));
                    dispatch(login());

                    setFormulario({
                        email: "",
                        clave: ""
                    })
                    naviagte("/noticias")
                } else {
                    toast.error("Usuario no autorizado")
                }
            } else {
                toast.error("Usuario no encontrado")
            }
        } catch (error) {

            console.error(error.message);
            toast.error("Usuario no encontrado")
        }
    }

  return (
    <main className='w-full px-4 py-20 min-h-screen text-cyan-950'>

        <section className='w-full md:w-3/5 md:mx-auto p-4 bg-white rounded-lg'>
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

                <Link to="/registrar">
                    ¿Aun no estas registrado? <strong>Registrate aqui</strong>
                </Link>
            </div>

        </section>

    </main>
  )
}

export default InicioSesion