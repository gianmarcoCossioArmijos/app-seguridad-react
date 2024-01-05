import React, { useState } from 'react'

import { RiNewspaperLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

import axios from 'axios'
import { toast } from 'sonner'
import { useEffect } from 'react';

const NoticiasAdministracion = () => {
    const [noticias, setNoticias] = useState([]);
    const [formulario, setFormulario] = useState({
        id: "",
        imagen:"",
        titulo: "",
        descripcion: "",
        sector: ""
    })

    useEffect(() => {

        listarNoticias()
            .then(data => setNoticias(data));
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

    const handleChange = (event) => {

        const nombre = event.target.name;
        const valor = event.target.value;
        setFormulario({...formulario, [nombre]: valor});
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        if(formulario.id === "") {

            const url = "https://alerta-jaen-backend.onrender.com/noticias";
            try {

                const data = JSON.parse(localStorage.getItem("token"));
                const token = `Bearer ${data.access_token}`;
                const noticia = {
                    imagen: formulario.imagen,
                    titulo: formulario.titulo,
                    descripcion: formulario.descripcion,
                    sector: formulario.sector
                }
                await axios.post(url, noticia, {
                    headers: {
                        Authorization: token
                    }
                })
                toast.success("Se ha registrado una noticia exitosamente");
                listarNoticias()
                    .then(data => setNoticias(data));
            } catch (error) {
            console.error("Error en la solicitud:", error.message);
            }
        } else {

            const url = `https://alerta-jaen-backend.onrender.com/noticias/${formulario.id}`;
            try {

                const data = JSON.parse(localStorage.getItem("token"));
                const token = `Bearer ${data.access_token}`;
                await axios.patch(url, formulario, {
                    headers: {
                        Authorization: token
                    }
                })
                toast.success("Se ha actualizado noticia exitosamente");
                listarNoticias()
                    .then(data => setNoticias(data));
            } catch (error) {
            console.error("Error en la solicitud:", error.message);
            }
        }
        
        setFormulario({
            id: "",
            imagen:"",
            titulo: "",
            descripcion: "",
            sector: ""
        })
      }
    
  return (
    <main className='w-full px-4 py-10 min-h-screen flex flex-col gap-4 text-cyan-950'>

        <h4 className='p-4 flex items-center gap-4 text-lg font-bold bg-white rounded-lg'>
            Registrar Noticia
            <RiNewspaperLine />
        </h4>

        <section className='w-full p-4 bg-white rounded-lg'>

            <form
                onSubmit={handleSubmit}
                className='md:w-3/5 md:mx-auto flex flex-col gap-4'>

                <input
                    type="hidden"
                    name='id'
                    value={formulario.id}
                    onChange={handleChange}
                    className='p-3 rounded-lg bg-blue-50'
                    />

                <label className='flex flex-col gap-2'>
                    Titulo
                    <input
                        type="text"
                        name='titulo'
                        value={formulario.titulo}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    Descripcion
                    <input
                        type="text"
                        name='descripcion'
                        value={formulario.descripcion}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    Sector
                    <input
                        type="text"
                        name='sector'
                        value={formulario.sector}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    Imagen
                    <input
                        type="text"
                        name='imagen'
                        value={formulario.imagen}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <input
                    type="submit"
                    value="Registrar"
                    className='w-full mt-6 mb-6 p-3 text-lg font-bold rounded-lg border-2 border-cyan-950 bg-yellow-500 hover:bg-yellow-400'/>
            </form>
        </section>

        <h4 className='p-4 flex items-center gap-4 text-lg font-bold bg-white rounded-lg'>
            Lista de Noticias
            <RiNewspaperLine />
        </h4>

        <table className='w-full table-auto bg-white'>
            <thead className='text-sm'>
            <tr>
                <th className='border border-cyan-950'>ID</th>
                <th className='border border-cyan-950'>Titulo</th>
                <th className='border border-cyan-950'>Descripcion</th>
                <th className='border border-cyan-950'>Sector</th>
                <th className='border border-cyan-950'>Imagen</th>
                <th className='border border-cyan-950'>Opciones</th>
            </tr>
            </thead>

            <tbody className='text-xs'>

            {noticias?.map(noticia => {
                return (
                <tr
                    key={noticia.id}
                    className='border border-cyan-950'>
                    <th className='border border-cyan-950'>{noticia.id}</th>
                    <th className='border border-cyan-950'>{noticia.titulo}</th>
                    <th className='border border-cyan-950'>{noticia.descripcion}</th>
                    <th className='border border-cyan-950'>{noticia.sector}</th>
                    <th className='border border-cyan-950'>{noticia.imagen}</th>
                    <th className='flex p-1 justify-center gap-1'>
                        <BiEdit
                            onClick={() => setFormulario({
                                id: noticia.id,
                                titulo :noticia.titulo,
                                descripcion: noticia.descripcion,
                                sector: noticia.sector,
                                imagen: noticia.imagen
                            })}
                            className='w-[30px] h-[30px] p-1 bg-yellow-500 hover:bg-yellow-400 rounded-lg text-white'/>
                    </th>
                </tr>
                )
            })}
            </tbody>
        </table>

    </main>
  )
}

export default NoticiasAdministracion