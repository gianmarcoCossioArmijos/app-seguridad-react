import React, { useState } from 'react'
import { useEffect } from 'react';

import axios from 'axios'
import { toast } from 'sonner'
import {FECHA_HOY} from '../constantes/fecha.js'

import { GiTeamDowngrade } from "react-icons/gi";
import { MdOutlineDisabledByDefault } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

const UnidadesAdministracion = () => {
    const [fecha, setFecha] = useState(FECHA_HOY);
    const [unidades, setUnidades] = useState([]);
    const [zonas, setZonas] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [formulario, setFormulario] = useState({
        id: "",
        codigo: "",
        tipo_unidad: "",
        chofer: "",
        policia: "",
        operador: "",
        agentes: "",
        descripcion: "",
        id_zona: 0,
        id_vehiculo: ""
    })

    useEffect(() => {

        listarUnidades(fecha)
            .then(data => setUnidades(data));

        listarZonas()
            .then(data => setZonas(data))

        listarVehiculos()
            .then(data => setVehiculos(data))
    }, [])

    const listarUnidades = async(fecha) => {

        const url = `https://alerta-jaen-backend.onrender.com/unidades/${fecha}`;
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

    const listarZonas = async() => {

        const url = "https://alerta-jaen-backend.onrender.com/zonas";
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

    const listarVehiculos = async() => {

        const url = "https://alerta-jaen-backend.onrender.com/vehiculos";
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

    const handleChange = (event) => {

        const nombre = event.target.name;
        const valor = event.target.value;
        setFormulario({...formulario, [nombre]: valor});
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        if(formulario.id === "") {

            const url = "https://alerta-jaen-backend.onrender.com/unidades";
            try {

                const data = JSON.parse(localStorage.getItem("token"));
                const token = `Bearer ${data.access_token}`;
                let unidad = {};

                if (formulario.id_vehiculo !== "") {

                    unidad = {
                        codigo: formulario.codigo,
                        tipo_unidad: formulario.tipo_unidad,
                        chofer: formulario.chofer,
                        policia: formulario.policia,
                        operador: formulario.operador,
                        agentes: formulario.agentes,
                        descripcion: formulario.descripcion,
                        id_zona: parseInt(formulario.id_zona),
                        id_vehiculo: parseInt(formulario.id_vehiculo)
                    }
                } else {
                    unidad = {
                        codigo: formulario.codigo,
                        tipo_unidad: formulario.tipo_unidad,
                        chofer: formulario.chofer,
                        policia: formulario.policia,
                        operador: formulario.operador,
                        agentes: formulario.agentes,
                        descripcion: formulario.descripcion,
                        id_zona: parseInt(formulario.id_zona),
                    }
                }
                await axios.post(url, unidad, {
                    headers: {
                      Authorization: token
                    }
                });
                toast.success("Unidad registrada exitosamente");
                listarUnidades()
                    .then(data => setUnidades(data));
            } catch (error) {
                console.error("Error en la solicitud:", error.message);
            }
        } else {

            const url = `https://alerta-jaen-backend.onrender.com/unidades/${formulario.id}`;
            const nuevaUnidad = {
                codigo: formulario.codigo,
                tipo_unidad: formulario.tipo_unidad,
                chofer: formulario.chofer,
                policia: formulario.policia,
                operador: formulario.operador,
                agentes: formulario.agentes,
                descripcion: formulario.descripcion,
            }
            try {
                const data = JSON.parse(localStorage.getItem("token"));
                const token = `Bearer ${data.access_token}`;
                await axios.patch(url, nuevaUnidad, {
                    headers: {
                      Authorization: token
                    }
                });
                toast.success("Unidad actualizada exitosamente")
                listarUnidades(fecha)
                    .then(data => setUnidades(data));
            } catch (error) {
                console.error("Error en la solicitud:", error.message);
            }
        }
        
        setFormulario({
            id: "",
            codigo: "",
            tipo_unidad: "",
            chofer: "",
            policia: "",
            operador: "",
            agentes: "",
            descripcion: "",
            id_zona: 0,
            id_vehiculo: 0
        })
      }

      const handleDelete = async(id) => {

        const url = `https://alerta-jaen-backend.onrender.com/unidades/${id}`;
            try {

                const data = JSON.parse(localStorage.getItem("token"));
                const token = `Bearer ${data.access_token}`;
                await axios.delete(url, {
                    headers: {
                        Authorization: token
                    }
                })
                toast.success("Se ha desabilitado unidad exitosamente");
                listarUnidades(fecha)
                    .then(data => setUnidades(data));
            } catch (error) {
            console.error("Error en la solicitud:", error.message);
            }
    }
    
  return (
    <main className='w-full px-4 py-10 min-h-screen flex flex-col gap-4 text-cyan-950'>

        <h4 className='p-4 flex items-center gap-4 text-lg font-bold bg-white rounded-lg'>
            Registrar Nueva Unidaad
            <GiTeamDowngrade />
        </h4>

        <section className='w-full p-4 bg-white rounded-lg'>

            <form
                onSubmit={handleSubmit}
                className='md:w-3/5 md:mx-auto flex flex-col gap-4'>

                <input
                    type="hidden"
                    name='id'
                    value={formulario?.id}
                    onChange={handleChange}
                    className='p-3 rounded-lg bg-blue-50'
                    />

                <label className='flex flex-col gap-2'>
                    Codigo
                    <input
                        type="text"
                        name='codigo'
                        value={formulario?.codigo}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    Tipo de Unidad
                    <input
                        type="text"
                        name='tipo_unidad'
                        value={formulario?.tipo_unidad}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    Chofer
                    <input
                        type="text"
                        name='chofer'
                        value={formulario?.chofer}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        />
                </label>

                <label className='flex flex-col gap-2'>
                    Policia
                    <input
                        type="text"
                        name='policia'
                        value={formulario?.policia}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        />
                </label>

                <label className='flex flex-col gap-2'>
                    Operadores
                    <input
                        type="text"
                        name='operador'
                        value={formulario?.operador}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        />
                </label>

                <label className='flex flex-col gap-2'>
                    Agentes
                    <input
                        type="text"
                        name='agentes'
                        value={formulario?.agentes}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    Descripcion
                    <input
                        type="text"
                        name='descripcion'
                        value={formulario?.descripcion}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    <span>
                        Zona <span className='text-xs text-slate-400'>*este campo no se puede editar*</span>
                    </span>
                    <select
                        name="id_zona"
                        className='w-full p-3 rounded-lg bg-blue-50'
                        value={formulario?.id_zona}
                        onChange={handleChange}>

                        <option value="">
                            Seleccionar Zona
                        </option>

                        {zonas?.map(zona => {
                            return (
                                <option
                                    key={zona.id}
                                    value={zona.id}>
                                    {zona.nombre}
                                </option>
                            )
                        })}
                    </select>
                </label>

                <label className='flex flex-col gap-2'>
                    <span>
                        Vehiculo <span className='text-xs text-slate-400'>*este campo no se puede editar*</span>
                    </span>
                    <select
                        name="id_vehiculo"
                        className='w-full p-3 rounded-lg bg-blue-50'
                        value={formulario?.id_vehiculo}
                        onChange={handleChange}>

                        <option value="">
                            Seleccionar Vehiculo
                        </option>

                        {vehiculos?.map(vehiculo => {
                            return (
                                <option
                                    key={vehiculo.id}
                                    value={vehiculo.id}>
                                    {vehiculo.placa} {vehiculo.modelo}
                                </option>
                            )
                        })}
                    </select>
                </label>

                <input
                    type="submit"
                    value="Registrar"
                    className='w-full mt-6 mb-6 p-3 text-lg font-bold rounded-lg border-2 border-cyan-950 bg-yellow-500 hover:bg-yellow-400'/>
            </form>
        </section>

        <h4 className='p-4 flex items-center gap-4 text-lg font-bold bg-white rounded-lg'>
            Lista de Unidades
            <GiTeamDowngrade />
        </h4>

        <table className='w-full table-auto bg-white'>
            <thead className='text-sm'>
            <tr>
                <th className='border border-cyan-950'>ID</th>
                <th className='border border-cyan-950'>Codigo</th>
                <th className='border border-cyan-950'>Tipo</th>
                <th className='border border-cyan-950'>Chofer</th>
                <th className='border border-cyan-950'>Policia</th>
                <th className='border border-cyan-950'>Operador</th>
                <th className='border border-cyan-950'>Agentes</th>
                <th className='border border-cyan-950'>Descripcion</th>
                <th className='border border-cyan-950'>Estado</th>
                <th className='border border-cyan-950'>Opciones</th>
            </tr>
            </thead>

            <tbody className='text-xs'>

            {unidades?.map(unidad => {
                return (
                <tr
                    key={unidad.id}
                    className='border border-cyan-950'>
                    <th className='border border-cyan-950'>{unidad.id}</th>
                    <th className='border border-cyan-950'>{unidad.codigo}</th>
                    <th className='border border-cyan-950'>{unidad.tipo_unidad}</th>
                    <th className='border border-cyan-950'>{unidad.chofer}</th>
                    <th className='border border-cyan-950'>{unidad.policia}</th>
                    <th className='border border-cyan-950'>{unidad.operador}</th>
                    <th className='border border-cyan-950'>{unidad.agentes}</th>
                    <th className='border border-cyan-950'>{unidad.descripcion}</th>
                    <th className='border border-cyan-950'>{unidad.estado === true ? "habilitada" : "desabilitada"}</th>
                    <th className='flex p-1 justify-center gap-1'>
                        <FaUserEdit
                            onClick={() => setFormulario({
                                id: unidad.id,
                                codigo: unidad.codigo,
                                tipo_unidad: unidad.tipo_unidad,
                                chofer: unidad.chofer,
                                policia: unidad.policia,
                                operador: unidad.operador,
                                agentes: unidad.agentes,
                                descripcion: unidad.descripcion
                            })}
                            className='w-[30px] h-[30px] p-1 bg-yellow-500 hover:bg-yellow-400 rounded-lg text-white'/>

                        <MdOutlineDisabledByDefault
                            onClick={() => handleDelete(unidad.id)}
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

export default UnidadesAdministracion