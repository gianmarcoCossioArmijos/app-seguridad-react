import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { RiAlarmWarningFill } from "react-icons/ri";
import enviarAlerta from '../utils/alerta.js'
import { toast } from 'sonner';

const Inicio = () => {
  const [ubicacion, setUbicacion] = useState({
    latitud: "",
    longitud: ""
})

  const handleClick = async() => {

    let respuesta;

    if ("position" in navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {

        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        setUbicacion({
          latitud: latitud,
          longitud: longitud
        })
      });

      try {

        respuesta = await enviarAlerta(ubicacion);
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
      }

      if (respuesta) {
        
        toast.success("La alerta fue enviada a las autoridades")
        setUbicacion({
          latitud: "",
          longitud: ""
        })
      }
    } else {
      toast.error("Su navegador no soporta geolocalizacion")
    }
  }

  return (
    <main className='min-h-screen text-cyan-950 overflow-hidden'>
        
        <section className='w-full flex flex-col'>
          <div className='w-full h-[380px] fondo-inicio'/>

          <div className='w-full py-12 flex flex-col gap-10'>
            <h3 className='w-3/4 mx-auto text-4xl text-center font-bold'>
              Si ves un <span className='px-1 bg-yellow-500'>delito</span> o <span className='px-1 bg-yellow-500'>infraccion</span> reportalo y ayuda a mejorar la <span className='px-1 bg-yellow-500'>seguridad</span> en nuestra ciudad
            </h3>

            <Link
              to="/registrar"
              className='w-3/4 mx-auto'>
              <button className='w-full p-3 text-lg font-bold rounded-lg border-2 border-cyan-950 bg-yellow-500 hover:bg-yellow-400'>
                Registrarme
              </button>
            </Link>
          </div>
        </section>

        <section className='w-full py-12 flex flex-col gap-10'>
          <img
              src="https://radiomaranon.org.pe/wp-content/uploads/2022/05/ntro-de-operaciones-mpj.jpg"
              alt="imagen_alerta"
              className='w-3/4 mx-auto rounded-lg'/>

          <h3 className='w-3/4 mx-auto text-4xl text-center font-bold'>
            Si tu o alguien, se encuentran en una <span className='px-1 bg-yellow-500'>situacion de peligro</span>, envianos una <span className='px-1 bg-yellow-500'>alerta de emergencia</span>
          </h3>

          <button
              onClick={handleClick}
              className='w-3/4 p-3 mx-auto flex flex-col text-lg text-white font-bold rounded-full border-2 border-cyan-950 bg-red-600 hover:bg-red-500'>
            <RiAlarmWarningFill className='mx-auto'/>
            <span className='mx-auto'>Alerta de Emergencia</span>
          </button>
        </section>

        <section className='w-full py-12 flex flex-col gap-10'>
          <ul className='w-3/4 mx-auto text-xl font-bold'>
            <li>• Envia tu alerta de emergencia</li>
            <li>• Tu ubicacion se compartira con nosotros</li>
            <li>• La alerta sera atendida en el menor tiempo posible por seguridad cuidadana</li>
          </ul>

          <img
              src="https://i.postimg.cc/XqZZf4m9/escudo.png"
              alt="seguridad_ilustracion"
              className='w-1/2 mx-auto rounded-lg'/>

          <h3 className='w-3/4 mx-auto text-4xl text-center font-bold'>
            Tu <span className='px-1 bg-yellow-500'>seguridad</span>, es nuestra <span className='px-1 bg-yellow-500'>prioridad</span>
          </h3>
        </section>

    </main>
  )
}

export default Inicio