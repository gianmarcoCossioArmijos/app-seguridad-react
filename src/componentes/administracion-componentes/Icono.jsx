import L from 'leaflet'
import icono from '../../imagenes/location.png'

const Icono = L.icon({
    iconUrl: icono,
    iconRetinaUrl: icono,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "leaflet-venue-icon"
 })

export default Icono