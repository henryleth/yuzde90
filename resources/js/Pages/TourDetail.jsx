import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { useState, useEffect, useRef, Fragment } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { useTheme } from '@/Context/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation'; // Çeviri hook'u eklendi
import GuestLayout from '@/Layouts/GuestLayout';
import { Card, CardContent } from "@/Components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Lightbox from "yet-another-react-lightbox";
import LazyImage from '@/Components/LazyImage';
import "yet-another-react-lightbox/styles.css";
import { Snowflake, Leaf, Sun, DollarSign, Calendar, Users, Languages, Star, MapPin, CheckCircle, Check, X, Phone, Mail } from 'lucide-react';
import { Link } from '@inertiajs/react';


export default function TourDetail({ tour, config, seo }) {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('overview');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isNavSticky, setNavSticky] = useState(false);
  const [navTop, setNavTop] = useState(64); // Alt menünün 'top' pozisyonu için state
  const { darkMode, setHeaderShrunk } = useTheme();
  const tourNavRef = useRef(null);
  const bookingFormRef = useRef(null);
  const heroRef = useRef(null);

  const itineraryData = tour.itinerary || [];
  const galleryImages = tour.gallery_images_urls || [];
  const featuredImageUrl = tour.image?.original_url;

  const getSeasonIcon = (seasonName) => {
    const commonClasses = "mr-2 h-5 w-5";
    if (seasonName.includes("low_season")) return <Snowflake className={`${commonClasses} text-blue-500`} />;
    if (seasonName.includes("mid_season")) return <Leaf className={`${commonClasses} text-green-500`} />;
    if (seasonName.includes("high_season")) return <Sun className={`${commonClasses} text-orange-500`} />;
    return <DollarSign className={`${commonClasses} text-green-500`} />;
  };

  const pricingData = [];
  const groupedPricing = (tour.pricing_tiers || []).reduce((acc, tier) => {
    const seasonName = tier.season_name;
    if (!acc[seasonName]) acc[seasonName] = [];
    acc[seasonName].push(tier);
    return acc;
  }, {});

  for (const seasonName in groupedPricing) {
    // Sezon adını ve ay aralığını dil dosyasından çevirerek alıyoruz.
    // `seasonName` burada 'low_season', 'mid_season' gibi bir anahtardır.
    const translatedSeasonName = t(`seasons.${seasonName}`, seasonName); // Çeviri bulunamazsa anahtarı kullan
    const translatedMonths = t(`season_months.${seasonName}`, ''); // Ay çevirisi
    
    const categoriesForSeason = (groupedPricing[seasonName] || []).map(tier => ({
      name: tier.category_name,
      single: `€${tier.price_per_person_1}`,
      double: tier.price_per_person_2 ? `€${tier.price_per_person_2}` : '-',
      triple: tier.price_per_person_3 ? `€${tier.price_per_person_3}` : '-',
    }));

    pricingData.push({
      // Sezon adı ve ayları ayrı ayrı saklıyoruz.
      seasonName: translatedSeasonName,
      seasonMonths: translatedMonths,
      icon: getSeasonIcon(seasonName),
      categories: categoriesForSeason,
    });
  }

  const processedHotelData = Object.keys(tour.hotel_options || {}).map(cityName => {
    const categoriesInCity = tour.hotel_options[cityName];
    const categories = { "Category A": [], "Category B": [], "Category C": [] };

    Object.keys(categoriesInCity).forEach(categoryName => {
      if (categories[categoryName]) {
        categories[categoryName] = categoriesInCity[categoryName].map(hotel => hotel.name);
      }
    });

    return {
      city_name: cityName, 
      title: t('tour_detail.hotels.city_hotels', '{city} Hotels', { city: cityName }),
      categories: categories,
    };
  });

  // Navigasyon linklerine tıklandığında pürüzsüz kaydırma ve doğru ofset için fonksiyon
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section && tourNavRef.current && heroRef.current) {
      const isMobile = window.innerWidth < 768;
      const heroHeight = heroRef.current.offsetHeight;
      const navHeight = tourNavRef.current.offsetHeight;
      const headerHeight = 64; // Standart header yüksekliği
      const shrunkHeaderHeight = 40; // Küçülmüş header yüksekliği
      const sectionTop = section.offsetTop;

      // Hedef kaydırma konumunda header'ın hangi yükseklikte olacağını belirle
      const shouldShrinkAtTarget = isMobile && (sectionTop > (heroHeight - headerHeight));
      const effectiveHeaderHeightAtTarget = shouldShrinkAtTarget ? shrunkHeaderHeight : headerHeight;

      // Gerekli toplam ofseti hesapla.
      // Ofset, yapışkan header ve yapışkan navigasyonun toplam yüksekliğidir.
      // Mobil için daha az olacak şekilde görsel bir dolgu payı ekliyoruz.
      const scrollPadding = isMobile ? 10 : 20; // Mobilde daha az dolgu payı
      const totalOffset = effectiveHeaderHeightAtTarget + navHeight + scrollPadding;
      
      const scrollToPosition = sectionTop - totalOffset;

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
    }
  };

  // Tüm kaydırma ve yeniden boyutlandırma mantığını yöneten birleşik useEffect
  useEffect(() => {
    const handleScrollAndResize = () => {
      if (!tourNavRef.current || !bookingFormRef.current || !heroRef.current) return;

      const isMobile = window.innerWidth < 768;
      const heroHeight = heroRef.current.offsetHeight;
      const navHeight = tourNavRef.current.offsetHeight;
      const scrollPosition = window.scrollY;
      
      const headerHeight = 64; // h-16
      const shrunkHeaderHeight = 40; // h-10

      // 1. Header'ı daraltma mantığı (sadece mobilde)
      const shouldShrink = isMobile && scrollPosition > (heroHeight - headerHeight);
      setHeaderShrunk(shouldShrink);

      // 2. Alt menünün sticky ve 'top' pozisyonu mantığı
      const effectiveHeaderHeight = shouldShrink ? shrunkHeaderHeight : headerHeight;
      const stickyThreshold = heroHeight - effectiveHeaderHeight;
      
      if (scrollPosition > stickyThreshold) {
        setNavSticky(true);
        const bookingFormTop = bookingFormRef.current.offsetTop;
        const unstickyThreshold = bookingFormTop - navHeight - effectiveHeaderHeight;

        if (scrollPosition < unstickyThreshold) {
          setNavTop(effectiveHeaderHeight);
        } else {
          const newTop = unstickyThreshold - scrollPosition + effectiveHeaderHeight;
          setNavTop(newTop);
        }
      } else {
        setNavSticky(false);
        setNavTop(headerHeight); // Varsayılan pozisyon
      }

      // 3. Aktif bölümü belirleme mantığı
      const sections = ['overview', 'itinerary', 'pricing', 'hotels', 'optional'];
      // Ofseti, o anki header ve nav yüksekliğine göre dinamik olarak hesapla
      // Mobilde daha az boşluk bırakmak için ofseti küçült
      const scrollSpyPadding = isMobile ? 10 : 20;
      const checkOffset = effectiveHeaderHeight + navHeight + scrollSpyPadding;
      const checkScrollPosition = scrollPosition + checkOffset;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= checkScrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollAndResize);
    window.addEventListener('resize', handleScrollAndResize);
    handleScrollAndResize(); // İlk yüklemede çalıştır

    return () => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
      setHeaderShrunk(false); // Component unmount olduğunda header'ı sıfırla
    };
  }, [setHeaderShrunk]);

  return (
    <GuestLayout seo={seo}>
      <div className={`bg-background text-foreground min-h-screen`}>
        {/* Hero Section */}
        <div ref={heroRef} className="relative h-[60vh] md:h-[70vh]">
          {/* LCP Optimizasyonu: Arka plan resmi yerine fetchpriority="high" ile <img> etiketi kullanıldı. */}
          <img
            src={featuredImageUrl || '/images/placeholder.png'}
            alt={tour?.title}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45"></div>
          <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-center text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 font-playfair animate-fade-in-up">{tour?.title}</h1>
            <p className="text-xl md:text-2xl mb-6 opacity-0 animate-fade-in-up animation-delay-300">{tour?.summary}</p>
            <div className="flex flex-wrap items-center space-x-4 md:space-x-6 text-sm md:text-base opacity-0 animate-fade-in-up animation-delay-600"> 
              <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" /><span>{t('tour_detail.hero.duration', '{days} Gün {nights} Gece', { days: tour?.duration_days, nights: tour?.duration_nights })}</span></div>
              <div className="flex items-center"><Users className="h-4 w-4 mr-2" /><span>{t('tour_detail.hero.participants', '{min}-{max} Kişi', { min: tour?.min_participants, max: tour?.max_participants })}</span></div>
              <div className="flex items-center"><Languages className="h-4 w-4 mr-2" /><span>{tour?.language}</span></div>
              <div className="flex items-center"><Star className="h-4 w-4 text-yellow-400 mr-2" /><span>{t('tour_detail.hero.rating', '{rating} ({reviews} değerlendirme)', { rating: tour?.rating, reviews: tour?.reviews_count })}</span></div>
            </div>
            <div className="flex items-center mt-4 text-sm md:text-base opacity-0 animate-fade-in-up animation-delay-900">
              <MapPin className="h-4 w-4 mr-2" />
              <div>
                {(tour.destinations || []).map((destination, index) => (
                  <Fragment key={destination.slug}>
                    <Link
                      href={route('destinations.show', destination.slug)}
                      className="hover:underline"
                    >
                      {destination.name}
                    </Link>
                    {index < tour.destinations.length - 1 && <span>, </span>}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tour Navigation Menu */}
        <nav 
          ref={tourNavRef}
          className={`w-full border-b border-border ${darkMode ? 'bg-black/60' : 'bg-white/60'} backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60 ${isNavSticky ? 'sticky z-40' : ''}`}
          style={{ top: `${navTop}px` }} // Dinamik 'top' değeri
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap gap-2 py-2">
              <a href="#overview" onClick={(e) => handleNavClick(e, 'overview')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === 'overview' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>{t('tour_detail.nav.overview', 'Genel Bakış')}</a>
              <a href="#itinerary" onClick={(e) => handleNavClick(e, 'itinerary')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === 'itinerary' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>{t('tour_detail.nav.itinerary', 'Program')}</a>
              <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === 'pricing' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>{t('tour_detail.nav.pricing', 'Fiyatlar')}</a>
              <a href="#hotels" onClick={(e) => handleNavClick(e, 'hotels')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === 'hotels' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>{t('tour_detail.nav.hotels', 'Oteller')}</a>
              <a href="#optional" onClick={(e) => handleNavClick(e, 'optional')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === 'optional' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>{t('tour_detail.nav.optional', 'Opsiyonel Aktiviteler')}</a>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Section */}
              <section id="overview" className="space-y-6 ">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-bold mb-4">{t('tour_detail.overview.about_tour', 'Tur Hakkında')}</h2>
                  {tour.summary && <p className="text-lg text-muted-foreground mb-4">{tour.summary}</p>}
                  <div className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: tour.description }} />

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4"><div className="flex items-center space-x-2 text-primary mb-2"><CheckCircle className="h-5 w-5" /><span className="font-medium">{t('tour_detail.overview.guaranteed_departure', 'Garanti Başlangıç')}</span></div><p className="text-sm text-muted-foreground">{t('tour_detail.overview.guaranteed_departure_text', 'Her gün başlangıç garantisi')}</p></div>
                    <div className="bg-muted/50 rounded-lg p-4"><div className="flex items-center space-x-2 text-primary mb-2"><Users className="h-5 w-5" /><span className="font-medium">{t('tour_detail.overview.small_groups', 'Küçük Gruplar')}</span></div><p className="text-sm text-muted-foreground">{t('tour_detail.overview.small_groups_text', '{min}-{max} kişilik gruplar', { min: tour.min_participants, max: tour.max_participants })}</p></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pb-4">
                    <div className="bg-card rounded-lg border border-border p-6"><h3 className="font-semibold mb-4 text-green-900 dark:text-green-300 flex items-center"><Check className="h-5 w-5 mr-2" />{t('tour_detail.overview.inclusions', 'Dahil Olan Hizmetler')}</h3><div className="space-y-1 text-sm" dangerouslySetInnerHTML={{ __html: tour.inclusions_html }} /></div>
                    <div className="bg-card rounded-lg border border-border p-6"><h3 className="font-semibold mb-4 text-red-900 dark:text-red-300 flex items-center"><X className="h-5 w-5 mr-2" />{t('tour_detail.overview.exclusions', 'Dahil Olmayan Hizmetler')}</h3><div className="space-y-1 text-sm" dangerouslySetInnerHTML={{ __html: tour.exclusions_html }} /></div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 mt-4">{t('tour_detail.overview.gallery', 'Fotoğraf Galerisi')}</h3>
                  {galleryImages.length > 0 ? (
                    <Carousel
                      opts={{ align: "start", loop: true }}
                      plugins={[Autoplay({ delay: 5000 })]}
                      className="w-full"
                    >
                      <CarouselContent>
                        {galleryImages.map((image, index) => (
                          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                              <Card className="overflow-hidden cursor-pointer" onClick={() => setLightboxIndex(index)}>
                                <CardContent className="flex aspect-square items-center justify-center p-0">
                                  <LazyImage
                                    src={image.thumbnail_url}
                                    alt={image.alt || `Galeri ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                    effect="blur"
                                    wrapperClassName="w-full h-full"
                                  />
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="ml-12" />
                      <CarouselNext className="mr-12" />
                    </Carousel>
                  ) : (
                    <p className="text-muted-foreground">{t('tour_detail.overview.no_images', 'Görsel bulunmamaktadır.')}</p>
                  )}
                </div>
              </section>

              <Lightbox
                open={lightboxIndex > -1}
                close={() => setLightboxIndex(-1)}
                index={lightboxIndex}
                slides={galleryImages.map(img => ({ src: img.original_url }))}
              />

              {/* Itinerary Section */}
              <section id="itinerary" className="space-y-6">
                <div className="bg-card rounded-lg border border-border p-4 lg:p-6">
                  <h2 className="text-2xl font-bold mb-4">{t('tour_detail.itinerary.title', 'Günlük Program')}</h2>
                  <Accordion type="multiple" defaultValue={itineraryData.map(item => `item-${item.day_number}`)} className="w-full"> 
                    {itineraryData.map((item) => (
                      <AccordionItem key={item.day_number} value={`item-${item.day_number}`} className="border border-gray-300 border-l-8 border-l-primary rounded-tr-lg rounded-br-lg mb-4 shadow-sm accordion-item-custom">
                        <AccordionTrigger className="px-2 lg:px-6 py-4 hover:no-underline">
                          <div className="flex flex-col items-start text-left"><h3 className="font-bold lg:text-xl text-lg text-foreground mb-1">{item.title}</h3></div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 lg:px-6 pb-4 pt-0">
                          {(item.activities || []).map((activity, activityIndex) => (
                            <div key={`activity-${item.day_number}-${activityIndex}`} className={`mb-2 ${activity.is_highlight ? 'bg-orange-100 dark:bg-orange-900/50 p-3 rounded-md' : ''}`}>
                              {/* 
                                Aktivite açıklaması. Vurgulanan (is_highlight) aktiviteler için açık turuncu bir arkaplan rengi kullanılıyor.
                                Bu renk, hem açık hem de koyu tema ile uyumlu olacak şekilde ayarlandı.
                                HTML'nin doğru bir şekilde render edilmesi için dangerouslySetInnerHTML kullanılır. 
                                'prose' sınıfı, bu HTML içeriğine (örn. ul, li etiketleri) varsayılan stilin uygulanmasını sağlar. 
                              */}
                              <div className="prose prose-slate dark:prose-invert max-w-none prose-sm" dangerouslySetInnerHTML={{ __html: activity.description }} />
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </section>

              {/* Pricing Section */}
              <section id="pricing" className="space-y-1 lg:space-y-0">
                <div className="bg-card rounded-lg border border-border p-4 lg:p-6">
                  <h2 className="text-2xl font-bold mb-6">{t('tour_detail.pricing.title', 'Sezon Fiyatları')}</h2>
                  {pricingData.map((seasonItem, index) => (
                    <div key={index} className="mb-8">
                      <div className="flex items-center mb-4">
                        {seasonItem.icon}
                        <div className="flex flex-col md:flex-row md:items-baseline md:gap-x-2">
                          <h3 className="text-lg font-semibold">{seasonItem.seasonName}</h3>
                          <span className="text-s font-normal text-gray-500 dark:text-gray-400">({seasonItem.seasonMonths})</span>
                        </div>
                      </div>

                      {/* Masaüstü için Tablo (md ve üzeri) */}
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3">{t('tour_detail.pricing.category', 'Kategori')}</th>
                              <th className="text-left p-3">{t('tour_detail.pricing.single', 'Tek Kişilik')}</th>
                              <th className="text-left p-3">{t('tour_detail.pricing.double', 'Çift Kişilik')}</th>
                              <th className="text-left p-3">{t('tour_detail.pricing.triple', 'Üçlü Kişilik')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {seasonItem.categories.map((category, catIndex) => (
                              <tr key={catIndex} className="border-b border-border last:border-b-0">
                                <td className="p-3 font-medium">{t(`tour_detail.hotels.${category.name.toLowerCase().replace(' ', '_')}`, category.name)}</td>
                                <td className="p-3">{category.single || '-'}</td>
                                <td className="p-3">{category.double || '-'}</td>
                                <td className="p-3">{category.triple || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobil için Alternatif Tasarımlar (md'den küçük) */}
                      <div className="md:hidden space-y-6">
                        {/* Tasarım 1: Kategori Kartları */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-center text-sm uppercase tracking-wider text-muted-foreground">Tasarım 1: Kartlar</h4>
                          {seasonItem.categories.map((category, catIndex) => (
                            <div key={`design1-${catIndex}`} className="bg-muted/50 rounded-lg border border-border p-4">
                              <h5 className="font-bold text-lg text-primary mb-3">{t(`tour_detail.hotels.${category.name.toLowerCase().replace(' ', '_')}`, category.name)}</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center border-b border-border/50 pb-2"><span className="text-muted-foreground">{t('tour_detail.pricing.single', 'Tek Kişilik')}</span><span className="font-semibold">{category.single}</span></div>
                                <div className="flex justify-between items-center border-b border-border/50 pb-2"><span className="text-muted-foreground">{t('tour_detail.pricing.double', 'Çift Kişilik')}</span><span className="font-semibold">{category.double}</span></div>
                                <div className="flex justify-between items-center"><span className="text-muted-foreground">{t('tour_detail.pricing.triple', 'Üçlü Kişilik')}</span><span className="font-semibold">{category.triple}</span></div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tasarım 2: Akordiyon */}
                        <div className="space-y-2">
                          <h4 className="font-bold text-center text-sm uppercase tracking-wider text-muted-foreground mt-8">Tasarım 2: Akordiyon</h4>
                          <Accordion type="single" collapsible className="w-full">
                            {seasonItem.categories.map((category, catIndex) => (
                              <AccordionItem key={`design2-${catIndex}`} value={`item-${catIndex}`} className="bg-muted/50 border border-border rounded-lg mb-2">
                                <AccordionTrigger className="px-4 py-3 font-bold text-primary">{t(`tour_detail.hotels.${category.name.toLowerCase().replace(' ', '_')}`, category.name)}</AccordionTrigger>
                                <AccordionContent className="px-4 pb-4">
                                  <div className="space-y-2 text-sm">
                                    <p><span className="font-semibold">{t('tour_detail.pricing.single', 'Tek Kişilik')}:</span> {category.single}</p>
                                    <p><span className="font-semibold">{t('tour_detail.pricing.double', 'Çift Kişilik')}:</span> {category.double}</p>
                                    <p><span className="font-semibold">{t('tour_detail.pricing.triple', 'Üçlü Kişilik')}:</span> {category.triple}</p>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>

                        {/* Tasarım 3: Dikey Liste */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-center text-sm uppercase tracking-wider text-muted-foreground mt-8">Tasarım 3: Dikey Liste</h4>
                          {seasonItem.categories.map((category, catIndex) => (
                            <div key={`design3-${catIndex}`} className="p-4 border-l-4 border-primary bg-muted/50 rounded-r-lg">
                              <h5 className="font-bold text-lg mb-2">{t(`tour_detail.hotels.${category.name.toLowerCase().replace(' ', '_')}`, category.name)}</h5>
                              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                                <li>{t('tour_detail.pricing.single', 'Tek Kişilik')}: <span className="font-semibold text-foreground">{category.single}</span></li>
                                <li>{t('tour_detail.pricing.double', 'Çift Kişilik')}: <span className="font-semibold text-foreground">{category.double}</span></li>
                                <li>{t('tour_detail.pricing.triple', 'Üçlü Kişilik')}: <span className="font-semibold text-foreground">{category.triple}</span></li>
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Tasarım 4: Grid */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-center text-sm uppercase tracking-wider text-muted-foreground mt-8">Tasarım 4: Grid</h4>
                          {seasonItem.categories.map((category, catIndex) => (
                            <div key={`design4-${catIndex}`} className="bg-card border border-border rounded-lg p-4">
                               <h5 className="font-bold text-lg text-center mb-3 text-primary">{t(`tour_detail.hotels.${category.name.toLowerCase().replace(' ', '_')}`, category.name)}</h5>
                               <div className="grid grid-cols-3 text-center gap-2">
                                  <div>
                                    <div className="text-xs text-muted-foreground">{t('tour_detail.pricing.single', 'Tek Kişilik')}</div>
                                    <div className="font-bold text-lg">{category.single}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">{t('tour_detail.pricing.double', 'Çift Kişilik')}</div>
                                    <div className="font-bold text-lg">{category.double}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">{t('tour_detail.pricing.triple', 'Üçlü Kişilik')}</div>
                                    <div className="font-bold text-lg">{category.triple}</div>
                                  </div>
                               </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg"><h4 className="font-semibold mb-2">{t('tour_detail.pricing.payment_terms_title', 'Ödeme Koşulları')}</h4><ul className="text-sm text-muted-foreground space-y-1"><li>{t('tour_detail.pricing.term1', '• Rezervasyon için %20 avans ödemesi gereklidir')}</li><li>{t('tour_detail.pricing.term2', '• Kalan tutar İstanbul\'daki ofisimizde ödenebilir')}</li><li>{t('tour_detail.pricing.term3', '• Visa, MasterCard, Maestro kartları kabul edilir')}</li><li>{t('tour_detail.pricing.term4', '• Online ödeme mümkündür')}</li></ul></div>
                </div>
              </section>

              {/* Hotels Section */}
              <section id="hotels" className="space-y-6 ">
                  <div className="bg-card rounded-lg border border-border p-4">
                  <h2 className="text-2xl font-bold mb-4">{t('tour_detail.hotels.title', 'Konaklama Seçenekleri')}</h2>
                  {processedHotelData.length > 0 ? (
                    processedHotelData.map((cityData, cityIndex) => (
                      <div key={cityIndex} className="mb-8 last:mb-0">
                        <h3 className="text-xl font-bold mb-4 text-foreground capitalize">{cityData.title}</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse table-auto">
                            <thead><tr className="bg-muted/50 text-muted-foreground"><th className="text-left p-3 w-1/3">{t('tour_detail.hotels.category_a', 'Category A')}</th><th className="text-left p-3 w-1/3">{t('tour_detail.hotels.category_b', 'Category B')}</th><th className="text-left p-3 w-1/3">{t('tour_detail.hotels.category_c', 'Category C')}</th></tr></thead>
                            <tbody>
                              {Array.from({ length: Math.max((cityData.categories["Category A"] || []).length, (cityData.categories["Category B"] || []).length, (cityData.categories["Category C"] || []).length) }).map((_, rowIndex) => (
                                  <tr key={`${cityIndex}-${rowIndex}`} className="border-b border-border last:border-b-0">
                                    <td className="p-3 text-sm text-foreground">{(cityData.categories["Category A"] || [])[rowIndex] || ""}</td>
                                    <td className="p-3 text-sm text-foreground">{(cityData.categories["Category B"] || [])[rowIndex] || ""}</td>
                                    <td className="p-3 text-sm text-foreground">{(cityData.categories["Category C"] || [])[rowIndex] || ""}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                    </div>
                  </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">{t('tour_detail.hotels.no_info', 'Bu tur için otel bilgisi bulunmamaktadır.')}</p>
                  )}
                </div>
              </section>

              {/* Optional Activities Section */}
              <section id="optional" className="space-y-6 ">
                  <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">{t('tour_detail.optional.title', 'Opsiyonel Aktiviteler')}</h2>
                  {(tour.optional_activities || []).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(tour.optional_activities || []).map((activity) => (
                        <div key={activity.id} className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
                          <div className="w-full h-48">
                            {activity.image?.thumbnail_url ? (
                              <LazyImage
                                src={activity.image.thumbnail_url}
                                alt={activity.name}
                                className="w-full h-full object-cover"
                                effect="blur"
                                wrapperClassName="w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-48 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">{t('tour_detail.optional.no_image', 'Görsel Yok')}</div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2 text-foreground">{activity.name}</h3>
                            <div className="text-sm text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: activity.description }} />
                            <div className="flex items-center justify-between"><span className="text-lg font-bold text-primary">{activity.price ? `€${activity.price}` : t('tour_detail.optional.no_price', 'Fiyat Belirtilmemiş')}</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">{t('tour_detail.optional.no_activities', 'Bu tur için opsiyonel aktivite bulunmamaktadır.')}</p>
                  )}
                </div>
              </section>
            </div>

            {/* Kenar Çubuğu - Rezervasyon Formu */}
            <div className="lg:col-span-1">
              <div ref={bookingFormRef} className="sticky top-32">
                <div className="bg-card rounded-lg border border-border p-6 reservation-form">
                  {/* Form başlığı ve bilgilendirme metinleri */}
                  <h3 className="text-2xl font-bold text-center mb-2 font-playfair">Başvuru ve Rezervasyon Formu</h3>
                  <p className="text-center text-sm text-muted-foreground mb-1">*Tüm Alanlar Zorunludur</p>
                  <p className="text-center text-sm text-muted-foreground mb-6">* ile işaretli alanlar zorunludur</p>
                  
                  {/* Rezervasyon formu */}
                  <form className="space-y-4">
                    {/* İsim alanı */}
                    <div className="space-y-2">
                      <Label htmlFor="name">İsim: <span className="text-red-500">*</span></Label>
                      <Input id="name" type="text" required className="dark:bg-gray-800 dark:text-white" />
                    </div>
                    
                    {/* E-posta alanı */}
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta: <span className="text-red-500">*</span></Label>
                      <Input id="email" type="email" required className="dark:bg-gray-800 dark:text-white" />
                    </div>
                    
                    {/* Tur tarihi alanı */}
                    <div className="space-y-2">
                      <Label htmlFor="tour_date">Talep Edilen Tur Tarihi - Kesin veya yaklaşık tarih: <span className="text-red-500">*</span></Label>
                      <Input id="tour_date" type="text" required className="dark:bg-gray-800 dark:text-white" />
                    </div>
                    
                    {/* Katılımcı sayısı alanı */}
                    <div className="space-y-2">
                      <Label htmlFor="participants">Katılımcı sayısı: <span className="text-red-500">*</span></Label>
                      <Input id="participants" type="number" required className="dark:bg-gray-800 dark:text-white" />
                    </div>
                    
                    {/* Mesaj alanı */}
                    <div className="space-y-2">
                      <Label htmlFor="message">İlgilendiğiniz tur ve Mesajınız: <span className="text-red-500">*</span></Label>
                      <Textarea id="message" rows="5" placeholder="Lütfen talebinizin ayrıntılarını buraya yazın. Planladığınız seyahat tarihini, seyahat edecek kişi sayısını, ziyaret etmek istediğiniz yerleri, ilgilendiğiniz tur paketini vb. eklerseniz çok yardımcı oluruz. Daha fazla bilgi verebilirseniz, ilk e-postada mümkün olduğunca fazla bilgi sağlayabiliriz." required className="dark:bg-gray-800 dark:text-white" />
                    </div>
                    
                    {/* Ülke seçim alanı */}
                    <div className="space-y-2">
                      <Label htmlFor="country">Ülke <span className="text-red-500">*</span></Label>
                      <Select>
                        <SelectTrigger id="country" className="dark:bg-gray-800 dark:text-white">
                          <SelectValue placeholder="Amerika" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Ülke listesi, daha sonra dinamik olarak doldurulabilir */}
                          <SelectItem value="us">Amerika</SelectItem>
                          <SelectItem value="tr">Türkiye</SelectItem>
                          <SelectItem value="de">Almanya</SelectItem>
                          <SelectItem value="gb">İngiltere</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Whatsapp numarası alanı */}
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">Whatsapp numarası:</Label>
                      <Input id="whatsapp" type="tel" placeholder="İzniniz olmadan arama yapmıyoruz. Daha hızlı..." className="dark:bg-gray-800 dark:text-white" />
                    </div>
                    
                    {/* Gönderme butonu */}
                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Göndermek</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
