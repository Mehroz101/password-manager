import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible';
import { defineConfig } from "vite";

export default defineConfig({
  envPrefix:"REACT_APP_",
  plugins: [react(),
  envCompatible(),
  ],
  optimizeDeps: {
    exclude: ['js-big-decimal'],

  }
});
// import.meta.env.REACT_APP_API_URL
// const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
// use this line to use env in eny file in frontend