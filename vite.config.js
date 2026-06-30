import { defineConfig } from 'vite'
import react from '@vitejs/react-swc' // or '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ecommerceproductcatalog/', // CRITICAL: This must match your repo name exactly with slashes
})