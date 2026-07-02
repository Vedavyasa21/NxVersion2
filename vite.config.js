import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Keep 3D bundles out of the critical path — R3F is heavy.
    chunkSizeWarningLimit: 1500,
  },
})
