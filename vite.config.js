import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows the server to accept connections from other devices
    port: 5173, // Make sure the port matches the one you're using
  },
})
