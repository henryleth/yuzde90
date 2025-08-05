import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/server';
// resolvePageComponent'ı manuel olarak tanımlayarak daha fazla kontrol sağlıyoruz.
const resolve = (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    let page = pages[`./Pages/${name}.jsx`];
    // Eğer sayfa bulunamazsa, varsayılan layout'u kullanarak hatayı önle
    // ve geliştirme ortamında bir uyarı göster.
    if (!page) {
        if (import.meta.env.DEV) {
            console.warn(`[SSR] Page component not found for '${name}'`);
        }
        // Burada bir fallback component döndürebilir veya null dönebilirsiniz.
        // Şimdilik null dönmek, hatayı engeller.
        return null; 
    }
    // Sayfanın bir layout'u varsa onu kullan, yoksa varsayılan olarak bırak.
    page.default.layout = page.default.layout || ((page) => <div children={page} />);
    return page;
};
import { ThemeProvider } from '@/Context/ThemeContext';
import { route } from 'ziggy-js'; // ziggy-js'yi named import olarak düzelt

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Sunucu tarafı render işlemini başlatan fonksiyon.
createServer((page) => {
    // Admin paneli için SSR'ı devre dışı bırakıyoruz.
    // Laravel'in `app.blade.php` dosyası `head` ve `body` anahtarlarını beklediği için,
    // bu yapıyı manuel olarak oluşturuyoruz. React render'ı atlayarak `useLayoutEffect` hatasını,
    // `data-page` attribute'unu ekleyerek de `dataset` hatasını çözüyoruz.
    if (page.url.startsWith('/admin')) {
        return {
            head: [], // Başlık etiketleri için boş bir dizi gönderiyoruz.
            body: `<div id="app" data-page='${JSON.stringify(page)}'></div>`,
        };
    }

    // Admin dışındaki sayfalar için normal SSR işlemi devam eder.
    return createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve,
        setup: ({ App, props }) => {
            const { ziggy } = props.initialPage.props;
            // SSR'da URL'in doğru gelmesini sağlamak için ekleme
            props.initialPage.props.url = page.url;

            // Ziggy'nin SSR tarafında çökmesini engelleyen nihai çözüm.
            global.route = (name, params, absolute) => {
                try {
                    const config = { ...(ziggy || {}) };
                    if (config.location) {
                        // @ts-ignore
                        config.location = new URL(config.location);
                    }
                    
                    // Rota listesinin veya belirli bir rotanın eksik olup olmadığını kontrol et
                    if (!config.routes || !config.routes[name]) {
                        // Geliştirme ortamında bir uyarı göster ve çökmesini engelle
                        if (import.meta.env.DEV) {
                            console.warn(`[SSR] Ziggy route '${name}' not found.`);
                        }
                        return '#'; // Hata yerine boş link döndür
                    }

                    return route(name, params, absolute, config);
                } catch (e) {
                    // Beklenmedik bir hata olursa yakala ve çökmesini engelle
                    if (import.meta.env.DEV) {
                        console.error(`[SSR] Error in Ziggy route function for '${name}':`, e);
                    }
                    return '#';
                }
            };

            return (
                <ThemeProvider>
                    <App {...props} />
                </ThemeProvider>
            );
        },
    });
});
