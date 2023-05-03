/*
  argos app es un componente de alto nivel, nos sirve para en este punto inyecyar
  el estado global
*/
//se importa el provider, es un componente de redux que indica que store puede manejar
import { Provider } from 'react-redux'
//se importa el router  global
import { AppRouter } from './router/AppRouter';
//se importa el store o estado global
import { store } from './store'

// Se expone la aplicacion   el router se encapsula en el provider con el estado global para que tenga acceso a todas sus funcionalidades
export const ArgosApp = () => {
  return (
    <Provider store={store}>
        
        <AppRouter />
        
    </Provider>
  )
}
