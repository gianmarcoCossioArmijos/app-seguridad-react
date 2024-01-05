import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Inicio = () => {

  return (
    <main className='min-h-screen text-cyan-950 overflow-hidden'>
        
        <section className='w-full md:w-3/5 md:mx-auto flex flex-col'>
          <div className='w-full h-[380px] md:rounded-lg fondo-inicio'/>

          <div className='w-full py-12 flex flex-col gap-10'>
            <h3 className='w-3/4 mx-auto text-4xl text-center font-bold'>
              Si ves un <span className='px-1 bg-yellow-500'>delito</span> o <span className='px-1 bg-yellow-500'>infracción,</span> repórtalo y ayuda a mejorar la <span className='px-1 bg-yellow-500'>seguridad</span> en nuestra ciudad
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

        <section className='w-full md:w-3/5 md:mx-auto py-12 flex flex-col gap-10'>
          <img
              src="https://radiomaranon.org.pe/wp-content/uploads/2022/05/ntro-de-operaciones-mpj.jpg"
              alt="imagen_alerta"
              className='w-3/4 mx-auto rounded-lg'/>

          <h3 className='w-3/4 mx-auto text-4xl text-center font-bold'>
            Si tú o alguien, se encuentran en una <span className='px-1 bg-yellow-500'>situación de peligro</span>, envíanos una <span className='px-1 bg-yellow-500'>alerta de emergencia</span> desde nuestra aplicación móvil
          </h3>

          <div className='w-full flex flex-col gap-2'>
            <img
                src="https://i.postimg.cc/G2DF74PC/ALERTA-cel-1.png"
                alt="imagen_alerta"
                className='w-3/4 mx-auto rounded-lg'/>

            <a
                href="https://drive.google.com/file/d/1WAL5J1EfgozTARbfpjzLA6K-s_V5BAXr/view?usp=sharing"
                className='w-3/4 mx-auto' target='_blank'>
                <button className='w-full p-3 text-lg font-bold rounded-lg border-2 border-cyan-950 bg-yellow-500 hover:bg-yellow-400'>
                  Descargar
                </button>
            </a>
          </div>

        </section>

        <section className='w-full md:w-3/5 md:mx-auto py-12 flex flex-col gap-10'>
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