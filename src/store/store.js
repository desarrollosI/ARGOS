/* 
    Este componente realiza la declaracion del store, su funcion es vincular los diferentes slice  o pedazos de verdad
    este store debe de ser inyectado un punto alto de la aplicacion para que todos los componentes
    y subcomponentes puedan tener acceso a todas las funciones, estados e informacion que expone para poder en todo momento
    tener informacion de un ususario por ejemplo
*/
//Se importan los componentes propios de redux
import { configureStore } from '@reduxjs/toolkit';
//Se importa el slice que queremos que comparta el store
import { authSlice } from './';
//Se expone la funcion store, se crea el reducer vinculado al slice deseado
export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,
    },//asi mismo hay mas parametros, que en este caso no son necesarios salvo este middleware, se requirio ya que hay errores en consola con las fehcas
    //que son bastante molestos pero no representan un error real
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
