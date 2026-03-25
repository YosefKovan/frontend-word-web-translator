import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://admin-service-e3251105-dev.apps.rm2.thpm.p1.openshiftapps.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})