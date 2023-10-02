import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//Nota importante es necesario agregar base como ./ para indicarle a vite que use rutas realivas y no absolutas
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
  ]
})
