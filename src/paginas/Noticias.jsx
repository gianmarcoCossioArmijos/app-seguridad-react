import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { HiLocationMarker } from "react-icons/hi";
import { FaTools } from "react-icons/fa";
import { MdOutlineLocalPolice } from "react-icons/md";
import { RiAlarmWarningFill } from "react-icons/ri";

import axios from 'axios'
import { toast } from 'sonner';
import enviarAlerta from '../utils/alerta.js'
import { useEffect } from 'react';

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);
    const [ubicacion, setUbicacion] = useState({
        latitud: "",
        longitud: ""
    })

    useEffect(() => {

        listarNoticias().
            then(data => setNoticias(data))
    }, [])

    const listarNoticias = async() => {

        const url = "https://alerta-jaen-backend.onrender.com/noticias";
        let respuesta;
        try {
    
            const data = JSON.parse(localStorage.getItem("token"));
            const token = `Bearer ${data.access_token}`;
            respuesta = await axios.get(url, {
                headers: {
                  Authorization: token
                }
            })
        } catch (error) {
            console.error("Error en la solicitud:", error.message);
        }
        return respuesta.data;
    }

    const handleClick = async() => {

        let respuesta;

        if ("position" in navigator.geolocation) {

            navigator.geolocation.getCurrentPosition((position) => {

              const latitud = position.coords.latitude;
              const longitud = position.coords.longitude;
              setUbicacion({
                latitud: latitud,
                longitud: longitud
              })
            });

            try {

                respuesta = await enviarAlerta(ubicacion);
            } catch (error) {
                console.error("Error en la solicitud:", error.message);
            }

            if (respuesta) {
        
                toast.success("La alerta fue enviada a las autoridades")
                setUbicacion({
                    latitud: "",
                    longitud: ""
                })
            }
        } else {
            toast.error("Su navegador no soporta geolocalizacion")
        }
    }

  return (
    <main className='w-full p-4 min-h-screen flex flex-col gap-4 text-cyan-950'>

        <section
            to="/denunciar"
            onClick={handleClick}
            className='p-3 flex justify-center items-center bg-red-600 hover:bg-red-500 rounded-full text-center text-white font-bold'>

            <p className='p-2'>Enviar Alerta de Emergencia</p>
            <RiAlarmWarningFill className='h-[40px] w-[40px] py-2'/>
        </section>

        <section className='w-full p-4 flex justify-center items-center gap-4 bg-white rounded-lg'>

            <Link
                to="/denunciar"
                className='px-2 flex items-center bg-yellow-400 hover:bg-yellow-500 rounded-lg font-bold'>

                <p className='p-2'>Denunciar</p>
                <MdOutlineLocalPolice className='h-[40px] w-[40px] py-2'/>
            </Link>

            <Link
                to="/administracion"
                className='px-2 flex items-center bg-yellow-400 hover:bg-yellow-500 rounded-lg font-bold'>
                <FaTools className='h-[40px] w-[40px] py-2'/>
            </Link>
        </section>

        <section className='w-full p-4 flex flex-col gap-4 bg-white rounded-lg'>

            {noticias?.map(noticia => {
                return (
                    <div
                        key={noticia?.id}
                        className='w-full p-3 flex flex-col bg-blue-50 rounded-lg border-2 border-blue-100'>

                        <img
                            src={noticia.imagen}
                            alt="noticia"
                            className='w-full h-[150px] object-cover'/>
                        <h4 className='font-bold text-2xl'>{noticia.titulo}</h4>
                        <p className='flex gap-4 font-bold'>
                            <HiLocationMarker className='my-auto text-yellow-500'/>
                            {noticia.sector}
                        </p>
                        <p className='text-lg'>{noticia.descripcion}</p>

                    </div>
                ) 
            })}
    
        </section>

    </main>
  )
}

export default Noticias