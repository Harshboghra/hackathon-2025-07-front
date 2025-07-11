import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';
import { config } from 'dotenv';
config();

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '/',
    plugins: [react(), EnvironmentPlugin('all', { prefix: 'REACT_APP_' })],
    server: {
        // this ensures that the browser opens upon server start
        open: true,
        port: Number(process.env.PORT) || 5000,
    },
    build: {
        outDir: 'build',
    },
});

