import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

const RecuperarClave = () => {
    const [email, setEmail] = useState({
        email: ""
    })

    const handleChange = (event) => {

        const nombre = event.target.name;
        const valor = event.target.value;
        setEmail({...email, [nombre]: valor});
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        const url = "https://alerta-jaen-backend.onrender.com/auth/restablecer";

        try {
            const respuesta = await axios.post(url, email)
        } catch (error) {
            console.error("Error en la solicitud:", error.message);
        }

        toast.success("Se ha enviado un codigo al email registrado en la cuenta")
        setEmail({
            email: ""
        })
    }

  return (
    <main className='w-full px-4 py-20 min-h-screen text-cyan-950'>

        <section className='w-full p-4 bg-white rounded-lg'>
            <h3 className='pb-8 text-4xl text-center font-bold'>Recuperar Cuenta</h3>

            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4'>

                <label className='flex flex-col gap-2'>
                    Ingresa el correo electronico de tu cuenta
                    <input
                        type="email"
                        name='email'
                        value={email.email}
                        onChange={handleChange}
                        className='p-3 rounded-lg bg-blue-50'
                        required/>
                </label>

                <input
                    type="submit"
                    value="Restablecer Cuenta"
                    className='w-full mt-6 mb-6 p-3 text-lg font-bold rounded-lg border-2 border-cyan-950 bg-yellow-500 hover:bg-yellow-400'/>
            </form>

        </section>

    </main>
  )
}

export default RecuperarClave