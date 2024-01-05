import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { HiLocationMarker } from "react-icons/hi";
import { RiAlarmWarningFill } from "react-icons/ri";

import axios from 'axios'
import { useEffect } from 'react';

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {

        listarNoticias().
            then(data => setNoticias(filtrarNoticias(data)))
    }, [])

    const filtrarNoticias = (noticias) => {

        const noticiasLongitud = 4;
        let nuevaListaNoticias = [];

        for (let i = noticiasLongitud; i > 0; i--) {

            nuevaListaNoticias.push(noticias[i]);
        }

        return nuevaListaNoticias;
    }

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

  return (
    <main className='w-full p-4 min-h-screen flex flex-col gap-4 text-cyan-950'>

        <Link
            to="/denunciar"
            className='md:w-3/5 md:mx-auto p-3 flex justify-center items-center bg-yellow-400 hover:bg-yellow-500 rounded-lg text-center font-bold'>
            <p className='p-2'>Denunciar</p>
            <RiAlarmWarningFill className='h-[40px] w-[40px] py-2'/>
        </Link>

        <section className='w-full md:w-3/5 md:mx-auto p-4 flex flex-col gap-4 bg-white rounded-lg'>

            {noticias?.map(noticia => {
                return (
                    <div
                        key={noticia?.id}
                        className='w-full p-3 flex flex-col bg-blue-50 rounded-lg border-2 border-blue-100'>

                        <img
                            src={noticia.imagen}
                            alt="noticia"
                            className='w-full h-[150px] md:h-[250px] object-cover'/>
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