/* 
  Este componente el router de la aplicacion, el router se puede considerar un homonimo a un router comun de redes
  Este componente se encarga de saber que paginas mostrar o no dependiendo del estado de la aplicacion agregando una 
  capa de segurdad, ya que de no tener los permisos necesarios los componentes o paginas no se muestran ya que 
  son inexistentes por ende no se tiene acceso a la ruta critica de la aplicacion y se protege contra vulneravilidades 
  en la misma
*/
//Se importan los componentes propios de react
import { useEffect } from 'react';
//Se importan los componentes del router de react
import { Navigate, Route, Routes } from 'react-router-dom';
//Se importan los componentes internos y externos que se renderizaran dependiendo de la autenticacion
import { ArgosRoutes } from '../argos';
import { LoginPage } from '../auth';
//Se importan los hooks necesarios en este caso el que manejara el estado global de la applicacion
import { useAuthStore } from '../hooks/useAuthStore';

// Se crea el componente router de la app
export const AppRouter = () => {
  // se extrae de la autenticacion el status, y la funcion de verificacion del token 
  const { status, checkAuthToken } = useAuthStore();
  //Siempre que se carga el componente se verifica el token para saber si debe de existir una sesion activa o no
  useEffect(() => {
      checkAuthToken();
  }, [])

  if ( status === 'checking' ) {
     return (
         <h3>Cargando...</h3>
     )
   }


  return (
    <>
      {/* 
        El componente hace uso de el estado global de la aplicacion almacenado en la variable state
        de esta manera se utiliza en conjunto con la deteccion del token para saber que vistas renderizar

        Si no hay sesion se renderiza el login,
        Si si hay sesion se deja pasar al usuario al modulo de argos, y se renderiza el componente que maneja las rutas
        En si se tiene un router que redirige a otro router
        Asi se logan manejar las rutas privadas y publicas
      */}
        <Routes>
            {
             ( status === 'not-authenticated' && !localStorage.getItem('token'))  
              ? ( 
              <>
                  <Route path="/auth/*" element={ <LoginPage /> } />
                  <Route path="/*" element={ <Navigate to="/auth/login" /> } />
              </>
              )
              : (
                <>
                    <Route path="/*" element={ <ArgosRoutes /> } />
                    <Route path="/*" element={ <Navigate to="/" /> } />
                </>
            )
          } 
        </Routes>
    
    </>
  )
}
