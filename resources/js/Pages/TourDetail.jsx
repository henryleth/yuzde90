import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Label } from '@/Components/ui/label';
import { useState, useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { useTheme } from '@/Context/ThemeContext';
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


export default function TourDetail({ tour, config, seo }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isNavSticky, setNavSticky] = useState(false);
  const [navTop, setNavTop] = useState(64); // Alt menünün 'top' pozisyonu için state
  const { darkMode, fonts, currentFont, setHeaderShrunk } = useTheme();
  const tourNavRef = useRef(null);
  const bookingFormRef = useRef(null);
  const heroRef = useRef(null);

  const itineraryData = tour.itinerary || [];
  const galleryImages = tour.gallery_images_urls || [];
  const featuredImageUrl = tour.image?.original_url;

  const getSeasonIcon = (seasonName) => {
    const commonClasses = "mr-2 h-5 w-5";
    if (seasonName.includes("Düşük Sezon")) return <Snowflake className={`${commonClasses} text-blue-500`} />;
    if (seasonName.includes("Orta Sezon")) return <Leaf className={`${commonClasses} text-green-500`} />;
    if (seasonName.includes("Yüksek Sezon")) return <Sun className={`${commonClasses} text-orange-500`} />;
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
    const seasonMonths = config.seasons[seasonName] || '';
    const seasonNameWithMonths = `${seasonName} (${seasonMonths})`;
    
    const categoriesForSeason = (groupedPricing[seasonName] || []).map(tier => ({
      name: tier.category_name,
      single: `€${tier.price_per_person_1}`,
      double: tier.price_per_person_2 ? `€${tier.price_per_person_2}` : '-',
      triple: tier.price_per_person_3 ? `€${tier.price_per_person_3}` : '-',
    }));

    pricingData.push({
      season: seasonNameWithMonths,
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
      title: `${cityName} Otelleri`, 
      description: `${cityName} şehrinde konaklayacağınız otellerin örnekleri aşağıda listelenmiştir. Otel müsaitliğine göre benzer standartlarda otellerde konaklama yapılacaktır.`, 
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
      <div className={`bg-background text-foreground min-h-screen ${fonts[currentFont].class}`}>
        {/* Hero Section */}
        <div ref={heroRef} className="relative h-[60vh] md:h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url(${featuredImageUrl || '/images/placeholder.png'})` }}>
          <div className="absolute inset-0 bg-black/45"></div>
          <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-center text-white"> 
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 font-playfair animate-fade-in-up">{tour?.title}</h1>
            <p className="text-xl md:text-2xl mb-6 opacity-0 animate-fade-in-up animation-delay-300">{tour?.summary}</p>
            <div className="flex flex-wrap items-center space-x-4 md:space-x-6 text-sm md:text-base opacity-0 animate-fade-in-up animation-delay-600"> 
              <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" /><span>{tour?.duration_days} Gün {tour?.duration_nights} Gece</span></div>
              <div className="flex items-center"><Users className="h-4 w-4 mr-2" /><span>{tour?.min_participants}-{tour?.max_participants} Kişi</span></div>
              <div className="flex items-center"><Languages className="h-4 w-4 mr-2" /><span>{tour?.language}</span></div>
              <div className="flex items-center"><Star className="h-4 w-4 text-yellow-400 mr-2" /><span>{tour?.rating} ({tour?.reviews_count} değerlendirme)</span></div>
            </div>
            <div className="flex items-center mt-4 text-sm md:text-base opacity-0 animate-fade-in-up animation-delay-900"> 
              <MapPin className="h-4 w-4 mr-2" />
              <span>{Object.keys(tour.hotel_options || {}).join(', ')}</span> 
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
              <a href="#overview" onClick={(e) => handleNavClick(e, 'overview')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === 'overview' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>Genel Bakış</a>
              <a href="#itinerary" onClick={(e) => handleNavClick(e, 'itinerary')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === 'itinerary' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>Program</a>
              <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === 'pricing' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>Fiyatlar</a>
              <a href="#hotels" onClick={(e) => handleNavClick(e, 'hotels')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === 'hotels' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>Oteller</a>
              <a href="#optional" onClick={(e) => handleNavClick(e, 'optional')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors leading-4 ${activeSection === 'optional' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>Opsiyonel Aktiviteler</a>
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
                  <h2 className="text-2xl font-bold mb-4">Tur Hakkında</h2>
                  {tour.summary && <p className="text-lg text-muted-foreground mb-4">{tour.summary}</p>}
                  <div className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: tour.description }} />

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4"><div className="flex items-center space-x-2 text-primary mb-2"><CheckCircle className="h-5 w-5" /><span className="font-medium">Garanti Başlangıç</span></div><p className="text-sm text-muted-foreground">Her gün başlangıç garantisi</p></div>
                    <div className="bg-muted/50 rounded-lg p-4"><div className="flex items-center space-x-2 text-primary mb-2"><Users className="h-5 w-5" /><span className="font-medium">Küçük Gruplar</span></div><p className="text-sm text-muted-foreground">{tour.min_participants}-{tour.max_participants} kişilik gruplar</p></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pb-4">
                    <div className="bg-card rounded-lg border border-border p-6"><h3 className="font-semibold mb-4 text-green-600 flex items-center"><Check className="h-5 w-5 mr-2" />Dahil Olan Hizmetler</h3><div className="space-y-1 text-sm" dangerouslySetInnerHTML={{ __html: tour.inclusions_html }} /></div>
                    <div className="bg-card rounded-lg border border-border p-6"><h3 className="font-semibold mb-4 text-red-600 flex items-center"><X className="h-5 w-5 mr-2" />Dahil Olmayan Hizmetler</h3><div className="space-y-1 text-sm" dangerouslySetInnerHTML={{ __html: tour.exclusions_html }} /></div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 mt-4">Fotoğraf Galerisi</h3>
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
                    <p className="text-muted-foreground">Görsel bulunmamaktadır.</p>
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
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-bold mb-4">Günlük Program</h2>
                  <Accordion type="multiple" defaultValue={itineraryData.map(item => `item-${item.day_number}`)} className="w-full"> 
                    {itineraryData.map((item) => (
                      <AccordionItem key={item.day_number} value={`item-${item.day_number}`} className="border border-gray-300 border-l-8 border-l-primary rounded-tr-lg rounded-br-lg mb-4 shadow-sm accordion-item-custom">
                        <AccordionTrigger className="px-2 lg:px-6 py-4 hover:no-underline">
                          <div className="flex flex-col items-start text-left"><h3 className="font-bold lg:text-xl text-lg text-foreground mb-1">{item.title}</h3></div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 pt-0">
                          {(item.activities || []).map((activity, activityIndex) => (
                            <div key={`activity-${item.day_number}-${activityIndex}`} className={`mb-2 ${activity.is_highlight ? 'bg-blue-50 p-3 rounded-md' : ''}`}> 
                              {/* Aktivite açıklaması. Vurgulanan (is_highlight) aktiviteler ve normal aktiviteler için 
                                  HTML'nin doğru bir şekilde render edilmesi için dangerouslySetInnerHTML kullanılır. 
                                  'prose' sınıfı, bu HTML içeriğine (örn. ul, li etiketleri) varsayılan stilin uygulanmasını sağlar. */}
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
                  <h2 className="text-2xl font-bold mb-6">Sezon Fiyatları</h2>
                  {pricingData.map((seasonItem, index) => (
                    <div key={index} className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">{seasonItem.icon}{seasonItem.season}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead><tr className="border-b border-border"><th className="text-left p-3">Kategori</th><th className="text-left p-3">Tek Kişilik</th><th className="text-left p-3">Çift Kişilik</th><th className="text-left p-3">Üçlü Kişilik</th></tr></thead>
                          <tbody>
                            {seasonItem.categories.map((category, catIndex) => (
                              <tr key={catIndex} className="border-b border-border last:border-b-0">
                                <td className="p-3 font-medium">{category.name}</td>
                                <td className="p-3">{category.single || '-'}</td>
                                <td className="p-3">{category.double || '-'}</td>
                                <td className="p-3">{category.triple || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg"><h4 className="font-semibold mb-2">Ödeme Koşulları</h4><ul className="text-sm text-muted-foreground space-y-1"><li>• Rezervasyon için %20 avans ödemesi gereklidir</li><li>• Kalan tutar İstanbul'daki ofisimizde ödenebilir</li><li>• Visa, MasterCard, Maestro kartları kabul edilir</li><li>• Online ödeme mümkündür</li></ul></div>
                </div>
              </section>

              {/* Hotels Section */}
              <section id="hotels" className="space-y-6 ">
                  <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-bold mb-4">Konaklama Seçenekleri</h2>
                  {processedHotelData.length > 0 ? (
                    processedHotelData.map((cityData, cityIndex) => (
                      <div key={cityIndex} className="mb-8 last:mb-0">
                        <h3 className="text-xl font-bold mb-4 text-foreground">{cityData.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{cityData.description}</p>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse table-auto">
                            <thead><tr className="bg-muted/50 text-muted-foreground"><th className="text-left p-3 w-1/3">Category A</th><th className="text-left p-3 w-1/3">Category B</th><th className="text-left p-3 w-1/3">Category C</th></tr></thead>
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
                    <p className="text-muted-foreground">Bu tur için otel bilgisi bulunmamaktadır.</p>
                  )}
                </div>
              </section>

              {/* Optional Activities Section */}
              <section id="optional" className="space-y-6 ">
                  <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Opsiyonel Aktiviteler</h2>
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
                              <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500">Görsel Yok</div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2 text-foreground">{activity.name}</h3>
                            <div className="text-sm text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: activity.description }} />
                            <div className="flex items-center justify-between"><span className="text-lg font-bold text-primary">{activity.price ? `€${activity.price}` : 'Fiyat Belirtilmemiş'}</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Bu tur için opsiyonel aktivite bulunmamaktadır.</p>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div ref={bookingFormRef} className="sticky top-32">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="text-xl font-semibold mb-6">Hızlı Rezervasyon</h3>
                  <form className="space-y-4">
                    <div className="space-y-2"><Label htmlFor="date">Tarih</Label><Input id="date" type="date" /></div>
                    <div className="space-y-2"><Label htmlFor="people">Kişi Sayısı</Label><Select><SelectTrigger><SelectValue placeholder="Kişi sayısı seçin" /></SelectTrigger><SelectContent><SelectItem value="1">1 Kişi</SelectItem><SelectItem value="2">2 Kişi</SelectItem><SelectItem value="3">3 Kişi</SelectItem><SelectItem value="4">4 Kişi</SelectItem><SelectItem value="5+">5+ Kişi</SelectItem></SelectContent></Select></div>
                    <div className="space-y-2"><Label htmlFor="category">Kategori</Label><Select><SelectTrigger><SelectValue placeholder="Kategori seçin" /></SelectTrigger><SelectContent><SelectItem value="category_a_code">Kategori A</SelectItem><SelectItem value="category_b_code">Kategori B</SelectItem><SelectItem value="category_c_code">Kategori C</SelectItem></SelectContent></Select></div>
                    <div className="space-y-2"><Label htmlFor="fullname">Ad Soyad</Label><Input id="fullname" type="text" placeholder="Adınız ve soyadınız" /></div>
                    <div className="space-y-2"><Label htmlFor="email">E-posta</Label><Input id="email" type="email" placeholder="ornek@email.com" /></div>
                    <div className="space-y-2"><Label htmlFor="phone">Telefon</Label><Input id="phone" type="tel" placeholder="+90 5XX XXX XX XX" /></div>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Rezervasyon Yap</Button>
                  </form>
                  <div className="mt-6 p-4 bg-muted rounded-lg"><h4 className="font-semibold mb-2">İletişim</h4><div className="space-y-2 text-sm"><div className="flex items-center"><Phone className="h-4 w-4 mr-2 text-primary" />+90 212 123 45 67</div><div className="flex items-center"><Mail className="h-4 w-4 mr-2 text-primary" />info@turkiyetours.com</div></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
