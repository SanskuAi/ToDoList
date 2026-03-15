import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],    // =>> CSS IMPORT
  server: {
    host: true,
    port: 5173
  }
})
// export default {
//   server: {
//     host: true,
//     port: 5173
//   }
// }
