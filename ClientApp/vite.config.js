import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: '../wwwroot', 
        emptyOutDir: true
    },
    plugins: [react()],
    sever: {
        proxy: {
            '/api': {
                target: 'http://localhost:5178/'
            }
        }
    }
})
