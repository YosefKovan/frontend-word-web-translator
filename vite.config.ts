import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/admin": {
        target: "https://admin-service-e3251105-dev.apps.rm2.thpm.p1.openshiftapps.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/admin/, "/api"),
      },
      "/api/data1": {
        target: "https://data1-words-e3251105-dev.apps.rm2.thpm.p1.openshiftapps.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/data1/, "/api"),
      },
      "/api/data2": {
        target: "https://data2-training-e3251105-dev.apps.rm2.thpm.p1.openshiftapps.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/data2/, "/api"),
      },
    },
  },
});
