//se importan los componentes propios de react
import { useEffect } from 'react';
//se importan las bibliotecas de terceros
import Swal from 'sweetalert2';
//se importan los hook personalizados 
import { useAuthStore, useForm } from '../../hooks';
//se importan las hojas de estilo necesarias para el componente
import './LoginPage.css';
import logo from '../../assets/SIA.png';
import background from '../../assets/background.webp'
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
            <div className="container-fondo" style={{backgroundImage: `url(${background})`}}>
                <div className="container-fluid">

                    <div className="container-center ms-5 me-5 row d-flex" >
                        <div className="col-md-5 align-self-center ">
                            <h1 className='text-center text-login'>SECRETARÍA DE SEGURIDAD CIUDADANA DEL MUNICIPIO DE PUEBLA</h1>
                            <h3 className='text-center text-login'>DIRECCIÓN DE INTELIGENCIA Y POLÍTICA CRIMINAL</h3>
                        </div>
                        <div className="col-md-5 container-login align-self-center mx-auto">
                               <div className="row">
                                <div className="col-md-11 ms-4 text-center">
                                    <img src={logo} alt="SIA" style={{maxWidth:400}} />
                                </div>
                               </div>
                               <div className="row ">
                                    <h3 className='text-center'>Iniciar Sesión</h3>
                                    <form onSubmit={ loginSubmit } >
                                            <div className="col-md-12 d-flex justify-content-center">

                                                <div className="form-group mb-2">
                                                    <input 
                                                        type="text"
                                                        className="form-control "
                                                        placeholder="Correo"
                                                        name="loginEmail"
                                                        value={ loginEmail }
                                                        onChange={ onLoginInputChange }
                                                    />
                                                </div>
                                            </div>
                                        <div className="col-md-12 d-flex justify-content-center">

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
                                        </div>
                                        <div className="col-md-12 d-flex justify-content-center">

                                            <div className="mb-5">
                                                <input 
                                                    type="submit"
                                                    className="btnSubmit"
                                                    value="Acceder" 
                                                />
                                            </div>
                                        </div>
                                    </form>
                               </div>
                               
                        </div>
                        
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 copyright">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h6 className='text-center text-login'>SSCMP</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </>

    )
}

