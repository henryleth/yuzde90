import React, { useState, useEffect, useRef } from 'react'; // useRef eklendi
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, usePage } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { useTheme } from '@/Context/ThemeContext';
import { format } from "date-fns";
import { ChevronRight, ChevronLeft } from 'lucide-react'; // ChevronLeft eklendi
import { Button } from '@/Components/ui/button';
// SSR (Sunucu Tarafı Oluşturma) hatasını çözmek için içe aktarma yöntemi güncellendi.
import LazyLoadImagePkg from 'react-lazy-load-image-component';
const { LazyLoadImage } = LazyLoadImagePkg;
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function DestinationDetail({ seo }) {
  const { destination } = usePage().props; 
  const { fonts, currentFont, darkMode } = useTheme();
  const [activeSection, setActiveSection] = useState('about'); 

  // Carousel ref'leri
  const toursCarouselRef = useRef(null);
  const contentsCarouselRef = useRef(null);

  // Carousel kaydırma fonksiyonları
  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth / 2; // Yarım ekran genişliği kaydır
      ref.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  // Otomatik kaydırma için useEffect
  useEffect(() => {
    const autoScroll = (ref) => {
      if (ref.current) {
        if (ref.current.scrollLeft + ref.current.clientWidth >= ref.current.scrollWidth) {
          ref.current.scrollLeft = 0; // Sona gelince başa dön
        } else {
          ref.current.scrollBy({ left: ref.current.clientWidth / 2, behavior: 'smooth' });
        }
      }
    };

    const tourInterval = setInterval(() => autoScroll(toursCarouselRef), 5000); // Her 5 saniyede bir kaydır
    const contentsInterval = setInterval(() => autoScroll(contentsCarouselRef), 5000);

    return () => {
      clearInterval(tourInterval);
      clearInterval(contentsInterval);
    };
  }, [destination.tours, destination.contents]); // Tur ve İçerik verisi değiştiğinde intervalı yeniden başlat

  if (!destination) {
    return (
      <GuestLayout>
        <div className={`bg-background text-foreground min-h-screen ${fonts[currentFont].class}`}>
          <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Destinasyon Bulunamadı</h1>
            <p className="text-muted-foreground">Aradığınız destinasyon mevcut değil veya silinmiş olabilir.</p>
          </main>
        </div>
      </GuestLayout>
    );
  }

  // TourDetail.jsx'ten alınan aktif bölüm kontrol mantığı
  useEffect(() => {
    const checkActiveSection = () => {
      const sections = ['tours', 'about', 'contents', 'gallery']; // Sekme isimleri ile aynı - yeni sıraya göre güncellendi
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 180 : 200; // Mobil ve masaüstü için farklı offset
      const scrollPosition = window.scrollY + offset;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', checkActiveSection);
    window.addEventListener('resize', checkActiveSection);
    checkActiveSection(); // Sayfa yüklendiğinde bir kere çalıştır

    return () => {
      window.removeEventListener('scroll', checkActiveSection);
      window.removeEventListener('resize', checkActiveSection);
    };
  }, []);

  return (
    <GuestLayout seo={seo}>
      <div className={`destination-detail-page bg-background text-foreground min-h-screen ${fonts[currentFont].class}`}>
        {/* Hero Section */}
        <section className="hero-section relative h-[50vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: `url(${destination.image?.original_url || 'https://images.pexels.com/photos/3418464/pexels-photo-3418464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'})` }}>
          <div className="absolute inset-0 bg-black/60 hero-overlay"></div>
          <div className="relative z-10 text-white p-4 max-w-4xl mx-auto hero-content">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 font-playfair animate-fade-in-up">
              {destination.name}
            </h1>
            {destination.summary && (
              <p className="text-lg md:text-xl mb-4 opacity-0 animate-fade-in-up animation-delay-300">
                {destination.summary}
              </p>
            )}
          </div>
        </section>

        {/* Destinasyon Navigasyon Menüsü */}
        <nav className={`sticky top-16 z-40 w-full border-b border-border ${darkMode ? 'bg-black/60' : 'bg-white/60'} backdrop-blur supports-[backdrop-filter]:`}> 
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap gap-2 py-2">
              <a href="#tours" 
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                   activeSection === 'tours' 
                     ? 'bg-primary text-primary-foreground' 
                     : 'hover:bg-muted'
                 }`}>
                Turlar ({destination.tours.length})
              </a>
              <a href="#about" 
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                   activeSection === 'about' 
                     ? 'bg-primary text-primary-foreground' 
                     : 'hover:bg-muted'
                 }`}>
                Hakkında
              </a>
              <a href="#contents" 
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                   activeSection === 'contents' 
                     ? 'bg-primary text-primary-foreground' 
                     : 'hover:bg-muted'
                 }`}>
                İçerikler ({destination.contents.length})
              </a>
              <a href="#gallery" 
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                   activeSection === 'gallery' 
                     ? 'bg-primary text-primary-foreground' 
                     : 'hover:bg-muted'
                 }`}>
                Galeri ({destination.gallery_images.length})
              </a>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8"> {/* lg:grid-cols-3 kaldırıldı, tek sütun */}
            {/* Ana İçerik */}
            <div className="space-y-8"> {/* lg:col-span-2 kaldırıldı */}
              {/* Turlar Bölümü (En Üstte) */}
              <section id="tours" className="space-y-6">
                <Card className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <CardHeader><h2 className="text-xl font-semibold leading-none tracking-tight">{destination.name} Turlar</h2></CardHeader> {/* h2 etiketi ile değiştirildi */}
                  <CardContent>
                    {destination.tours.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {destination.tours.slice(0, 3).map(tour => (
                                <Card key={tour.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group tours-card flex flex-col">
                                    <Link href={route('tour.show', tour.slug)} className="block">
                                        <div className="relative overflow-hidden tours-card-image-wrapper h-48">
                                            <LazyLoadImage
                                                src={tour.image?.thumbnail_url || 'https://via.placeholder.com/400x200?text=Görsel+Bulunamadı'}
                                                alt={tour.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 tours-card-image"
                                                effect="blur"
                                                wrapperClassName="w-full h-full"
                                            />
                                            {tour.is_popular && (
                                                <div className="absolute top-4 left-4 tours-popular-tag-wrapper">
                                                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium tours-popular-tag">
                                                        En Popüler
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute top-4 right-4 tours-duration-tag-wrapper">
                                                <span className="bg-background/90 text-foreground px-3 py-1 rounded-full text-sm font-medium tours-duration-tag">
                                                    {tour.duration_days} Gün
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="p-6 flex flex-col justify-between flex-grow tours-card-content">
                                        <Link href={route('tour.show', tour.slug)}>
                                            <h3 className="text-xl font-semibold mb-2 tours-card-title hover:text-primary transition-colors">{tour.title}</h3>
                                        </Link>
                                        <p className="text-muted-foreground text-sm mb-4 tours-card-summary">
                                            {tour.summary ? tour.summary.substring(0, 100) + '...' : ''}
                                        </p>
                                            <div className="flex items-center justify-between mb-4 tours-card-meta"> {/* Orijinal meta sınıfı */} 
                                                <div className="flex items-center space-x-4 text-sm text-muted-foreground tours-card-details">
                                                    <span className="flex items-center tours-card-participants">
                                                        <i className="fas fa-users mr-1"></i>
                                                        {tour.min_participants ?? 'N/A'}-{tour.max_participants ?? 'N/A'} Kişi
                                                    </span>
                                                    <span className="flex items-center tours-card-rating">
                                                        <i className="fas fa-star mr-1 text-yellow-500"></i>
                                                        {typeof tour.rating === 'number' ? tour.rating.toFixed(1) : 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between tours-card-footer">
                                                <div>
                                                    <span className="text-2xl font-bold text-primary tours-card-price">€{tour.price_from || 'N/A'}</span>
                                                    <span className="text-sm text-muted-foreground block tours-card-price-label">kişi başına</span>
                                                </div>
                                                <Button asChild className="tours-card-detail-button">
                                                    <Link href={route('tour.show', tour.slug)}>Detayları Gör</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                            ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Bu destinasyon için henüz tur bulunmamaktadır.</p>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* Hakkında Bölümü (İkinci Sırada) */}
              <section id="about" className="space-y-6">
                <Card className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <CardHeader><CardTitle>Destinasyon Hakkında</CardTitle></CardHeader>
                  <CardContent>
                    {destination.description ? (
                      <div className="prose prose-slate dark:prose-invert max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: destination.description }} />
                    ) : (
                      <p className="text-muted-foreground">Bu destinasyon için detaylı bir açıklama bulunmamaktadır.</p>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* İçerikler Bölümü (Üçüncü Sırada) */}
              <section id="contents" className="space-y-6">
                <Card className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <CardHeader><h2 className="text-xl font-semibold leading-none tracking-tight">{destination.name} İçerikleri</h2></CardHeader> {/* h2 etiketi ile değiştirildi */}
                  <CardContent>
                    {destination.contents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-x-auto hide-scrollbar">
                            {destination.contents.slice(0, 4).map(content => (
                                <Card key={content.id} className="blog-post-card bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group h-full flex flex-col">
                                    <Link href={route('contents.show', content.slug)} className="block">
                                        <div className="relative w-full h-48 overflow-hidden">
                                            <LazyLoadImage
                                                src={content.image?.thumbnail_url || 'https://placehold.co/600x400?text=Görsel+Bulunamadı'}
                                                alt={content.title}
                                                className="blog-post-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                effect="blur"
                                                wrapperClassName="w-full h-full"
                                            />
                                        </div>
                                    </Link>
                                    <CardContent className="blog-post-content p-4 flex flex-col flex-grow">
                                        <Link href={route('contents.show', content.slug)} className="blog-post-title-link block">
                                            <h3 className="blog-post-title text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                                                {content.title}
                                            </h3>
                                        </Link>
                                    {content.summary && (
                                      <p className="blog-post-summary text-muted-foreground text-sm line-clamp-3 mb-auto"> {/* blog-post-summary eklendi */} 
                                        {content.summary ? content.summary.substring(0, 150) + (content.summary.length > 150 ? '...' : '') : 'Bu blog yazısı için özet bulunmamaktadır.'} {/* Uzunluk kontrolü ve varsayılan metin */} 
                                      </p>
                                    )}
                                    {/* Kategori ve Konum Etiketleri */}
                                    <div className="blog-post-meta flex flex-wrap gap-2 items-center text-xs text-muted-foreground mt-4"> {/* blog-post-meta eklendi */} 
                                        {(content.content_categories || []).map(cat => ( // Undefined kontrolü eklendi
                                            <span key={cat.id} className="blog-category-tag bg-muted rounded-full px-2 py-1 flex items-center"> {/* blog-category-tag eklendi */} 
                                                <i className="fas fa-tag mr-1 text-primary"></i>
                                                {cat.name}
                                            </span>
                                        ))}
                                        {(content.destinations || []).map(dest => ( // Undefined kontrolü eklendi
                                            <span key={dest.id} className="blog-destination-tag bg-muted rounded-full px-2 py-1 flex items-center"> {/* blog-destination-tag eklendi */} 
                                                <i className="fas fa-map-marker-alt mr-1 text-secondary"></i>
                                                {dest.name}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="blog-post-date-readtime flex items-center justify-between text-xs text-muted-foreground mt-4 pt-4 border-t border-border"> {/* blog-post-date-readtime eklendi */} 
                                        <p>{content.published_at ? format(new Date(content.published_at), 'dd.MM.yyyy') : '-'}</p> {/* format fonksiyonu kullanıldı */} 
                                        {content.content && (
                                            <p>{Math.ceil(content.content.split(' ').length / 200)} dk okuma</p>
                                        )}
                                    </div>
                                    <Link href={route('contents.show', content.slug)} className="blog-read-more-link inline-flex items-center mt-4 text-primary hover:underline text-sm font-medium transition-colors">
                                        Devamını Oku <span className="ml-1">&rarr;</span>
                                    </Link>
                                  </CardContent>
                                </Card>
                            ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Bu destinasyon için henüz içerik bulunmamaktadır.</p>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* Galeri Bölümü (En Sonda) */}
              <section id="gallery" className="space-y-6">
                <Card className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <CardHeader><h2 className="text-xl font-semibold leading-none tracking-tight">{destination.name} Galerisi</h2></CardHeader> {/* h2 etiketi ile değiştirildi */}
                  <CardContent>
                    {destination.gallery_images.length > 0 ? (
                      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
                        {destination.gallery_images.map(image => (
                          <div key={image.id} className="mb-4 break-inside-avoid relative group rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200">
                            <LazyLoadImage
                              src={image.thumbnail_url || '/placeholder.svg'}
                              alt={image.file_name}
                              className="w-full h-auto object-cover rounded-md"
                              effect="blur"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Bu destinasyon için henüz galeri görseli bulunmamaktadır.</p>
                    )}
                  </CardContent>
                </Card>
              </section>

            </div>

            {/* Sağ Sütun Kaldırıldı */}
            {/* <div className="lg:col-span-1">
   294→              <div className="sticky top-32">
   295→                <Card className="bg-card rounded-lg border border-border p-6 shadow-sm">
   296→                    <h3 className="text-xl font-semibold mb-6">Destinasyon Bilgileri</h3>
   297→                    <p className="text-muted-foreground text-sm">Buraya destinasyonla ilgili ek bilgiler veya iletişim formu eklenebilir.</p>
   298→                </Card>
   299→              </div>
   300→            </div> */}
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
