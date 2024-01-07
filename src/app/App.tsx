import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '@/app/store';
import { router } from '@/app/router';
import { PATHS } from './config';
import AuthProvider from '../shared/ui/auth/authProvider';
import './App.css'


function App() {
  return (
    <Provider store={store} >
      <AuthProvider name={'token'} loginPath={PATHS?.MAIN} >
        <RouterProvider router={router()} />
      </AuthProvider>
    </Provider>
  )
}

export default App
