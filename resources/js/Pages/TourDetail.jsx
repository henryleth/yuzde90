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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { darkMode, setHeaderShrunk } = useTheme();
  const tourNavRef = useRef(null);
  const bookingFormRef = useRef(null);
  const heroRef = useRef(null);
  
  // reCAPTCHA seviyesi (0: kapalı, 1: görünmez v3, 2: tıklamalı v2)
  const recaptchaLevel = config?.recaptchaLevel || (typeof window !== 'undefined' ? window.recaptchaLevel : 0) || 0;

  // İspanyolca konuşulan ülkelerin listesi
  const spanishSpeakingCountries = [
    { value: 'ar', name: 'Argentina' },
    { value: 'bo', name: 'Bolivia' },
    { value: 'cl', name: 'Chile' },
    { value: 'co', name: 'Colombia' },
    { value: 'cr', name: 'Costa Rica' },
    { value: 'cu', name: 'Cuba' },
    { value: 'do', name: 'República Dominicana' },
    { value: 'ec', name: 'Ecuador' },
    { value: 'sv', name: 'El Salvador' },
    { value: 'gq', name: 'Guinea Ecuatorial' },
    { value: 'gt', name: 'Guatemala' },
    { value: 'hn', name: 'Honduras' },
    { value: 'mx', name: 'México' },
    { value: 'ni', name: 'Nicaragua' },
    { value: 'pa', name: 'Panamá' },
    { value: 'py', name: 'Paraguay' },
    { value: 'pe', name: 'Perú' },
    { value: 'es', name: 'España' },
    { value: 'uy', name: 'Uruguay' },
    { value: 've', name: 'Venezuela' },
    { value: 'pr', name: 'Puerto Rico' },
    { value: 'us', name: 'Estados Unidos' },
    { value: 'ca', name: 'Canadá' },
    { value: 'other', name: 'Otro' }
  ];

  const itineraryData = tour.itinerary || [];
  const galleryImages = tour.gallery_images_urls || [];
  const featuredImageUrl = tour.image?.original_url;

  // reCAPTCHA script'ini yükle (seviyeye göre)
  useEffect(() => {
    // SSR kontrolü - sadece client-side'da çalıştır
    if (typeof window === 'undefined') return;
    
    if (recaptchaLevel > 0) {
      const script = document.createElement('script');
      // Level 1 ve 2 için aynı v2 checkbox script
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      return () => {
        const existingScript = document.querySelector('script[src*="recaptcha"]');
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [recaptchaLevel]);

  // Form submit fonksiyonu
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let recaptchaToken = 'no_recaptcha';
      
      // Seviyeye göre reCAPTCHA token al
      if (recaptchaLevel === 1) {
        // v1 basit checkbox - grecaptcha.getResponse() kullan
        if (typeof window !== 'undefined' && window.grecaptcha && window.grecaptcha.getResponse) {
          recaptchaToken = window.grecaptcha.getResponse();
          if (!recaptchaToken) {
            alert(t('tour_detail.booking.recaptcha_required', 'Lütfen "Ben robot değilim" kutucuğunu işaretleyin.'));
            setIsSubmitting(false);
            return;
          }
        }
      } else if (recaptchaLevel === 2) {
        // v2 tıklamalı (aynı)
        recaptchaToken = (typeof window !== 'undefined' ? (document.querySelector('[name="g-recaptcha-response"]')?.value || window.grecaptcha?.getResponse()) : null);
        if (!recaptchaToken) {
          alert(t('tour_detail.booking.recaptcha_required', 'Lütfen "Ben robot değilim" kutucuğunu işaretleyin.'));
          setIsSubmitting(false);
          return;
        }
      }
      
      const formData = new FormData(e.target);
      formData.append('recaptcha_token', recaptchaToken);
      formData.append('tour_id', tour.id);
      formData.append('tour_title', tour.title);

      // Form verilerini backend'e gönder
      const response = await fetch('/api/booking-request', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: formData,
      });

      if (response.ok) {
        // Başarılı gönderim
        alert(t('tour_detail.booking.success', 'Talebiniz başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'));
        e.target.reset(); // Formu temizle
      } else {
        throw new Error('Form gönderimi başarısız');
      }
    } catch (error) {
      console.error('Form gönderim hatası:', error);
      alert(t('tour_detail.booking.error', 'Bir hata oluştu. Lütfen tekrar deneyin.'));
    } finally {
      setIsSubmitting(false);
    }
  };

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
      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
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

      if (typeof window !== 'undefined') {
        window.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Tüm kaydırma ve yeniden boyutlandırma mantığını yöneten birleşik useEffect
  useEffect(() => {
    const handleScrollAndResize = () => {
      if (!tourNavRef.current || !bookingFormRef.current || !heroRef.current) return;

      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
      const heroHeight = heroRef.current.offsetHeight;
      const navHeight = tourNavRef.current.offsetHeight;
      const scrollPosition = typeof window !== 'undefined' ? window.scrollY : 0;
      
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
        
        // Rezervasyon formuna gelince sticky kaldırma mantığı sadece mobilde çalışsın
        if (isMobile) {
          const bookingFormTop = bookingFormRef.current.offsetTop;
          const unstickyThreshold = bookingFormTop - navHeight - effectiveHeaderHeight;

          if (scrollPosition < unstickyThreshold) {
            setNavTop(effectiveHeaderHeight);
          } else {
            const newTop = unstickyThreshold - scrollPosition + effectiveHeaderHeight;
            setNavTop(newTop);
          }
        } else {
          // Masaüstünde sticky menu her zaman sabit kalır
          setNavTop(effectiveHeaderHeight);
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

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScrollAndResize);
      window.addEventListener('resize', handleScrollAndResize);
      handleScrollAndResize(); // İlk yüklemede çalıştır

      return () => {
        window.removeEventListener('scroll', handleScrollAndResize);
        window.removeEventListener('resize', handleScrollAndResize);
        setHeaderShrunk(false); // Component unmount olduğunda header'ı sıfırla
      };
    }
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
            fetchpriority="high"
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
                              <th className="text-left p-3">{t('tour_detail.pricing.triple', 'Üçlü Kişilik')}</th>
                              <th className="text-left p-3">{t('tour_detail.pricing.double', 'Çift Kişilik')}</th>
                              <th className="text-left p-3">{t('tour_detail.pricing.single', 'Tek Kişilik')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[...seasonItem.categories].reverse().map((category, catIndex) => (
                              <tr key={catIndex} className="border-b border-border last:border-b-0">
                                <td className="p-3 font-medium">{t(`tour_detail.hotels.${category.name.toLowerCase().replace(' ', '_')}`, category.name)}</td>
                                <td className="p-3">{category.triple || '-'}</td>
                                <td className="p-3">{category.double || '-'}</td>
                                <td className="p-3">{category.single || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobil için Tasarım 3: Dikey Liste */}
                      <div className="md:hidden space-y-4">
                        {[...seasonItem.categories].reverse().map((category, catIndex) => (
                          <div key={catIndex} className="p-4 border-l-4 border-primary bg-muted/50 rounded-r-lg">
                            <h5 className="font-bold text-lg mb-2">{t(`tour_detail.hotels.${category.name.toLowerCase().replace(' ', '_')}`, category.name)}</h5>
                            <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                              <li>{t('tour_detail.pricing.triple', 'Üçlü Kişilik')}: <span className="font-semibold text-foreground">{category.triple}</span></li>
                              <li>{t('tour_detail.pricing.double', 'Çift Kişilik')}: <span className="font-semibold text-foreground">{category.double}</span></li>
                              <li>{t('tour_detail.pricing.single', 'Tek Kişilik')}: <span className="font-semibold text-foreground">{category.single}</span></li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3 italic">
                      {t('tour_detail.pricing.per_person_note', 'Fiyatlandırma 1 kişi (per person) içindir.')}<br/>
                      {t('tour_detail.pricing.group_discount', '4 kişiden fazla katılımlarda ve önceden rezervasyon yaptırılması durumunda, katılımcı sayısına ve tur tarihine göre değişen oranlarda indirim uygulanmaktadır.')}<br/>
                      {t('tour_detail.pricing.triple_room_note', 'Üç kişilik odalar standart çift kişilik oda büyüklüğünde olup, ilave bir çekyat veya açılır kapanır yatak içermektedir.')}<br/>
                      </p>
                    <h4 className="font-semibold mb-2">{t('tour_detail.pricing.payment_terms_title', 'Ödeme Koşulları')}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>{t('tour_detail.pricing.term1', '• Rezervasyon için %20 avans ödemesi gereklidir')}</li>
                      <li>{t('tour_detail.pricing.term2', '• Kalan tutar İstanbul\'daki ofisimizde ödenebilir')}</li>
                      <li>{t('tour_detail.pricing.term3', '• Visa, MasterCard, Maestro kartları kabul edilir')}</li>
                      <li>{t('tour_detail.pricing.term4', '• Online ödeme mümkündür')}</li>
                    </ul>
                  </div>
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
                <Card className="overflow-hidden shadow-lg">
                  <CardContent className="p-6">
                    {/* Form başlığı */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-2">{t('tour_detail.booking.title', 'Rezervasyon Talebi')}</h3>
                      <p className="text-sm text-muted-foreground">{t('tour_detail.booking.subtitle', 'Ücretsiz fiyat teklifi ve danışmanlık alın')}</p>
                    </div>
                    
                    {/* Rezervasyon formu */}
                    <form className="space-y-4" onSubmit={handleFormSubmit}>
                      {/* İsim ve E-posta - Yan yana */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">{t('tour_detail.booking.name', 'İsim')} <span className="text-destructive">*</span></Label>
                          <Input id="name" name="name" type="text" required placeholder={t('tour_detail.booking.name_placeholder', 'Adınız')} />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">{t('tour_detail.booking.email', 'E-posta')} <span className="text-destructive">*</span></Label>
                          <Input id="email" name="email" type="email" required placeholder={t('tour_detail.booking.email_placeholder', 'ornek@email.com')} />
                        </div>
                      </div>
                      
                      {/* Tarih ve Katılımcı - Yan yana */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tour_date" className="text-sm font-medium">{t('tour_detail.booking.date', 'Tur Tarihi')} <span className="text-destructive">*</span></Label>
                          <Input id="tour_date" name="tour_date" type="text" required placeholder={t('tour_detail.booking.date_placeholder', 'Planlanan seyahat tarihi')} />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="participants" className="text-sm font-medium">{t('tour_detail.booking.participants', 'Katılımcı')} <span className="text-destructive">*</span></Label>
                          <Input id="participants" name="participants" type="number" min="1" required placeholder="2" />
                        </div>
                      </div>
                      
                      {/* Ülke seçimi */}
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-sm font-medium">{t('tour_detail.booking.country', 'Ülke')} <span className="text-destructive">*</span></Label>
                        <Select name="country">
                          <SelectTrigger id="country">
                            <SelectValue placeholder={t('tour_detail.booking.country_placeholder', 'Ülkenizi seçin')} />
                          </SelectTrigger>
                          <SelectContent>
                            {spanishSpeakingCountries.map((country) => (
                              <SelectItem key={country.value} value={country.name}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* WhatsApp numarası */}
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp" className="text-sm font-medium">{t('tour_detail.booking.whatsapp', 'WhatsApp')} {t('tour_detail.booking.whatsapp_note', '(izinsiz arama yapılmayacak)')}</Label>
                        <Input 
                          id="whatsapp" 
                          name="whatsapp"
                          type="tel" 
                          placeholder={t('tour_detail.booking.whatsapp_placeholder', '+90 555 123 45 67')} 
                        />
                      </div>
                      
                      {/* Mesaj alanı */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium">{t('tour_detail.booking.message', 'Mesajınız')}</Label>
                        <Textarea 
                          id="message" 
                          name="message"
                          rows="4" 
                          placeholder={t('tour_detail.booking.message_placeholder', 'Özel istekleriniz, sorularınız...')} 
                        />
                      </div>
                      
                      {/* reCAPTCHA Widget (seviye 1 ve 2 için) */}
                      {(recaptchaLevel === 1 || recaptchaLevel === 2) && (
                        <div className="flex justify-center mb-4">
                          <div 
                            className="g-recaptcha" 
                            data-sitekey="6Les_MErAAAAAKOMOQDbmBLDzEaZ6It_kDDyLuLg"
                            data-theme="light"
                          ></div>
                        </div>
                      )}
                      
                      {/* Gönderme butonu */}
                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        <Mail className="w-4 h-4 mr-2" />
                        {isSubmitting ? t('tour_detail.booking.submitting', 'Gönderiliyor...') : t('tour_detail.booking.submit', 'Teklif İste')}
                      </Button>
                      
                      {/* İletişim bilgileri */}
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground text-center mb-3">
                          {t('tour_detail.booking.contact_info', 'Hızlı yanıt için direkt iletişim:')}
                        </p>
                        <div className="flex justify-center">
                          <Button asChild variant="outline" size="sm" className="w-full">
                            <a href={`https://wa.me/905366583468?text=${encodeURIComponent(`Hola, me gustaría obtener información sobre ${tour.title}.`)}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center">
                              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                              </svg>
                              WhatsApp
                            </a>
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
