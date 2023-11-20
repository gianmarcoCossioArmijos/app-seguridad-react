import React from 'react'
import { MapContainer ,TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import Marcador from './Marcador'

const Mapa = (props) => {
  const {alertas} = props;

  return (
    <MapContainer 
        center={{lat: "-5.708575", lng: "-78.807251"}}
        zoom={15}
        >
        <TileLayer
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marcador alertas={alertas}/>
    </MapContainer>
  )
}

export default Mapa