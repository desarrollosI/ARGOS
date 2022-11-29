import { AuthProvider } from './auth';
import { AppRouter } from './router/AppRouter';


export const ArgosApp = () => {
  return (
    <AuthProvider>
        
        <AppRouter />
        
    </AuthProvider>
  )
}
