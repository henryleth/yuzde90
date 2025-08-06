import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ ssrBuild }) => ({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    ssr: {
        noExternal: ['@inertiajs/server', 'ziggy-js'],
    },
    build: {
        rollupOptions: {
            output: {
                // SSR derlemesi sırasında manualChunks uygulamıyoruz.
                manualChunks: ssrBuild
                    ? undefined
                    : (id) => {
                          // Tüm node_modules bağımlılıklarını tek bir 'vendor' paketinde toplar.
                          // Bu, SSR'nin harici modül mantığıyla çakışmayı önler ve daha istikrarlı bir derleme sağlar.
                          if (id.includes('node_modules')) {
                              return 'vendor';
                          }
                      },
            },
        },
    },
}));
