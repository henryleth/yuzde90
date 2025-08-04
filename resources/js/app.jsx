import './bootstrap';

import { createRoot, hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './Context/ThemeContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    resolve: (name) => {
        if (name.startsWith('Admin/')) {
            import('../css/admin.css');
        } else {
            import('../css/app.css');
        }
        return resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'));
    },
    setup({ el, App, props }) {
        // Sunucu tarafında render edilen HTML'i istemci tarafında "hydrate" eder.
        // Bu, sayfanın yeniden oluşturulması yerine mevcut DOM'a bağlanmasını sağlar.
        // Geliştirme ortamında ise normal 'createRoot' kullanılır.
        if (import.meta.env.DEV) {
            const root = createRoot(el);
            root.render(
                <ThemeProvider>
                    <App {...props} />
                </ThemeProvider>
            );
            return;
        }

        hydrateRoot(
            el,
            <ThemeProvider>
                <App {...props} />
            </ThemeProvider>
        );
    },
    progress: {
        color: '#d00f0f', // Primary renk olarak ayarlandı
    },
    onStart: () => {
        // Ziyaret başladığında body'ye 'inertia-transitioning' sınıfını ekle
        document.body.classList.add('inertia-transitioning');
    },
    onFinish: (visit) => {
        // Ziyaret tamamlandığında body'den 'inertia-transitioning' sınıfını kaldır
        document.body.classList.remove('inertia-transitioning');

        if (visit.instance.page.props.flash?.message) {
            // You can add logic here to display flash messages if needed
        }

        // Check if there is a hash in the URL (e.g., #overview)
        const hash = window.location.hash;
        if (hash) {
            // If there's a hash, scroll to that element smoothly
            const element = document.querySelector(hash);
            if (element) {
                // Add a small delay to allow DOM to settle, then scroll
                setTimeout(() => {
                    const headerOffset = 100; // Adjust this value if your sticky header has a different height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }, 100); // 100ms delay
            } else {
                // If hash element not found, scroll to top
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        } else {
            // If no hash, scroll to the top of the page smoothly
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    },
});

// Font Awesome ve Google Fonts ekle
const link1 = document.createElement('link');
link1.rel = 'stylesheet';
link1.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
document.head.appendChild(link1);

const link2 = document.createElement('link');
link2.rel = 'preconnect';
link2.href = 'https://fonts.googleapis.com';
document.head.appendChild(link2);

const link3 = document.createElement('link');
link3.rel = 'preconnect';
link3.href = 'https://fonts.gstatic.com';
link3.crossOrigin = 'crossorigin';
document.head.appendChild(link3);

const link4 = document.createElement('link');
link4.rel = 'stylesheet';
link4.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
document.head.appendChild(link4);
