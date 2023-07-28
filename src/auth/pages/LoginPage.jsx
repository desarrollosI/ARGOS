//se importan los componentes propios de react
import { useEffect } from 'react';
//se importan las bibliotecas de terceros
import Swal from 'sweetalert2';
//se importan los hook personalizados 
import { useAuthStore, useForm } from '../../hooks';
//se importan las hojas de estilo necesarias para el componente
import './LoginPage.css';
import logo from '/login/argos-logo-1.png';
import CanvasAnimation from './CanvasAnimation';
//Se debe de tener un pseudo estado pristine del formulario, de otra forma se entra en un bucle de re-renderizado
const loginFormFields = {
    loginEmail:    '',
    loginPassword: '',
}
/*
    El componente es el formulario de login, junto con la funcionalidad fraccionada en hooks para hacer la 
    determinacion de si el usuario existe, asi como de que permismos tiene acceso dicho usuario.
    Asi mismo este componente es uno de los principales que usa la store de la aplicación utilizando el 
    patron redux.
*/
export const LoginPage = () => {
    //Se  extran del store las funciones, estados, etc que se exponen a la aplicacion
    const { startLogin, errorMessage,status, startRegister } = useAuthStore();
    //Se extraen del hook useForm este hook es el encargado de manejar la información y funcionalidad del formulario
    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    //funcion para manipular el submit del formulario.
    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });//esta funcion proviene del store, es bastante descriptiva.
    }

    //Este efecto se usa para mostral el alert cuando se encuentra un error al realizar la authenticacion del usuario
    useEffect(() => {
      if ( errorMessage !== undefined  ) {
        Swal.fire('Error en la autenticación', errorMessage, 'error');
      }    
    }, [errorMessage])
    //El formulario se liga a las funciones del hook, las funcion del submit, y las funcion para detectar cambios en los input
    return (
        <>        
            <div className="container-fondo">
                <div className="container login-container">

                    <div className="row container-center shadow" >
                        <div className="col-md-12">
                            <img src={logo} alt="ARGOS" width={700} />
                        </div>
                        <div className="col-md-6 login-form-1">
                            <h3 className='text-center'>Iniciar Sesión</h3>
                            <form onSubmit={ loginSubmit }>
                                <div className="form-group mb-2">
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Correo"
                                        name="loginEmail"
                                        value={ loginEmail }
                                        onChange={ onLoginInputChange }
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        name="loginPassword"
                                        value={ loginPassword }
                                        onChange={ onLoginInputChange }
                                    />
                                </div>
                                <div className="d-grid gap-2 mb-5">
                                    <input 
                                        type="submit"
                                        className="btnSubmit"
                                        value="Acceder" 
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <CanvasAnimation/>
            {/* <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul> */}
        </>

    )
}