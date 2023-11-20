import React, { useState } from 'react'

import { TbMapCog } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";

import axios from 'axios'
import { toast } from 'sonner'
import { useEffect } from 'react';

const ZonasAdministracion = () => {
    const [zonas, setZonas] = useState([]);
    const [formulario, setFormulario] = useState({
        id: "",
        nombre:""
    })

    useEffect(() => {

        listarZonas()
            .then(data => setZonas(data));
    }, [])

    const listarZonas = async() => {

        const url = "https://alerta-jaen-backend.onrender.com/zonas";
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

            const url = "https://alerta-jaen-backend.onrender.com/zonas";
            try {

                const data = JSON.parse(localStorage.getItem("token"));
                const token = `Bearer ${data.access_token}`;
                const zona = {
                    nombre: formulario.nombre,
                }
                await axios.post(url, zona, {
                    headers: {
                        Authorization: token
                    }
                })
                toast.success("Se ha registrado una zona con exito");
                listarZonas()
                    .then(data => setZonas(data));
            } catch (error) {
            console.error("Error en la solicitud:", error.message);
            }
        } else {

            const url = `https://alerta-jaen-backend.onrender.com/zonas/${formulario.id}`;
            try {

                const data = JSON.parse(localStorage.getItem("token"));
                const token = `Bearer ${data.access_token}`;
                await axios.patch(url, formulario, {
                    headers: {
                        Authorization: token
                    }
                })
                toast.success("Se ha actualizado zona con exito");
                listarZonas()
                    .then(data => setZonas(data));
            } catch (error) {
            console.error("Error en la solicitud:", error.message);
            }
        }
        
        setFormulario({
            id: "",
            nombre:""
        })
      }
    
  return (
    <main className='w-full px-4 py-10 min-h-screen flex flex-col gap-4 text-cyan-950'>

        <h4 className='p-4 flex items-center gap-4 text-lg font-bold bg-white rounded-lg'>
            Registrar Zona
            <TbMapCog />
        </h4>

        <section className='w-full p-4 bg-white rounded-lg'>

            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4'>

                <input
                    type="hidden"
                    name='id'
                    value={formulario.id}
                    onChange={handleChange}
                    className='p-3 rounded-lg bg-blue-50'
                    />

                <label className='flex flex-col gap-2'>
                    Nombre
                    <input
                        type="text"
                        name='nombre'
                        value={formulario.nombre}
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
            Lista de Zonas
            <TbMapCog />
        </h4>

        <table className='w-full table-auto bg-white'>
            <thead className='text-sm'>
            <tr>
                <th className='border border-cyan-950'>ID</th>
                <th className='border border-cyan-950'>Nombre</th>
                <th className='border border-cyan-950'>Opciones</th>
            </tr>
            </thead>

            <tbody className='text-xs'>

            {zonas?.map(zona => {
                return (
                <tr
                    key={zona.id}
                    className='border border-cyan-950'>
                    <th className='border border-cyan-950'>{zona.id}</th>
                    <th className='border border-cyan-950'>{zona.nombre}</th>
                    <th className='flex p-1 justify-center gap-1'>
                        <BiEdit
                            onClick={() => setFormulario({
                                id: zona.id,
                                nombre: zona.nombre,
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

export default ZonasAdministracion