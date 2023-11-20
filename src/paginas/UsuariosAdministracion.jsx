import React, { useState } from 'react'
import { useEffect } from 'react';

import axios from 'axios'
import { toast } from 'sonner'

import { FaUsersCog } from "react-icons/fa";
import { MdOutlineDisabledByDefault } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

const UsuariosAdministracion = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [tipoUsuario, setTipoUsuario] = useState({});
    const [formulario, setFormulario] = useState({
        id :"",
        nombres :"",
        nacimiento: "",
        email: "",
        telefono: "",
        clave: "",
        direccion: "",
        estado: true,
        rol_id: ""
    })

    useEffect(() => {

        listarUsuarios()
            .then(data => setUsuarios(data));

        listarRoles()
            .then(data => setRoles(data))
    }, [])

    const listarUsuarios = async() => {

        const url = "https://alerta-jaen-backend.onrender.com/usuarios";
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

    const listarRoles = async() => {

        const url = "https://alerta-jaen-backend.onrender.com/roles";
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

            if (formulario.rol_id === "" || formulario.clave === "") {

                toast.error("Debe rellenar todos los campos");
                return
            }

            const url = "https://alerta-jaen-backend.onrender.com/usuarios";
            const nuevoUsuario = {
                nombres: formulario.nombres,
                nacimiento: formulario.nacimiento,
                email: formulario.email,
                telefono: formulario.telefono,
                clave: formulario.clave,
                direccion: formulario.direccion,
                rol_id: parseInt(formulario.rol_id)
            }
            try {
                await axios.post(url, nuevoUsuario);
                toast.success("Usuario registrado exitosamente")
                listarUsuarios()
                    .then(data => setUsuarios(data));
            } catch (error) {
                console.error("Error en la solicitud:", error.message);
            }
        } else {

            const url = `https://alerta-jaen-backend.onrender.com/usuarios/${formulario.id}`;
            const usuario = {
                nombres: formulario.nombres,
                nacimiento: formulario.nacimiento,
                email: formulario.email,
                telefono: formulario.telefono,
                direccion: formulario.direccion,
            }
            try {
                const data = JSON.parse(localStorage.getItem("token"));
                const token = `Bearer ${data.access_token}`;
                await axios.patch(url, usuario, {
                    headers: {
                      Authorization: token
                    }
                });
                toast.success("Usuario actualizado exitosamente")
                listarUsuarios()
                    .then(data => setUsuarios(data));
            } catch (error) {
                console.error("Error en la solicitud:", error.message);
            }
        }
        
        setFormulario({
            id: "",
            nombres :"",
            nacimiento: "",
            email: "",
            telefono: "",
            clave: "",
            direccion: "",
            estado: true,
            rol_id: ""
        })
      }

      const handleDelete = async(id) => {


      }
    
  return (
    <main className='w-full px-4 py-10 min-h-screen flex flex-col gap-4 text-cyan-950'>

        <h4 className='p-4 flex items-center gap-4 text-lg font-bold bg-white rounded-lg'>
            Registrar Nuevo Usuario
            <FaUsersCog />
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
                    Nombre Completo
                    <input
                        type="text"
                        name='nombres'
                        value={formulario.nombres}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    Fecha de Nacimiento
                    <input
                        type="date"
                        name='nacimiento'
                        value={formulario.nacimiento}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

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
                    Telefono
                    <input
                        type="tel"
                        name='telefono'
                        value={formulario.telefono}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    Direccion
                    <input
                        type="text"
                        name='direccion'
                        value={formulario.direccion}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <label className='flex flex-col gap-2'>
                    <span>
                        Tipo de Usuario <span className='text-xs text-slate-400'>*este campo no se puede editar*</span>
                    </span>
                    <select
                        name="rol_id"
                        className='w-full p-3 rounded-lg bg-blue-50'
                        value={formulario.rol_id}
                        onChange={handleChange}>

                        <option value="">
                            Seleccionar tipo de Usuario
                        </option>

                        {roles?.map(rol => {
                            return (
                                <option
                                    key={rol.id}
                                    value={rol.id}>
                                    {rol.nombre}
                                </option>
                            )
                        })}
                    </select>
                </label>

                <label className='flex flex-col gap-2'>
                    <span>
                        Clave <span className='text-xs text-slate-400'>*este campo no se puede editar, si desea hacerlo dirigase a recupar cuenta*</span>
                    </span>
                    <input
                        type="password"
                        name='clave'
                        value={formulario.clave}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        />
                </label>

                <input
                    type="submit"
                    value="Registrar"
                    className='w-full mt-6 mb-6 p-3 text-lg font-bold rounded-lg border-2 border-cyan-950 bg-yellow-500 hover:bg-yellow-400'/>
            </form>
        </section>

        <h4 className='p-4 flex items-center gap-4 text-lg font-bold bg-white rounded-lg'>
            Lista de Usuarios
            <FaUsersCog />
        </h4>

        <table className='w-full table-auto bg-white'>
            <thead className='text-sm'>
            <tr>
                <th className='border border-cyan-950'>ID</th>
                <th className='border border-cyan-950'>Nombres</th>
                <th className='border border-cyan-950'>Nacimiento</th>
                <th className='border border-cyan-950'>Email</th>
                <th className='border border-cyan-950'>Telefono</th>
                <th className='border border-cyan-950'>Direccion</th>
                <th className='border border-cyan-950'>Estado</th>
                <th className='border border-cyan-950'>Opciones</th>
            </tr>
            </thead>

            <tbody className='text-xs'>

            {usuarios?.map(usuario => {
                return (
                <tr
                    key={usuario.id}
                    className='border border-cyan-950'>
                    <th className='border border-cyan-950'>{usuario.id}</th>
                    <th className='border border-cyan-950'>{usuario.nombres}</th>
                    <th className='border border-cyan-950'>{usuario.nacimiento}</th>
                    <th className='border border-cyan-950'>{usuario.email}</th>
                    <th className='border border-cyan-950'>{usuario.telefono}</th>
                    <th className='border border-cyan-950'>{usuario.direccion}</th>
                    <th className='border border-cyan-950'>{usuario.estado === true ? "habilitado" : "desabilitado"}</th>
                    <th className='flex p-1 justify-center gap-1'>
                        <FaUserEdit
                            onClick={() => setFormulario({
                                id: usuario.id,
                                nombres :usuario.nombres,
                                nacimiento: usuario.nacimiento,
                                email: usuario.email,
                                telefono: usuario.telefono,
                                direccion: usuario.direccion,
                            })}
                            className='w-[30px] h-[30px] p-1 bg-yellow-500 hover:bg-yellow-400 rounded-lg text-white'/>

                        <MdOutlineDisabledByDefault
                            onClick={() => handleDelete(usuario.id)}
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

export default UsuariosAdministracion