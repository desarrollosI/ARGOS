import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ArgosRoutes } from '../argos';
import { LoginPage } from '../auth';
import { useAuthStore } from '../hooks/useAuthStore';
import { NavbarN } from '../ui';




export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();


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
            {/* <Route path="/*" element={ <Navigate to="/auth/login" /> } />  */}
            {/* <Route path="login/*" element={
                <PublicRoute>
                  <Routes>
                    <Route path="/*" element={<LoginPage />} />
                  </Routes>
                </PublicRoute>
              }
            />
            
            
            <Route path="/*" element={
              <PrivateRoute>
                <ArgosRoutes />
              </PrivateRoute>
            } /> */}


        </Routes>
    
    </>
  )
}
