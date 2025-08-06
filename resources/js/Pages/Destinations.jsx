import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation'; // Çeviri hook'u eklendi
import { Card, CardContent } from '@/Components/ui/card'; // Card bileşenlerini import et
import { useTheme } from '@/Context/ThemeContext'; // useTheme hook'unu import et
import LazyImage from '@/Components/LazyImage'; // Merkezi LazyImage bileşenini import et

export default function Destinations({ seo }) {
  const { destinations } = usePage().props; // Backend'den gelen destinasyon verisi
  const { t } = useTranslation();

  return (
    <GuestLayout seo={seo}>
      <div className={`destinations-page bg-background text-foreground min-h-screen`}>
        {/* Hero Section - Genel bir destinasyon başlığı */}
        <section className="hero-section relative h-[40vh] md:h-[50vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: `url(${destinations[0]?.image?.original_url || '/images/hero-destinations.jpg'})` }}>
          <div className="absolute inset-0 bg-black/60 hero-overlay"></div>
          <div className="relative z-10 text-white p-4 max-w-4xl mx-auto hero-content">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 font-playfair animate-fade-in-up">
              {t('destinations_page.hero.title', 'Keşfedilecek Destinasyonlar')}
            </h1>
            <p className="text-lg md:text-xl mb-4 opacity-0 animate-fade-in-up animation-delay-300">
              {t('destinations_page.hero.subtitle', "Türkiye'nin dört bir yanındaki eşsiz güzellikleri keşfedin.")}
            </p>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6">{t('destinations_page.main.title', 'Tüm Destinasyonlarımız')}</h2>

          {destinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map(destination => (
                <Link key={destination.id} href={route('destinations.show', { slug: destination.slug })} className="block">
                  <Card className="destination-card bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group">
                    <div className="relative w-full h-48 overflow-hidden">
                      {/* 
                        LazyImage bileşeni, resimlerin sadece kullanıcı ekranına geldiğinde yüklenmesini sağlar.
                        'effect="blur"' prop'u, resim yüklenene kadar bulanık bir placeholder gösterir.
                        Bu, sayfa yükleme performansını artırır ve kullanıcı deneyimini iyileştirir.
                      */}
                      <LazyImage
                        src={destination.image?.thumbnail_url || '/placeholder.svg'} // Resim kaynağı
                        alt={destination.name} // Alternatif metin
                        className="destination-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        effect="blur" // Yükleme efekti
                        wrapperClassName="w-full h-full"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                        {destination.name}
                      </h3>
                      {destination.summary && (
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-2">
                          {destination.summary}
                        </p>
                      )}
                      {destination.lowest_tour_price !== null && (
                        <p className="text-sm text-primary font-bold mt-2">
                          {t('destinations_page.card.starts_from', 'starts from')} €{destination.lowest_tour_price}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">{t('destinations_page.no_destinations_found', 'Henüz keşfedilecek destinasyon bulunamadı.')}</p>
          )}
        </main>
      </div>
    </GuestLayout>
  );
}
