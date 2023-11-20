import axios from 'axios'

const alerta = () => {

    const enviarAlerta = async(ubicacion) => {

        const url = "https://alerta-jaen-backend.onrender.com/alertas";
        let respuesta;

        try {

            const data = JSON.parse(localStorage.getItem("token"));
            const token = data.access_token;
            console.log(token)
            respuesta = await axios.post(url, ubicacion, {
                headers: {
                    token: token
                }
            })
        } catch (error) {
            console.error("Error en la solicitud:", error.message);
        }
        return respuesta;
    }

    const listarAlertas = async() => {

        const url = "https://alerta-jaen-backend.onrender.com/alertas";
        let respuesta;

        try {

            const data = JSON.parse(localStorage.getItem("token"));
            const token = `Bearer ${data.access_token}`;
            respuesta = await axios.get(url, {
                headers: {
                    token: token
                }
            })
        } catch (error) {
            console.error("Error en la solicitud:", error.message);
        }
        return respuesta.data;
    }

    return {
        enviarAlerta,
        listarAlertas
    }

}

export default alerta;