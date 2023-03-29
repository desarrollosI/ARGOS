import { Provider } from 'react-redux'
//import { AuthProvider } from './auth';
import { AppRouter } from './router/AppRouter';

import { store } from './store'


export const ArgosApp = () => {
  return (
    <Provider store={store}>
        
        <AppRouter />
        
    </Provider>
  )
}
