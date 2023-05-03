/*
    Este es un helper global para manejar la insercion en la tabla correspondiente al historial 
    de acciones que se lleven a cabo en el sistema argos, toma la informacion del usuario, token
    e informacion extra que es proveida desde el lugar respectivo dond ese dispare la funcion
    con dicha informacion se realiza el llamado al backedn para realizar el insert
*/ 
import { historialApi } from "../api/historialApi"

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