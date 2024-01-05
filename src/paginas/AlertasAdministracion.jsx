import React, { useState } from 'react'

import { MdCrisisAlert } from "react-icons/md";
import { MdOutlineDisabledByDefault } from "react-icons/md";

import axios from 'axios'
import { toast } from 'sonner'
import { useEffect } from 'react';
import {FECHA_HOY} from '../constantes/fecha.js'

const AlertasAdministracion = () => {
    const [fecha, setFecha] = useState(FECHA_HOY);
    const [alertas, setAlertas] = useState([]);

    useEffect(() => {

        listarAlertas(fecha)
            .then(data => setAlertas(data));
    }, [])

    const listarAlertas = async(fecha) => {

        const url = `https://alerta-jaen-backend.onrender.com/alertas/${fecha}`;
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
        listarAlertas(fecha)
            .then(data => setAlertas(data));     
    }

    const handleDelete = async(id) => {

        const url = `https://alerta-jaen-backend.onrender.com/alertas/${id}`;
        try {

            const data = JSON.parse(localStorage.getItem("token"));
            const token = `Bearer ${data.access_token}`;
            await axios.patch(url, id, {
                headers: {
                    Authorization: token
                }
               })
            toast.success("Se ha marcado alerta como atentida exitosamente");
            listarAlertas(fecha)
                .then(data => setAlertas(data));
        } catch (error) {
        console.error("Error en la solicitud:", error.message);
        }
    }
    
  return (
    <main className='w-full px-4 py-10 min-h-screen flex flex-col gap-4 text-cyan-950'>

        <h4 className='flex items-center gap-4 p-2 text-lg font-bold bg-white rounded-lg'>
            Alertas por Fecha
            <MdCrisisAlert />
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
            <th className='border border-cyan-950'>Latitud</th>
            <th className='border border-cyan-950'>Longitud</th>
            <th className='border border-cyan-950'>Fecha</th>
            <th className='border border-cyan-950'>Hora</th>
            <th className='border border-cyan-950'>Estado</th>
            <th className='border border-cyan-950'>Opciones</th>
          </tr>
        </thead>

        <tbody className='text-xs'>

          {alertas?.map(alerta => {
            return (
              <tr
                key={alerta.id}
                className='border border-cyan-950'>
                <th className='border border-cyan-950'>{alerta.id}</th>
                <th className='border border-cyan-950'>{alerta.latitud}</th>
                <th className='border border-cyan-950'>{alerta.longitud}</th>
                <th className='border border-cyan-950'>{alerta.fecha}</th>
                <th className='border border-cyan-950'>{alerta.hora}</th>
                <th className='border border-cyan-950'>{alerta.estado}</th>
                <th className='flex p-1 justify-center'>
                  <MdOutlineDisabledByDefault
                      onClick={() => handleDelete(alerta.id)}
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

export default AlertasAdministracion