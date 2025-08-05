# Optimizasyon ve Önbellekleme (Caching) Sistemi

Bu doküman, projemizde kullanılan ve site performansını artırmayı hedefleyen önbellekleme (caching) sisteminin yapısını ve çalışma mantığını açıklamaktadır. Sistemimiz, kullanıcılara daha hızlı bir deneyim sunmak ve sunucu kaynaklarını verimli kullanmak üzerine kurulmuştur.

## Sistemin Genel Yapısı

Önbellekleme sistemimiz iki ana katmandan oluşur:

1.  **Uygulama Seviyesi Önbellekleme (Origin Cache):** Laravel backend'i içinde çalışan ve Sunucu Taraflı Oluşturulmuş (SSR) HTML sayfalarının çıktısını saklayan ana sistemimizdir. Ziyaretçinin tarayıcısına en yakın olan CDN (Cloudflare) önbelleği bir sayfayı bulamadığında, istek bizim sunucumuza gelir ve bu katman devreye girer.
2.  **Yönetim Paneli Kontrolleri:** Sitede bir değişiklik yapıldığında bu önbelleği kolayca yönetmek ve devre dışı bırakmak için yönetim paneline eklenmiş araçlardır.

---

## 1. Uygulama Seviyesi SSR Önbellekleme

Bu sistemin kalbi, `app/Http/Middleware/HandleInertiaRequests.php` middleware dosyasıdır. Gelen her isteği kontrol eder ve belirli kurallara göre sayfanın tamamen oluşturulmuş HTML çıktısını 24 saatliğine önbelleğe alır.

### Çalışma Mantığı ve Kurallar

Bir isteğin önbelleğe alınması veya önbellekten sunulması için aşağıdaki koşulların **hepsinin** sağlanması gerekir:

1.  **Önbellek Açık Olmalı:** Yönetim panelindeki "Site Geneli Önbellekleme" ayarı "Aktif" konumda olmalıdır. Bu ayarın kendisi de performansı etkilememek için 1 saatliğine önbellekte tutulur.
2.  **İstek Metodu `GET` Olmalı:** Sadece sayfa görüntüleme istekleri önbelleğe alınır. Form gönderme gibi `POST` istekleri daima canlı olarak işlenir.
3.  **Yönetim Paneli Hariç Tutulur:** URL'si `/admin` ile başlayan hiçbir sayfa önbelleğe alınmaz. Bu, yönetim panelinin her zaman en güncel veriyi göstermesini sağlar.
4.  **Sadece İlk Sayfa Yüklemesi:** Sadece bir kullanıcının siteye girdiği ilk sayfa yüklemesi (tam HTML cevabı) önbelleğe alınır. Sayfa içindeki sonraki tıklamalarla (sadece JSON verisi içeren) yapılan gezintiler önbellekleme sürecini tetiklemez. Bu, `X-Inertia` başlığının varlığı kontrol edilerek sağlanır.

Bu kurallar sağlandığında, sistem sayfanın tam URL'sinden benzersiz bir anahtar (`ssr_page_...`) oluşturur ve render edilmiş HTML'i `storage/framework/cache/data/` klasörü altına kaydeder. Aynı sayfaya gelen bir sonraki istek, bu hazır HTML dosyasını okuyarak sunulur ve bu sayede PHP ile Node.js'in tekrar çalışmasına gerek kalmaz.

---

## 2. Yönetim Paneli Kontrolleri

Sistemin esnekliğini sağlamak için `Ayarlar` -> `Genel Ayarlar` (`/admin/settings/seo`) sayfasına iki önemli kontrol eklenmiştir:

1.  **Site Geneli Önbellekleme Anahtarı (Switch):**
    *   Bu anahtar, yukarıda açıklanan tüm SSR önbellekleme sistemini tek bir tıkla **aktif veya pasif** hale getirir.
    *   Özellikle geliştirme yaparken veya bir sorunu teşhis etmeye çalışırken önbelleği devre dışı bırakmak için kullanılır.
    *   Bu ayar değiştirilip kaydedildiğinde, sistemdeki tüm mevcut önbellek (`Cache::flush()`) otomatik olarak temizlenir. Bu, eski durumdan (önbellekli/önbelleksiz) kalan sayfaların sunulmasını engeller.

2.  **Tüm Site Önbelleğini Temizle Butonu:**
    *   Bu buton, önbellek durumu ne olursa olsun, tıklandığı anda tüm uygulama önbelleğini (`SSR sayfaları`, `config`, `route`, `view` önbellekleri) tamamen sıfırlar.
    *   Sitede bir tur, içerik veya ayar değişikliği yapıldığında, bu değişikliğin ziyaretçilere anında yansımasını sağlamak için bu butona basılmalıdır.

---

## 3. Admin Paneli SSR Optimizasyonu

Yönetim paneli sayfaları, SEO için kritik olan genel site sayfalarının aksine, sunucu tarafında render edilmeye (SSR) ihtiyaç duymaz. Ayrıca, yönetim panelinde kullanılan bazı zengin arayüz bileşenleri (Dropdown menüler, Modallar vb.), sunucu ortamında `useLayoutEffect` gibi React hook'ları nedeniyle uyarılara ve hatalara neden olabilir.

Bu sorunları kökten çözmek ve sunucu kaynaklarını daha verimli kullanmak için, yönetim paneli için SSR tamamen devre dışı bırakılmıştır.

### Uygulama

Bu optimizasyon, `resources/js/ssr.jsx` dosyasında, gelen sayfa isteğinin URL'si kontrol edilerek yapılır.

- Eğer URL `/admin` ile başlıyorsa, React'in render işlemi tamamen atlanır.
- Bunun yerine, Inertia.js'in istemci tarafında uygulamayı başlatabilmesi için gereken temel HTML yapısı (`<div id="app" data-page='...'>`) sunucu tarafından manuel olarak oluşturulur.
- Bu sayede Laravel tarafında beklenen `head` ve `body` yapısı korunur, istemci tarafı hataları (`dataset` okuma hatası gibi) engellenir ve `useLayoutEffect` uyarıları ortadan kalkar.

```javascript
// resources/js/ssr.jsx

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
        // ... normal SSR yapılandırması
    });
});
```

Bu hibrit yaklaşım, genel site için SSR'ın SEO ve performans avantajlarını korurken, yönetim panelinin stabil ve hatasız çalışmasını sağlar.

---

## Cloudflare ile Etkileşimi

Eğer Cloudflare gibi bir CDN hizmeti kullanılıyorsa, bizim kurduğumuz bu sistem "origin cache" (kaynak sunucu önbelleği) olarak görev yapar ve Cloudflare ile mükemmel bir uyum içinde çalışır.

1.  İstek önce Cloudflare'e gelir. Sayfa Cloudflare önbelleğinde varsa oradan sunulur.
2.  Eğer sayfa Cloudflare'de yoksa, istek bizim sunucumuza yönlendirilir.
3.  Bizim uygulama seviyesi önbelleğimiz, bu isteği karşılar ve hazır HTML'i Cloudflare'e çok hızlı bir şekilde geri gönderir.
4.  Cloudflare, aldığı bu hızlı cevabı hem ziyaretçiye iletir hem de bir sonraki ziyaretçi için kendi küresel ağına kaydeder.

Bu katmanlı yapı, sitemizin hem coğrafi olarak uzak ziyaretçiler için hızlı olmasını (Cloudflare sayesinde) hem de sunucumuzun gereksiz yere yorulmasını (bizim sistemimiz sayesinde) engeller.
