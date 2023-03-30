import { historialApi } from "../api/historialApi"
import { useAuthStore } from "../hooks"


export const insertHistorial = async (extra) => {
    
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    extra.hora = new Date().getTime();

    try {
        const { data } = await historialApi.post('/nuevo-movimiento',{ user, token, extra });
        console.log('respuesta: ',{data})
    } catch (error) {
        console.log(error)
    }
}