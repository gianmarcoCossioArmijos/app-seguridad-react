import React, { useState } from 'react'

import { RiAlarmWarningFill } from "react-icons/ri";
import { MdOutlineDisabledByDefault } from "react-icons/md";

import axios from 'axios'
import { toast } from 'sonner'
import { useEffect } from 'react';
import {FECHA_HOY} from '../constantes/fecha.js'

const DenunciasAdministracion = () => {
    const [fecha, setFecha] = useState(FECHA_HOY);
    const [denuncias, setDenuncias] = useState([]);

    useEffect(() => {

        listarDenuncias(fecha)
            .then(data => setDenuncias(data));
    }, [])

    const listarDenuncias = async(fecha) => {

        const url = `https://alerta-jaen-backend.onrender.com/denuncias/${fecha}`;
        let respuesta;
    
        try {
    
          const data = JSON.parse(localStorage.getItem("token"));
          const token = `Bearer ${data.access_token}`;
          respuesta = await axios.get(url,{
              headers: {
                Authorization: token
              }
          })
        } catch (error) {
          console.error("Error en la solicitud:", error.message);
        }
        return respuesta.data;
      }

    const handleSubmit = (event) => {

        event.preventDefault();
        listarDenuncias(fecha)
            .then(data => setDenuncias(data));     
    }

    const handleDelete = async(id) => {

        const url = `https://alerta-jaen-backend.onrender.com/vehiculos/${id}`;
            try {

                const data = JSON.parse(localStorage.getItem("token"));
                const token = `Bearer ${data.access_token}`;
                await axios.patch(url, {
                    headers: {
                        Authorization: token
                    }
                })
                toast.success("Se ha marcado denuncia como atentida exitosamente");
                listarDenuncias(fecha)
                    .then(data => setDenuncias(data));
            } catch (error) {
            console.error("Error en la solicitud:", error.message);
            }
    }
    
  return (
    <main className='w-full px-4 py-10 min-h-screen flex flex-col gap-4 text-cyan-950'>

        <h4 className='flex items-center gap-4 p-2 text-lg font-bold bg-white rounded-lg'>
            Denuncias por Fecha
            <RiAlarmWarningFill />
        </h4>

        <section className='w-full p-4 bg-white rounded-lg'>
            <form
                onSubmit={handleSubmit}
                className='flex gap-4'>

                <input
                    type="date"
                    name='fecha'
                    value={fecha}
                    onChange={(event) => setFecha(event.target.value)}
                    className='w-5/6 p-2 rounded-lg bg-blue-50'
                    required/>

                <input
                    type="submit"
                    value="Buscar"
                    className='w-1/6 p-2 font-bold rounded-lg border-2 border-cyan-950 bg-yellow-500 hover:bg-yellow-400'/>
            </form>
        </section>

      <table className='w-full table-auto bg-white'>
        <thead className='text-sm'>
          <tr>
            <th className='border border-cyan-950'>ID</th>
            <th className='border border-cyan-950'>Telefono</th>
            <th className='border border-cyan-950'>Tipo</th>
            <th className='border border-cyan-950'>Descripcion</th>
            <th className='border border-cyan-950'>Ubicacion</th>
            <th className='border border-cyan-950'>Estado</th>
            <th className='border border-cyan-950'>Opciones</th>
          </tr>
        </thead>

        <tbody className='text-xs'>

          {denuncias?.map(denuncia => {
            return (
              <tr 
                key={denuncia.id}
                className='border border-cyan-950'>
                <th className='border border-cyan-950'>{denuncia.id}</th>
                <th className='border border-cyan-950'>{denuncia.telefono}</th>
                <th className='border border-cyan-950'>{denuncia.tipo}</th>
                <th className='border border-cyan-950'>{denuncia.descripcion}</th>
                <th className='border border-cyan-950'>{denuncia.ubicacion}</th>
                <th className='border border-cyan-950'>{denuncia.estado}</th>
                <th className='flex p-1 justify-center'>
                  <MdOutlineDisabledByDefault
                      onClick={() => handleDelete(denuncia.id)}
                      className='w-[30px] h-[30px] py-1 bg-red-600 hover:bg-red-500 rounded-lg text-white'/>
                </th>
              </tr>
            )
          })}
        </tbody>
      </table>


    </main>
  )
}

export default DenunciasAdministracion