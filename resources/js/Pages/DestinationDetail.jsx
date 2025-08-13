import React, { useState, useEffect, useRef } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { useTheme } from '@/Context/ThemeContext';
import { format } from "date-fns";
import { Users, Star, Tag, MapPin } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import LazyImage from '@/Components/LazyImage';
import TourCard from '@/Components/TourCard'; // TourCard bileşenini import et

export default function DestinationDetail({ seo }) {
  const { destination } = usePage().props;
  const { t } = useTranslation();
  const { darkMode, setHeaderShrunk } = useTheme(); // setHeaderShrunk eklendi
  const [activeSection, setActiveSection] = useState('tours');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isNavSticky, setNavSticky] = useState(false); // Navigasyonun yapışkan durumu için state
  const [navTop, setNavTop] = useState(64); // Navigasyonun 'top' pozisyonu için state

  // İçerik filtreleme ve sayfalama için state'ler
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleContents, setVisibleContents] = useState(4);

  const toursCarouselRef = useRef(null);
  const heroRef = useRef(null); // Hero bölümü için ref eklendi
  const navRef = useRef(null); // Navigasyon menüsü için ref eklendi

  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth / 2;
      ref.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const autoScroll = (ref) => {
      if (ref.current) {
        if (ref.current.scrollLeft + ref.current.clientWidth >= ref.current.scrollWidth) {
          ref.current.scrollLeft = 0;
        } else {
          ref.current.scrollBy({ left: ref.current.clientWidth / 2, behavior: 'smooth' });
        }
      }
    };

    const tourInterval = setInterval(() => autoScroll(toursCarouselRef), 5000);
    return () => {
      clearInterval(tourInterval);
    };
  }, [destination.tours]);

  if (!destination) {
    return (
      <GuestLayout>
        <div className={`bg-background text-foreground min-h-screen`}>
          <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">{t('destination_detail.not_found.title', 'Destinasyon Bulunamadı')}</h1>
            <p className="text-muted-foreground">{t('destination_detail.not_found.text', 'Aradığınız destinasyon mevcut değil veya silinmiş olabilir.')}</p>
          </main>
        </div>
      </GuestLayout>
    );
  }

  useEffect(() => {
    const checkActiveSection = () => {
      const sections = ['tours', 'about', 'contents', 'gallery'];
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 180 : 200;
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
    checkActiveSection();

    return () => {
      window.removeEventListener('scroll', checkActiveSection);
      window.removeEventListener('resize', checkActiveSection);
    };
  }, []);

  // Header daraltma ve navigasyon pozisyonu için birleşik useEffect
  useEffect(() => {
    const handleScrollAndResize = () => {
      if (!heroRef.current || !navRef.current) return;

      const isMobile = window.innerWidth < 768;
      const heroHeight = heroRef.current.offsetHeight;
      const scrollPosition = window.scrollY;
      const headerHeight = 64; // Standart header yüksekliği (h-16)
      const shrunkHeaderHeight = 40; // Küçülmüş header yüksekliği (h-10)

      // 1. Header'ı daraltma mantığı (sadece mobilde)
      const shouldShrink = isMobile && scrollPosition > (heroHeight - headerHeight);
      setHeaderShrunk(shouldShrink);

      // 2. Alt menünün sticky ve 'top' pozisyonu mantığı
      const effectiveHeaderHeight = shouldShrink ? shrunkHeaderHeight : headerHeight;
      const stickyThreshold = heroHeight - effectiveHeaderHeight;

      if (scrollPosition > stickyThreshold) {
        setNavSticky(true);
        setNavTop(effectiveHeaderHeight);
      } else {
        setNavSticky(false);
        // Yapışkan olmadığında top değeri önemli değil, ancak varsayılan olarak ayarlanabilir.
        setNavTop(headerHeight); 
      }
    };

    window.addEventListener('scroll', handleScrollAndResize);
    window.addEventListener('resize', handleScrollAndResize);
    handleScrollAndResize(); // İlk yüklemede durumu kontrol et

    return () => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
      setHeaderShrunk(false); // Component kaldırıldığında header'ı varsayılan durumuna döndür
    };
  }, [setHeaderShrunk]);

  return (
    <GuestLayout seo={seo}>
      <div className={`destination-detail-page bg-background text-foreground min-h-screen`}>
        {/* Hero Section */}
        <section 
          ref={heroRef} // Ref hero bölümüne eklendi
          className="hero-section relative h-[50vh] flex items-center justify-center text-center">
          {/* LCP Optimizasyonu: Arka plan resmi yerine yüksek öncelikli bir <img> etiketi kullanılıyor. */}
          <img
            src={destination.image?.original_url || 'https://images.pexels.com/photos/3418464/pexels-photo-3418464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
            alt={destination.name}
            fetchpriority="high"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover"
          />
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
        <nav 
          ref={navRef}
          className={`w-full border-b border-border ${darkMode ? 'bg-black/60' : 'bg-white/60'} backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60 ${isNavSticky ? 'sticky z-40' : ''}`}
          style={{ top: isNavSticky ? `${navTop}px` : 'auto' }} // Dinamik 'top' değeri
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap gap-2 py-2">
              <a href="#tours"
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                   activeSection === 'tours' 
                     ? 'bg-primary text-primary-foreground' 
                     : 'hover:bg-muted'
                 }`}>
                {t('destination_detail.nav.tours', 'Turlar')} ({destination.tours.length})
              </a>
              <a href="#about" 
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                   activeSection === 'about' 
                     ? 'bg-primary text-primary-foreground' 
                     : 'hover:bg-muted'
                 }`}>
                {t('destination_detail.nav.about', 'Hakkında')}
              </a>
              <a href="#contents" 
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                   activeSection === 'contents' 
                     ? 'bg-primary text-primary-foreground' 
                     : 'hover:bg-muted'
                 }`}>
                {t('destination_detail.nav.contents', 'İçerikler')} ({destination.contents.length})
              </a>
              <a href="#gallery" 
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                   activeSection === 'gallery' 
                     ? 'bg-primary text-primary-foreground' 
                     : 'hover:bg-muted'
                 }`}>
                {t('destination_detail.nav.gallery', 'Galeri')} ({destination.gallery_images.length})
              </a>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-8">
              {/* Turlar Bölümü */}
              <section id="tours" className="space-y-6">
                <Card className="bg-card rounded-lg border border-border shadow-sm">
                  <CardHeader>
                    <h2 className="text-2xl font-bold">{t('destination_detail.tours.title', '{name} Turları', { name: destination.name })}</h2>
                  </CardHeader>
                  <CardContent>
                    {destination.tours.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
                        {destination.tours.slice(0, 3).map((tour, index) => (
                          <TourCard 
                            key={tour.id} 
                            tour={tour} 
                            // LCP optimizasyonu: Sadece ilk tur kartının resmini öncelikli yükle.
                            isLcp={index === 0}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">{t('destination_detail.tours.no_tours_found', 'Bu destinasyon için henüz tur bulunmamaktadır.')}</p>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* Hakkında Bölümü */}
              <section id="about" className="space-y-6">
                <Card className="bg-card rounded-lg border border-border shadow-sm">
                  <CardHeader>
                    <CardTitle>{t('destination_detail.about.title', 'Destinasyon Hakkında')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {destination.description ? (
                      <div className="prose prose-slate dark:prose-invert max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: destination.description }} />
                    ) : (
                      <p className="text-muted-foreground">{t('destination_detail.about.no_description', 'Bu destinasyon için detaylı bir açıklama bulunmamaktadır.')}</p>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* İçerikler Bölümü */}
              <section id="contents" className="space-y-6">
                <Card className="bg-card rounded-lg border border-border shadow-sm">
                  <CardHeader>
                    <h2 className="text-2xl font-bold">{t('destination_detail.contents.title', '{name} İçerikleri', { name: destination.name })}</h2>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      // 1. Tüm kategorileri topla ve tekilleştir
                      const allCategories = destination.contents.flatMap(content => content.content_categories || []);
                      const uniqueCategories = allCategories.reduce((acc, category) => {
                        if (!acc.find(item => item.id === category.id)) {
                          acc.push(category);
                        }
                        return acc;
                      }, []);

                      // 2. Seçilen kategoriye göre içerikleri filtrele
                      const filteredContents = destination.contents.filter(content => {
                        if (selectedCategory === 'all') return true;
                        return (content.content_categories || []).some(cat => cat.id === selectedCategory);
                      });

                      // 3. "Daha Fazla Yükle" butonu için mantık
                      const handleLoadMore = () => {
                        setVisibleContents(prev => prev + 4);
                      };

                      if (destination.contents.length === 0) {
                        return <p className="text-muted-foreground">{t('destination_detail.contents.no_contents_found', 'Bu destinasyon için henüz içerik bulunmamaktadır.')}</p>;
                      }

                      return (
                        <>
                          {/* Kategori Filtreleme Butonları */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            <Button
                              variant={selectedCategory === 'all' ? 'default' : 'outline'}
                              onClick={() => {
                                setSelectedCategory('all');
                                setVisibleContents(4); // Filtre değiştiğinde gösterilen içerik sayısını sıfırla
                              }}
                            >
                              {t('all', 'Tümü')}
                            </Button>
                            {uniqueCategories.map(category => (
                              <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? 'default' : 'outline'}
                                onClick={() => {
                                  setSelectedCategory(category.id);
                                  setVisibleContents(4); // Filtre değiştiğinde gösterilen içerik sayısını sıfırla
                                }}
                              >
                                {category.name}
                              </Button>
                            ))}
                          </div>

                          {/* İçerik Kartları */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredContents.slice(0, visibleContents).map(content => (
                              <Card key={content.id} className="content-card bg-card rounded-lg border border-border overflow-hidden shadow-sm transition-all duration-200 flex flex-col sm:flex-row md:h-[15rem]">
                                {/* Sol Taraf: Resim (Tıklanabilir) */}
                                <Link href={route('contents.show', { slug: content.slug })} className="content-card-image-link block w-full sm:w-1/3 flex-shrink-0 group">
                                  <div className="relative h-48 sm:h-full overflow-hidden">
                                    <LazyImage
                                      src={content.image?.thumbnail_url || 'https://placehold.co/400x400?text=Görsel+Yok'}
                                      alt={content.title}
                                      className="content-card-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                      effect="blur"
                                      wrapperClassName="w-full h-full"
                                    />
                                  </div>
                                </Link>
                                {/* Sağ Taraf: İçerik */}
                                <CardContent className="content-card-content p-4 flex flex-col flex-grow w-full sm:w-2/3">
                                  {/* Başlık (Tıklanabilir) */}
                                  <Link href={route('contents.show', { slug: content.slug })} className="group">
                                    <h3 className="content-card-title text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                      {content.title}
                                    </h3>
                                  </Link>
                                  {/* Özet */}
                                  {content.summary && (
                                    <p className="content-card-summary text-muted-foreground text-sm line-clamp-3 mb-2">
                                      {content.summary}
                                    </p>
                                  )}
                                  {/* Meta (Kategoriler ve Tarih) */}
                                  <div className="mt-auto pt-2">
                                    <div className="content-card-meta flex flex-wrap gap-2 items-center text-xs text-muted-foreground mb-2">
                                      {(content.content_categories || []).map(cat => (
                                        <Link key={cat.id} href={route('contents.index', { category: cat.slug })} className="content-card-category-link">
                                          <span className="content-card-category-tag bg-muted rounded-full px-2 py-1 flex items-center hover:bg-primary/20 transition-colors">
                                            <Tag className="h-3 w-3 mr-1 text-primary" />
                                            {cat.name}
                                          </span>
                                        </Link>
                                      ))}
                                    </div>
                                    <div className="content-card-date text-xs text-muted-foreground mt-2">
                                      {content.published_at ? format(new Date(content.published_at), 'dd.MM.yyyy') : ''}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>

                          {/* "Daha Fazla Yükle" Butonu */}
                          {visibleContents < filteredContents.length && (
                            <div className="text-center mt-8">
                              <Button onClick={handleLoadMore} variant="outline">
                                {t('load_more', 'Daha Fazla Yükle')}
                              </Button>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              </section>

              {/* Galeri Bölümü */}
              <section id="gallery" className="space-y-6">
                <Card className="bg-card rounded-lg border border-border shadow-sm">
                  <CardHeader>
                    <h2 className="text-2xl font-bold">{t('destination_detail.gallery.title', '{name} Galerisi', { name: destination.name })}</h2>
                  </CardHeader>
                  <CardContent>
                    {destination.gallery_images.length > 0 ? (
                      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {destination.gallery_images.map((image, index) => (
                          <div 
                            key={image.id} 
                            className="break-inside-avoid cursor-pointer"
                            onClick={() => setLightboxIndex(index)}
                          >
                            <LazyImage
                              src={image.thumbnail_url || '/placeholder.svg'}
                              alt={image.file_name}
                              className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                              effect="blur"
                              wrapperClassName="w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">{t('destination_detail.gallery.no_images_found', 'Bu destinasyon için henüz galeri görseli bulunmamaktadır.')}</p>
                    )}
                  </CardContent>
                </Card>
              </section>

              <Lightbox
                open={lightboxIndex > -1}
                close={() => setLightboxIndex(-1)}
                index={lightboxIndex}
                slides={destination.gallery_images.map(img => ({ src: img.original_url }))}
              />
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
