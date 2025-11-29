/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    base: '/Desmalha/', // Nome do repositório GitHub
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@logic': path.resolve(__dirname, './src/logic'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@assets': path.resolve(__dirname, './src/assets')
        }
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom'],
                    'vendor-math': ['mathjs']
                }
            }
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setup.ts',
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'src/tests/',
                '*.config.ts',
                '*.config.js',
            ]
        }
    }
});
