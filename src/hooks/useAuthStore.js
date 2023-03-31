import { useDispatch, useSelector } from 'react-redux';
import { authApi } from '../api';
import { insertHistorial } from '../helpers/insertHistorial';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store'; //onLogoutCalendar


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await authApi.post('/login',{ email, password });
            console.log('respuesta: ',{data})
            localStorage.setItem('user',JSON.stringify(data.usuario))
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            insertHistorial({ tipo:'Inicio de Sesión' })
            dispatch( onLogin({ name: data.usuario.nombre, uid: data.usuario.uid, rol: data.usuario.rol }) );
            
        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async({ email, password, name }) => {
        dispatch( onChecking() );
        try {
            const { data } = await authApi.post('/auth/new',{ email, password, name });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
            
        } catch (error) {
            dispatch( onLogout( error.response.data?.msg || '--' ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }


    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
       
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await authApi.get('/renew');
            console.log('desde el chekAuthToken:',{data})
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            insertHistorial({ tipo:'Renovación de Token' })
            dispatch( onLogin({ name: data.name, uid: data.uid , rol: data.rol }) );
        } catch (error) {
            console.log('error del check auth', error)
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        // dispatch( onLogoutCalendar() );
        dispatch( onLogout() );
    }



    return {
        //* Propiedades
        errorMessage,
        status, 
        user, 

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }

}