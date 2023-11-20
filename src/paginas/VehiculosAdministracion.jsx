import React, { useState } from 'react'

import { FaCarSide } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDisabledByDefault } from "react-icons/md";

import axios from 'axios'
import { toast } from 'sonner'
import { useEffect } from 'react';

const VehiculosAdministracion = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [formulario, setFormulario] = useState({
        id: "",
        tipo: "",
        placa: "",
        marca: "",
        modelo: "",
        año: ""
    })

    useEffect(() => {

        listarVehiculos()
            .then(data => setVehiculos(data));
    }, [])

    const listarVehiculos = async() => {

        const url = "https://alerta-jaen-backend.onrender.com/vehiculos";
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
                const vehiculo = {
                    tipo: formulario.tipo,
                    placa: formulario.placa,
                    marca: formulario.marca,
                    modelo: formulario.modelo,
                    año: formulario.año
                }
                await axios.post(url, vehiculo, {
                    headers: {
                        Authorization: token
                    }
                })
                toast.success("Se ha registrado un vehiculo con exito");
                listarVehiculos()
                    .then(data => setVehiculos(data));
            } catch (error) {
            console.error("Error en la solicitud:", error.message);
            }
        } else {

            const url = `https://alerta-jaen-backend.onrender.com/vehiculos/${formulario.id}`;
            try {

                const data = JSON.parse(localStorage.getItem("token"));
                const token = `Bearer ${data.access_token}`;
                await axios.patch(url, formulario, {
                    headers: {
                        Authorization: token
                    }
                })
                toast.success("Se ha actualizado vehiculo con exito");
                listarVehiculos()
                    .then(data => setVehiculos(data));
            } catch (error) {
            console.error("Error en la solicitud:", error.message);
            }
        }
        
        setFormulario({
            id: "",
            tipo: "",
            placa: "",
            marca: "",
            modelo: "",
            año: ""
        })
    }

    const handleDelete = (id) => {


    }
    
  return (
    <main className='w-full px-4 py-10 min-h-screen flex flex-col gap-4 text-cyan-950'>

        <h4 className='p-4 flex items-center gap-4 text-lg font-bold bg-white rounded-lg'>
            Registrar Vehiculos
            <FaCarSide />
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
                    Tipo
                    <input
                        type="text"
                        name='tipo'
                        value={formulario.tipo}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    Placa
                    <input
                        type="text"
                        name='placa'
                        value={formulario.placa}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    Marca
                    <input
                        type="text"
                        name='marca'
                        value={formulario.marca}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    Modelo
                    <input
                        type="text"
                        name='modelo'
                        value={formulario.modelo}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    Año
                    <input
                        type="date"
                        name='año'
                        value={formulario.año}
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

        {JSON.stringify(formulario)}

        <h4 className='p-4 flex items-center gap-4 text-lg font-bold bg-white rounded-lg'>
            Lista de Vehiculos
            <FaCarSide />
        </h4>

        <table className='w-full table-auto bg-white'>
            <thead className='text-sm'>
            <tr>
                <th className='border border-cyan-950'>ID</th>
                <th className='border border-cyan-950'>Tipo</th>
                <th className='border border-cyan-950'>Placa</th>
                <th className='border border-cyan-950'>Marca</th>
                <th className='border border-cyan-950'>Modelo</th>
                <th className='border border-cyan-950'>Año</th>
                <th className='border border-cyan-950'>Estado</th>
                <th className='border border-cyan-950'>Opciones</th>
            </tr>
            </thead>

            <tbody className='text-xs'>

            {vehiculos?.map(vehiculo => {
                return (
                <tr
                    key={vehiculo.id}
                    className='border border-cyan-950'>
                    <th className='border border-cyan-950'>{vehiculo.id}</th>
                    <th className='border border-cyan-950'>{vehiculo.tipo}</th>
                    <th className='border border-cyan-950'>{vehiculo.placa}</th>
                    <th className='border border-cyan-950'>{vehiculo.marca}</th>
                    <th className='border border-cyan-950'>{vehiculo.modelo}</th>
                    <th className='border border-cyan-950'>{vehiculo.año}</th>
                    <th className='border border-cyan-950'>{vehiculo.estado === true ? "funcional" : "no funcional"}</th>
                    <th className='flex p-1 justify-center gap-1'>
                        <BiEdit
                            onClick={() => setFormulario({
                                id: vehiculo.id,
                                tipo: vehiculo.tipo,
                                placa: vehiculo.placa,
                                marca: vehiculo.marca,
                                modelo: vehiculo.modelo,
                                año: vehiculo.año
                            })}
                            className='w-[30px] h-[30px] p-1 bg-yellow-500 hover:bg-yellow-400 rounded-lg text-white'/>

                        <MdOutlineDisabledByDefault
                            onClick={() => handleDelete(vehiculo.id)}
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

export default VehiculosAdministracion