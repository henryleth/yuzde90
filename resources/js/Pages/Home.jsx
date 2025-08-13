import { Link, router } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation'; // Çeviri hook'u eklendi
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState, useEffect } from 'react';
import LazyImage from '@/Components/LazyImage'; // LazyImage bileşenini import et
import { Globe, Star, Wallet } from 'lucide-react';

// Merkezi Kart Bileşenlerini ve Etiketi İçe Aktarma
import TourCard from '@/Components/TourCard';
import FeaturedBadge from '@/Components/Badges/FeaturedBadgeCorner';

export default function Home({ tours, popularDestinations, seo }) {
  const { t } = useTranslation(); // locale'e artık burada ihtiyacımız yok
  // Video hazır olma durumunu ve iframe dikey konumunu yöneten state'ler
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [iframeTop, setIframeTop] = useState('-20%'); // Varsayılan masaüstü değeri

  // Ekran boyutuna göre iframe konumunu ayarlar
  useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth < 768) { // Mobil için
              setIframeTop('-50%');
          } else { // Masaüstü için
              setIframeTop('-20%');
          }
      };

      handleResize(); // İlk yüklemede çalıştır
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
  }, []);

     return (
         <GuestLayout seo={seo}>
            {/* Hero Section */}
            <section className="relative h-[calc(100vh-64px)] flex items-center justify-center text-center overflow-hidden">
                {/* Arka Plan: Video veya Resim */}
                <div className="absolute inset-0 w-full h-full">
                    {/* Video hazır olana kadar kapak görseli gösterilir */}
                    {!isVideoReady && (
                        <LazyImage
                            src="https://img.youtube.com/vi/oe_kmwcO1ag/maxresdefault.jpg"
                            alt="Video Thumbnail"
                            className="w-full h-full object-cover"
                            wrapperClassName="w-full h-full"
                            effect="blur"
                        />
                    )}
                    {/* Video iframe'i her zaman DOM'da bulunur ancak sadece hazır olduğunda görünür olur */}
                    <iframe
                        className={`absolute transition-opacity duration-1000 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            width: '355.55%',
                            height: '200%',
                            left: '-127.77%',
                            top: iframeTop,
                        }}
                        src="https://www.youtube.com/embed/oe_kmwcO1ag?autoplay=1&mute=1&loop=1&playlist=oe_kmwcO1ag&controls=0&modestbranding=1&rel=0"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        onLoad={() => setIsVideoReady(true)} // Video yüklendiğinde durumu güncelle
                    ></iframe>
                </div>

                {/* Karartma Katmanı */}
                <div className="absolute inset-0 bg-black/55"></div>

                {/* Metin İçeriği Katmanı */}
                <div className="relative z-10 text-white p-4 max-w-6xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up font-playfair">
                        {t('home.hero.title', "Türkiye'nin Keşfedilmeyi Bekleyen Cennetleri")}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 opacity-0 animate-fade-in-up animation-delay-300">
                        {t('home.hero.subtitle', "Unutulmaz turlar ve eşsiz deneyimlerle Türkiye'nin büyülü güzelliklerini keşfedin.")}
                    </p>
                    <Button
                        asChild
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 opacity-0 animate-fade-in-up animation-delay-600"
                    >
                        <Link href={route('tours.index')}>{t('home.hero.button', "Tüm Turlarımızı Keşfedin")}</Link>
                    </Button>
                </div>
            </section>

            {/* Pazarlama ve Güven Odaklı Bölüm */}
            <section className="marketing-and-trust-section py-16 bg-muted/40">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                        {/* Sol Taraf: Pazarlama Metinleri */}
                        <div className="md:col-span-2">
                            <h2 className="text-3xl font-bold text-amber-600 mb-4 font-playfair">
                                {t('home.marketing.title', "Hayallerinizdeki Türkiye Turu, Profesyonel Dokunuşlarla Gerçeğe Dönüşüyor")}
                            </h2>
                            <p className="text-muted-foreground mb-6 text-lg">
                                {t('home.marketing.subtitle1', "Büyüleyici İstanbul'dan masalsı Kapadokya'ya, antik Efes'ten bembeyaz Pamukkale'ye uzanan bu topraklarda, size özel olarak hazırladığımız, sadece İspanyolca konuşan profesyonel rehberler eşliğinde unutulmaz anılar biriktirin.")}
                            </p>
                            <h3 className="text-2xl font-bold text-amber-600 mb-4 font-playfair">
                                {t('home.marketing.title2', "Her Şey Dahil, Stresten Uzak Bir Tatil Deneyimi")}
                            </h3>
                            <p className="text-muted-foreground text-lg">
                                {t('home.marketing.subtitle2', "Uluslararası uçuşlarınız hariç tüm detayları biz düşünüyoruz. Size sadece Türkiye'nin tadını çıkarmak kalıyor. Konforlu konaklama, yerel lezzetler ve kusursuz bir seyahat planı ile yolculuğunuzun her anı keyif dolu geçecek.")}
                            </p>
                        </div>

                        {/* Sağ Taraf: Sosyal Kanıt ve Güven Simgeleri */}
                        <div className="flex flex-col items-center space-y-6">
                            <a href="https://www.tripadvisor.es/Attraction_Review-g293974-d13153444-Reviews-Pride_Travel-Istanbul.html" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                                <LazyImage src="https://logodix.com/logo/464050.png" alt="TripAdvisor" className="h-48" wrapperClassName="h-48" effect="blur"/>
                            </a>
                            <div className="border p-4 rounded-lg text-center bg-card shadow-lg w-full">
                                <a href="https://www.tursab.org.tr/tr/dd-acente-sorgulama" target="_blank" rel="noopener noreferrer" className="group">
                                    <p className="font-extrabold text-xl text-red-600 group-hover:text-red-700 transition-colors">TÜRSAB</p>
                                    <p className="text-sm font-semibold text-muted-foreground">{t('home.marketing.tursab_title', 'Resmi Acente Doğrulama')}</p>
                                    <p className="text-xs mt-2 text-muted-foreground group-hover:text-foreground transition-colors" dangerouslySetInnerHTML={{ __html: t('home.marketing.tursab_text', 'Güvenliğiniz bizim için öncelik. <br/> <span class="font-bold">A-5240</span> lisans numaramızla kaydımızı doğrulayın.') }} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Featured Tours Section */}
            <section className="py-16 bg-muted/40">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 font-playfair">{t('home.featured_tours.title', "Öne Çıkan Turlarımız")}</h2>
                    {tours.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tours.map((tour, index) => (
                                <TourCard 
                                    key={tour.id} 
                                    tour={tour} 
                                    featuredBadge={FeaturedBadge} 
                                    // LCP optimizasyonu: Sadece ilk tur kartının resmini öncelikli yükle.
                                    isLcp={index === 0} 
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">{t('home.featured_tours.no_tours', "Şu anda öne çıkan tur bulunmamaktadır.")}</p>
                    )}
                </div>
            </section>

            {/* Popüler Destinasyonlar Section */}
            <section className="py-16 bg-muted/40"> {/* Arka plan rengi eski haline getirildi */}
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 font-playfair">{t('home.popular_destinations.title', "Popüler Destinasyonlar")}</h2>
                    {popularDestinations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Carousel yerine grid düzeni */}
                            {popularDestinations.map((destination) => (
                                <Link key={destination.id} href={route('destinations.show', { slug: destination.slug })} className="block">
                                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group">
                                        <div className="relative w-full h-64"> {/* Görsel boyutu artırıldı */}
                                            <LazyImage
                                                src={destination.image?.thumbnail_url || 'https://placehold.co/400x200?text=Görsel+Bulunamadı'}
                                                alt={destination.name}
                                                className="w-full h-full object-cover"
                                                wrapperClassName="w-full h-full"
                                                effect="blur"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:from-black/50">
                                                <div className="text-white">
                                                    <h3 className="text-2xl font-bold mb-1 destinasyon-baslik">{destination.name}</h3>
                                                    <p className="text-sm opacity-90 mb-2 destinasyon-aciklama">{destination.summary}</p>
                                                </div>
                                                <div className="flex justify-end mt-4">
                                                    <Button onClick={(e) => { e.preventDefault(); router.visit(route('destinations.show', { slug: destination.slug }))}} className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 destinasyon-butonu">
                                                        {t('home.popular_destinations.button', "Turları Gör")}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">{t('home.popular_destinations.no_destinations', "Şu anda popüler destinasyon bulunmamaktadır.")}</p>
                    )}
                </div>
            </section>

            {/* About Us / Why Choose Us Section */}
            <section className="py-16 bg-background">
                <div className="max-w-6xl mx-auto px-4"> {/* max-w-6xl -> max-w-7xl */}
                    <h2 className="text-4xl font-bold mb-8 font-playfair">{t('home.why_us.title', "Neden Bizi Seçmelisiniz?")}</h2>
                    <p className="text-lg text-muted-foreground max-w-7xl mx-auto mb-12">
                        {t('home.why_us.subtitle', "Yılların verdiği tecrübe ve müşteri memnuniyeti odaklı hizmet anlayışımızla, size en iyi seyahat deneyimini sunmak için buradayız.")}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-card rounded-lg shadow-md border border-border">
                            <Globe className="h-12 w-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{t('home.why_us.item1_title', "Geniş Destinasyon Seçenekleri")}</h3>
                            <p className="text-muted-foreground text-sm">{t('home.why_us.item1_text', "Türkiye'nin her köşesinden eşsiz turlar.")}</p>
                        </div>
                        <div className="p-6 bg-card rounded-lg shadow-md border border-border">
                            <Star className="h-12 w-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{t('home.why_us.item2_title', "Müşteri Memnuniyeti")}</h3>
                            <p className="text-muted-foreground text-sm">{t('home.why_us.item2_text', "Binlerce mutlu müşteri yorumu.")}</p>
                        </div>
                        <div className="p-6 bg-card rounded-lg shadow-md border border-border">
                            <Wallet className="h-12 w-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{t('home.why_us.item3_title', "Uygun Fiyatlar")}</h3>
                            <p className="text-muted-foreground text-sm">{t('home.why_us.item3_text', "En uygun fiyat garantisi.")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-primary text-primary-foreground text-center">
                <div className="max-w-6xl mx-auto px-4"> {/* max-w-4xl -> max-w-7xl */}
                    <h2 className="text-4xl font-bold mb-6 font-playfair">{t('home.cta.title', "Hayalinizdeki Turu Planlayın")}</h2>
                    <p className="text-lg mb-8 opacity-80">
                        {t('home.cta.subtitle', "Türkiye'nin büyüleyici manzaralarını keşfetmek için daha ne bekliyorsunuz? Hemen bize ulaşın!")}
                    </p>
                    <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                        <Link href={route('contact.us')}>{t('home.cta.button', "Bize Ulaşın")}</Link>
                    </Button>
                </div>
            </section>

         </GuestLayout>
     );
}
