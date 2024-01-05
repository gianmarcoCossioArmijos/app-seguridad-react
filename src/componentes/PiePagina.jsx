import React from 'react'

import { AiFillFacebook } from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";
import { AiFillTwitterSquare } from "react-icons/ai";

const PiePagina = () => {
  return (
    <footer className='w-full p-8 flex justify-between bg-blue-300'>

        <div className='flex flex-col gap-2 text-cyan-950 text-sm'>
            <h5 className='font-bold'>Contacto</h5>
            <ul>
                <li>alertajaen@gmail.com</li>
                <li>990192384</li>
            </ul>
            <div className='w-1/2 flex gap-4 text-cyan-950 text-md'>
                <AiFillFacebook />
                <BsYoutube />
                <AiFillTwitterSquare />
            </div>
        </div>

        <div className='flex flex-col gap-2 text-cyan-950 text-sm'>
            <h5 className='font-bold'>Direccion</h5>
            <h6>Av. Pakamuros 4501 Jaen - Cajamarca</h6>
        </div>

    </footer>
  )
}

export default PiePagina