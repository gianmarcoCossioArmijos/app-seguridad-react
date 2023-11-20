import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { obetenerToken } from '../utils/obtenerToken'
import { useEffect } from 'react'

const Denuncia = () => {
    const [formulario, setFormulario] = useState({
        tipo :"",
        descripcion: "",
        telefono: "",
        ubicacion: "",
        id_usuario: ""
    })

    useEffect(() => {

        const data = JSON.parse(localStorage.getItem("token"));
        const respuesta = obetenerToken(data.access_token)
        setFormulario({
            tipo :"",
            descripcion: "",
            telefono: "",
            ubicacion: "",
            id_usuario: respuesta.sub
        })
    }, [])

    const handleChange = (event) => {

        const nombre = event.target.name;
        const valor = event.target.value;
        setFormulario({...formulario, [nombre]: valor});
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        const url = "https://alerta-jaen-backend.onrender.com/denuncias";
        let respuesta;
    
        try {
    
          const data = JSON.parse(localStorage.getItem("token"));
          const token = `Bearer ${data.access_token}`;
          respuesta = await axios.post(url, formulario, {
              headers: {
                Authorization: token
              }
          })
        } catch (error) {
          console.error("Error en la solicitud:", error.message);
        }
        
        if (respuesta) {

            toast.success("Su denuncia ha sido regitrada")
            const data = JSON.parse(localStorage.getItem("token"));
            const jwt = obetenerToken(data.access_token)
            setFormulario({
                tipo :"",
                descripcion: "",
                telefono: "",
                ubicacion: "",
                id_usuario: jwt.sub
            })
        }
      }
    
  return (
    <main className='w-full px-4 py-20 min-h-screen text-cyan-950'>

        <section className='w-full p-4 bg-white rounded-lg'>
            <h3 className='pb-8 text-4xl text-center font-bold'>Denunciar</h3>

            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4'>

                <select
                    name="tipo"
                    className='w-full p-3 rounded-lg bg-blue-50'
                    value={formulario.tipo}
                    onChange={handleChange}
                    required>

                    <option value="alteracion del orden publico">alteracion del orden publico</option>
                    <option value="robo con arma">robo con arma</option>
                    <option value="robo con moto">robo con moto</option>
                    <option value="asalto">asalto</option>
                    <option value="violencia domestica">violencia domestica</option>
                    <option value="secuestro">secuestro</option>
                    <option value="venta de drogas">venta de drogas</option>
                    <option value="otro">otro</option>
                </select>

                <label className='flex flex-col gap-2'>
                    Telefono
                    <input
                        type="number"
                        name='telefono'
                        value={formulario.telefono}
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
                    Lugar del incidente
                    <input
                        type="text"
                        name='ubicacion'
                        value={formulario.ubicacion}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <input
                    type="submit"
                    value="Registrar Denuncia"
                    className='w-full mt-6 mb-6 p-3 text-lg font-bold rounded-lg border-2 border-cyan-950 bg-yellow-500 hover:bg-yellow-400'/>
            </form>
        </section>

    </main>
  )
}

export default Denuncia