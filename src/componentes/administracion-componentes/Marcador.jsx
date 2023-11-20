import React from 'react'
import  { Marker } from 'react-leaflet'

import icono from '../administracion-componentes/Icono'

const Marcador = (props) => {
  const {alertas} = props;

  const marcadores = alertas.map((alerta) => (
    <Marker
        key={alerta.id}
        position={{lat:  alerta.latitud, lng: alerta.longitud}}
        icon={icono}
        />
  ));
  return marcadores
}
export default Marcador;