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
        // Modern tarayıcıları hedefleyerek gereksiz transpilation'ı ve polyfill'leri azaltır.
        // 'esnext', en son JavaScript özelliklerini destekleyen tarayıcıları hedefler.
        target: 'esnext',
        rollupOptions: {
            output: {
                // SSR derlemesi sırasında manualChunks uygulamıyoruz.
                manualChunks: ssrBuild
                    ? undefined
                    : (id) => {
                          // node_modules bağımlılıklarını daha küçük, yönetilebilir parçalara ayırır.
                          // Bu, tarayıcının büyük bir vendor dosyasını tek seferde indirmesini ve işlemesini önleyerek
                          // sayfa yükleme süresini ve "Zorunlu yeniden düzenleme" gibi performans sorunlarını azaltır.
                          // Her bir kütüphane kendi chunk dosyasına ayrılır, bu da daha verimli bir önbellekleme sağlar.
                          if (id.includes('node_modules')) {
                              const packageName = id.toString().split('node_modules/')[1].split('/')[0];
                              return `vendor-${packageName}`;
                          }
                      },
            },
        },
    },
}));
