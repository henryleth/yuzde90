import './bootstrap';
import '../css/app.css'; // Ana CSS dosyasını doğrudan import et

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './Context/ThemeContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title}`,
    /**
     * Sayfa bileşenlerini çözer. Laravel Vite eklentisinden gelen bu yardımcı fonksiyon,
     * hem bileşeni hem de onunla ilişkili CSS dosyalarını yükler. Bu, SSR sırasında
     * stil kayması (FOUC) sorununu önlemek için kritik öneme sahiptir.
     */
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    
    /**
     * Uygulamayı kurar. Hem istemci tarafı başlangıcında hem de SSR sonrası
     * "hydration" işleminde kullanılır.
     */
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ThemeProvider>
                <App {...props} />
            </ThemeProvider>
        );
    },
    
    progress: {
        color: '#d00f0f', // Ana renk
    },
});
