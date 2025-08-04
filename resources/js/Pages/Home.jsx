import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/Context/ThemeContext';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState, useEffect } from 'react';

// Merkezi Kart Bileşenlerini ve Etiketi İçe Aktarma
import TourCard from '@/Components/TourCard';
// import DestinationCard from '@/Components/CardDesigns/DestinationCardV1'; // Bu hala ayrı, isteğe göre birleştirilebilir - Kaldırıldı
import FeaturedBadge from '@/Components/Badges/FeaturedBadgeCorner';

export default function Home({ tours, popularDestinations, seo }) {
  // console.log("Home bileşenine gelen popularDestinations prop'u:", popularDestinations); // popularDestinations prop'unu konsola yazdım - kaldırıldı
  const { darkMode, toggleDarkMode, currentFont, changeFont, fonts } = useTheme();

  // Video yükleme durumunu takip etmek için state ekledik
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Iframe'in dikey konumunu ayarlamak için state ekledik
  const [iframeTop, setIframeTop] = useState('-20%'); // Varsayılan masaüstü değeri

  // Bileşen yüklendikten sonra videoyu yüklemek ve konumu ayarlamak için useEffect kullandık
  useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth < 768) { // Tailwind'in md breakpoint'ini mobil için varsaydık
              setIframeTop('-50%');
          } else {
              setIframeTop('-20%');
          }
      };

      // İlk değeri ayarla
      handleResize();

      // Boyut değiştiğinde konumu güncelle
      window.addEventListener('resize', handleResize);

      // Sayfa yüklendikten sonra videoyu yüklemek için kısa bir gecikme ekledik
      const timer = setTimeout(() => {
          setVideoLoaded(true);
      }, 500); // 500ms gecikme ile videoyu yükle

      return () => {
          clearTimeout(timer);
          window.removeEventListener('resize', handleResize);
      };
  }, []);

     return (
         <GuestLayout seo={seo}>
            {/* Hero Section */}
            <section className="relative h-[calc(100vh-64px)] flex items-center justify-center text-center overflow-hidden">
                {videoLoaded && (
                    <iframe
                        className="absolute"
                        style={{
                            width: '355.55%', // 16:9 en boy oranını korurken konteyner genişliğine göre ayarlandı
                            height: '200%',   // Konteynerin iki katı yükseklik, %50 içerik görünürlüğünü sağlar
                            left: '-127.77%', // Genişletilmiş iframe'i yatayda ortala
                            top: iframeTop       // Dikeyde %10 üstten kesme sağlamak için konumlandır
                        }}
                        src="https://www.youtube.com/embed/oe_kmwcO1ag?autoplay=1&mute=1&loop=1&playlist=oe_kmwcO1ag&controls=0&modestbranding=1&rel=0"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    >
                    </iframe>
                )}
                <div className="absolute inset-0 bg-black/55"></div>
                <div className="relative z-10 text-white p-4 max-w-6xl mx-auto"> {/* max-w-4xl -> max-w-7xl */}
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up font-playfair">
                        Türkiye'nin Keşfedilmeyi Bekleyen Cennetleri
                    </h1>
                    <p className="text-lg md:text-xl mb-8 opacity-0 animate-fade-in-up animation-delay-300">
                        Unutulmaz turlar ve eşsiz deneyimlerle Türkiye'nin büyülü güzelliklerini keşfedin.
                    </p>
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 opacity-0 animate-fade-in-up animation-delay-600">
                        <Link href="/tours">Tüm Turlarımızı Keşfedin</Link>
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
                                Hayallerinizdeki Türkiye Turu, Profesyonel Dokunuşlarla Gerçeğe Dönüşüyor
                            </h2>
                            <p className="text-muted-foreground mb-6 text-lg">
                                Büyüleyici İstanbul'dan masalsı Kapadokya'ya, antik Efes'ten bembeyaz Pamukkale'ye uzanan bu topraklarda, size özel olarak hazırladığımız, <span className="font-semibold text-foreground">sadece İspanyolca konuşan profesyonel rehberler</span> eşliğinde unutulmaz anılar biriktirin.
                            </p>
                            <h3 className="text-2xl font-bold text-amber-600 mb-4 font-playfair">
                                Her Şey Dahil, Stresten Uzak Bir Tatil Deneyimi
                            </h3>
                            <p className="text-muted-foreground text-lg">
                                Uluslararası uçuşlarınız hariç tüm detayları biz düşünüyoruz. Size sadece Türkiye'nin tadını çıkarmak kalıyor. Konforlu konaklama, yerel lezzetler ve kusursuz bir seyahat planı ile yolculuğunuzun her anı keyif dolu geçecek.
                            </p>
                        </div>

                        {/* Sağ Taraf: Sosyal Kanıt ve Güven Simgeleri */}
                        <div className="flex flex-col items-center space-y-6">
                            <a href="https://www.tripadvisor.es/Attraction_Review-g293974-d13153444-Reviews-Pride_Travel-Istanbul.html" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                                <img src="https://logodix.com/logo/464050.png" alt="TripAdvisor" className="h-48"/>
                            </a>
                            <div className="border p-4 rounded-lg text-center bg-card shadow-lg w-full">
                                <a href="https://www.tursab.org.tr/tr/dd-acente-sorgulama" target="_blank" rel="noopener noreferrer" className="group">
                                    <p className="font-extrabold text-xl text-red-600 group-hover:text-red-700 transition-colors">TÜRSAB</p>
                                    <p className="text-sm font-semibold text-muted-foreground">Resmi Acente Doğrulama</p>
                                    <p className="text-xs mt-2 text-muted-foreground group-hover:text-foreground transition-colors">
                                        Güvenliğiniz bizim için öncelik. <br/> <span className="font-bold">A-5240</span> lisans numaramızla kaydımızı doğrulayın.
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Featured Tours Section */}
            <section className="py-16 bg-muted/40">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 font-playfair">Öne Çıkan Turlarımız</h2>
                    {tours.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tours.map((tour) => <TourCard key={tour.id} tour={tour} featuredBadge={FeaturedBadge} />)}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">Şu anda öne çıkan tur bulunmamaktadır.</p>
                    )}
                </div>
            </section>

            {/* Popüler Destinasyonlar Section */}
            <section className="py-16 bg-muted/40"> {/* Arka plan rengi eski haline getirildi */}
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 font-playfair">Popüler Destinasyonlar</h2>
                    {popularDestinations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Carousel yerine grid düzeni */}
                            {popularDestinations.map((destination) => (
                                <Link key={destination.id} href={route('destinations.show', destination.slug)} className="block">
                                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group">
                                        <div className="relative w-full h-64"> {/* Görsel boyutu artırıldı */}
                                            <img
                                                src={destination.image?.thumbnail_url || 'https://via.placeholder.com/400x200?text=Görsel+Bulunamadı'}
                                                alt={destination.name}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:from-black/50">
                                                <div className="text-white">
                                                    <h3 className="text-2xl font-bold mb-1 destinasyon-baslik">{destination.name}</h3>
                                                    <p className="text-sm opacity-90 mb-2 destinasyon-aciklama">{destination.summary}</p>
                                                </div>
                                                <div className="flex justify-end mt-4">
                                                    <Button onClick={() => router.visit(route('destinations.show', destination.slug))} className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 destinasyon-butonu">
                                                        Turları Gör
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">Şu anda popüler destinasyon bulunmamaktadır.</p>
                    )}
                </div>
            </section>

            {/* About Us / Why Choose Us Section */}
            <section className="py-16 bg-background">
                <div className="max-w-6xl mx-auto px-4"> {/* max-w-6xl -> max-w-7xl */}
                    <h2 className="text-4xl font-bold mb-8 font-playfair">Neden Bizi Seçmelisiniz?</h2>
                    <p className="text-lg text-muted-foreground max-w-7xl mx-auto mb-12">
                        Yılların verdiği tecrübe ve müşteri memnuniyeti odaklı hizmet anlayışımızla, size en iyi seyahat deneyimini sunmak için buradayız.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-card rounded-lg shadow-md border border-border">
                            <i className="fas fa-globe text-primary text-5xl mb-4"></i>
                            <h3 className="text-xl font-semibold mb-2">Geniş Destinasyon Seçenekleri</h3>
                            <p className="text-muted-foreground text-sm">Türkiye'nin her köşesinden eşsiz turlar.</p>
                        </div>
                        <div className="p-6 bg-card rounded-lg shadow-md border border-border">
                            <i className="fas fa-star text-primary text-5xl mb-4"></i>
                            <h3 className="text-xl font-semibold mb-2">Müşteri Memnuniyeti</h3>
                            <p className="text-muted-foreground text-sm">Binlerce mutlu müşteri yorumu.</p>
                        </div>
                        <div className="p-6 bg-card rounded-lg shadow-md border border-border">
                            <i className="fas fa-wallet text-primary text-5xl mb-4"></i>
                            <h3 className="text-xl font-semibold mb-2">Uygun Fiyatlar</h3>
                            <p className="text-muted-foreground text-sm">En uygun fiyat garantisi.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-primary text-primary-foreground text-center">
                <div className="max-w-6xl mx-auto px-4"> {/* max-w-4xl -> max-w-7xl */}
                    <h2 className="text-4xl font-bold mb-6 font-playfair">Hayalinizdeki Turu Planlayın</h2>
                    <p className="text-lg mb-8 opacity-80">
                        Türkiye'nin büyüleyici manzaralarını keşfetmek için daha ne bekliyorsunuz? Hemen bize ulaşın!
                    </p>
                    <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                        <Link href="/contact">Bize Ulaşın</Link>
                    </Button>
                </div>
            </section>

         </GuestLayout>
     );
}
