/*
    Un slice es la fuente de verdad, lo que maneja el estado global de la aplicacion, se pueden tener
    tantos slice como haga falta, en este caso esta pensado que se tenga un slice dependiendo el modulo si hiciera falta
    de momento solo se implementa el slice global de auth

    Nota importante los Slice tienen que ser por naturaleza sincronos o lineales, es por eso que nunca 
    se debe de utilizar funciones asinconas dentro del slice, para eso se realizan ese tipo de procedimientos
    dentro de el hook useAuthStore.
*/
//Se importa el createSloce de redux
import { createSlice } from '@reduxjs/toolkit';
/*
    Para constuir el slice se le asigna un nombre, asi como estado inicial, en este caso no autenticado, sin usuario y sin errores
*/
export const authSlice = createSlice({
    name: 'auth',
     initialState: {
         status: 'not-authenticated', // 'authenticated','not-authenticated',
         user: {},
         errorMessage: '',
     },
     /* 
        Los reducers son funciones que mutan el estado, los reducers tienen nombres bastante descriptivos
        se entiende lo que realiza cada reducer dado su nombre y el analisis del estado
        Los reducers pueden recibir varios parametros los dos principales son el state el cual deben de mutar
        y el payload o carga util que contiene informacion que se quiere almacenar en el estado.
     */
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user   = {};
            state.errorMessage = '';
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = '';
        },
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user   = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = '';
        }
    }
});

/* 
    Por ultimo el store nos provee funciones creadoras, cada reducer da como resultado una funcion
    cada una de esas funciones como se explico muta el estado y al ser globales se pueden llamar en dodne sea necesario
    cabe recalcar que la logica de dichas funciones se encuentran en el hook useAuthStore
*/
// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;