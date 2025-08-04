import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path'; // path modülünü import et

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            // SSR (Sunucu Tarafı Oluşturma) için giriş noktasını belirtir.
            // Vite, 'npm run build' komutu çalıştırıldığında bu dosyayı sunucu tarafı için derleyecektir.
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            // @/ takma adını resources/js dizinine eşle
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    // SSR yapılandırması
    ssr: {
        // Vite'a bu paketleri harici olarak görmemesini ve derlemesini söyler.
        // Bu, CommonJS/ESM uyumluluk sorunlarını çözmeye yardımcı olabilir.
        noExternal: ['@inertiajs/server', 'ziggy-js'],
    },
});
