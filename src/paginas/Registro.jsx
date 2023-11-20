import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

const Registro = () => {
    const [formulario, setFormulario] = useState({
        nombres :"",
        nacimiento: "",
        email: "",
        telefono: "",
        clave: "",
        direccion: "",
        estado: true,
        rol_id: 2
    })

    const handleChange = (event) => {

        const nombre = event.target.name;
        const valor = event.target.value;
        setFormulario({...formulario, [nombre]: valor});
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        const url = "https://alerta-jaen-backend.onrender.com/usuarios";
        
        try {
            await axios.post(url, formulario);
        } catch (error) {
            console.error("Error en la solicitud:", error.message);
        }
        
        toast.success("Bienvenido, te haz registrado exitosamente")
        setFormulario({
            nombres :"",
            nacimiento: "",
            email: "",
            telefono: "",
            clave: "",
            direccion: "",
            rol_id: 2
        })
      }
    
  return (
    <main className='w-full px-4 py-20 min-h-screen text-cyan-950'>

        <section className='w-full p-4 bg-white rounded-lg'>
            <h3 className='pb-8 text-4xl text-center font-bold'>Registrarme</h3>

            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4'>

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
                    Clave
                    <input
                        type="password"
                        name='clave'
                        value={formulario.clave}
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

    </main>
  )
}

export default Registro