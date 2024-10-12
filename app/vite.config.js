import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ShowDoMaicol2/',
  plugins: [react()],
  resolve: {
    alias: {
        '@components': path.resolve(__dirname, 'src/components')
    }
  }
})
