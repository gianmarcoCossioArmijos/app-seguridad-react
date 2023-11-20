import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { FaUsersCog } from "react-icons/fa";
import { LuNetwork } from "react-icons/lu";
import { MdCrisisAlert } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { FaCarSide } from "react-icons/fa";
import { GiTeamDowngrade } from "react-icons/gi";
import { TbMapCog } from "react-icons/tb";
import { RiNewspaperLine } from "react-icons/ri";
import { MdOutlineDisabledByDefault } from "react-icons/md";
import { RiAlarmWarningFill } from "react-icons/ri";
import { MdOutlineLocalPolice } from "react-icons/md";

import Mapa from '../componentes/administracion-componentes/Mapa'
import axios from 'axios';
import { toast } from 'sonner';
import moment from 'moment';

const MenuAdministracion = () => {
  const [ alertas, setAlertas] = useState([]);
  const [ denuncias, setDenuncias ] = useState([]);

  useEffect(() => {

    listarAlertas()
      .then( data => setAlertas(data));

    const date = new Date();
    const fecha = moment(date).format('YYYY-MM-DD');
    listarDenuncias(fecha)
      .then(data  => setDenuncias(data))
  }, [])

  const listarAlertas = async() => {

    const url = "https://alerta-jaen-backend.onrender.com/alertas";
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

  const handleDeleteAlerta = async(id) => {

    const url = `https://alerta-jaen-backend.onrender.com/alertas/${id}`;
    let respuesta;

    try {

      const data = JSON.parse(localStorage.getItem("token"));
      const token = `Bearer ${data.access_token}`;
      respuesta = await axios.patch(url, id,{
          headers: {
            Authorization: token
          }
      })
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
    if (respuesta) {

      toast.success("Se desabilito la alerta exitosamente")
      listarAlertas()
      .then( data => setAlertas(data));
    }
  }

  const handleDeleteDenuncia = async(id) => {

    const url = `https://alerta-jaen-backend.onrender.com/denuncias/${id}`;
    let respuesta;

    try {

      const data = JSON.parse(localStorage.getItem("token"));
      const token = `Bearer ${data.access_token}`;
      respuesta = await axios.patch(url, id,{
          headers: {
            Authorization: token
          }
      })
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
    if (respuesta) {

      toast.success("Se desabilito la denuncia exitosamente")
      const fecha = new Date().toISOString().slice(0, 10);
      listarDenuncias(fecha)
        .then(data  => setDenuncias(data))
    }
  }

  return (
    <main className='w-full min-h-screen p-4 flex flex-col gap-4 text-cyan-950'>

      <section className='w-full p-3 flex justify-center gap-1 items-center bg-white/60 rounded-lg'>
      
        <Link to="/usuarios-administracion">
          <FaUsersCog className='w-[50px] h-[50px] p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg'/>
        </Link>

        <LuNetwork className='w-[50px] h-[50px] p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg'/>
        <MdCrisisAlert className='w-[50px] h-[50px] p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg'/>
        <TbReportSearch className='w-[50px] h-[50px] p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg'/>

        <Link to="/vehiculos-administracion">
          <FaCarSide className='w-[50px] h-[50px] p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg'/>
        </Link>

        <GiTeamDowngrade className='w-[50px] h-[50px] p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg'/>

        <Link to="/zonas-administracion">
          <TbMapCog className='w-[50px] h-[50px] p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg'/>
        </Link>

        <Link to="/noticias-administracion">
          <RiNewspaperLine className='w-[50px] h-[50px] p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg'/>
        </Link>
        
      </section>

      <Mapa alertas={alertas}/>

      <h4 className='flex items-center gap-4 p-2 text-lg font-bold bg-white rounded-lg'>
        Alertas de Emergencia Pendientes
        <RiAlarmWarningFill />
      </h4>

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
                      onClick={() => handleDeleteAlerta(alerta.id)}
                      className='w-[30px] h-[30px] py-1 bg-red-600 hover:bg-red-500 rounded-lg text-white'/>
                </th>
              </tr>
            )
          })}
        </tbody>
      </table>

      <h4 className='flex items-center gap-4 p-2 text-lg font-bold bg-white rounded-lg'>
        Denuncias de Hoy
        <MdOutlineLocalPolice />
      </h4>

      <table className='w-full table-auto bg-white'>
        <thead className='text-sm'>
          <tr>
            <th className='border border-cyan-950'>ID</th>
            <th className='border border-cyan-950'>Fecha</th>
            <th className='border border-cyan-950'>Hora</th>
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
                <th className='border border-cyan-950'>{denuncia.fecha}</th>
                <th className='border border-cyan-950'>{denuncia.hora}</th>
                <th className='border border-cyan-950'>{denuncia.telefono}</th>
                <th className='border border-cyan-950'>{denuncia.tipo}</th>
                <th className='border border-cyan-950'>{denuncia.descripcion}</th>
                <th className='border border-cyan-950'>{denuncia.ubicacion}</th>
                <th className='border border-cyan-950'>{denuncia.estado}</th>
                <th className='flex p-1 justify-center'>
                  <MdOutlineDisabledByDefault
                      onClick={() => handleDeleteDenuncia(denuncia.id)}
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

export default MenuAdministracion