import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { Checkbox } from '@/Components/ui/checkbox';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { useState, useEffect, useRef } from 'react'; // useRef'i buradan da alalım
import { useTheme } from '@/Context/ThemeContext';
import { Link, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import TourCard from '@/Components/TourCard'; // Yeni merkezi kart bileşenini içe aktar
import FeaturedBadge from '@/Components/Badges/FeaturedBadgeCorner'; // Öne çıkan etiketini içe aktar

export default function Tours({ tours: backendTours, allDestinations, filters, seo }) {
  // Tema ve başlık küçültme durumu için useTheme context'ini kullanıyoruz.
  const { setHeaderShrunk } = useTheme();

  // Filtre çubuğunun yapışkan davranışını ve konumunu yönetmek için state'ler.
  const [isFilterBarSticky, setFilterBarSticky] = useState(false);
  const [filterBarTop, setFilterBarTop] = useState(64); // Filtre çubuğunun 'top' pozisyonu.

  // Gerekli DOM elementlerine referanslar.
  const filterBarRef = useRef(null); // Filtre çubuğunun kendisi.
  const tourListRef = useRef(null); // Tur listesi alanı.
  const initialLoad = useRef(true); // Sayfanın ilk yüklenip yüklenmediğini takip etmek için.

  const tours = backendTours.data;
  const paginationLinks = backendTours.links;
  

  const [selectedDestinations, setSelectedDestinations] = useState(
    filters.destinations ? (Array.isArray(filters.destinations) ? filters.destinations : filters.destinations.split(',')) : []
  );
  const [selectedDurations, setSelectedDurations] = useState(
    filters.duration_range ? (Array.isArray(filters.duration_range) ? filters.duration_range : filters.duration_range.split(',')) : []
  );
  const [selectedPrices, setSelectedPrices] = useState(
    filters.price_range ? (Array.isArray(filters.price_range) ? filters.price_range : filters.price_range.split(',')) : []
  );
  const hasActiveFilters = (
    (filters.destinations && filters.destinations !== 'all' && filters.destinations.length > 0) ||
    (filters.duration_range && filters.duration_range !== 'all' && filters.duration_range.length > 0) ||
    (filters.price_range && filters.price_range !== 'all' && filters.price_range.length > 0)
  );

  const destinations = [{ value: 'all', label: 'Tümü' }, ...allDestinations.map(dest => ({ value: dest.slug, label: dest.name }))];

  const durations = [
    { value: 'all', label: 'Tümü' },
    { value: '3-5', label: '3-5 Gün' },
    { value: '6-10', label: '6-10 Gün' },
    { value: '10-1000', label: '10+ Gün' },
  ];

  const prices = [
    { value: 'all', label: 'Tümü' },
    { value: '0-500', label: '€0 - €500' },
    { value: '501-1000', label: '€501 - €1000' },
    { value: '1001-100000', label: '€1000+' },
  ];

  const handleMultiSelectChange = (list, setList, itemValue) => {
    if (itemValue === 'all') {
      setList([]);
    } else if (list.includes(itemValue)) {
      setList(list.filter((item) => item !== itemValue));
    } else {
      setList([...list, itemValue]);
    }
  };

  const applyFilters = () => {
    const queryParams = {};
    if (selectedDestinations.length > 0 && !selectedDestinations.includes('all')) {
      queryParams.destinations = selectedDestinations.join(',');
    }
    if (selectedDurations.length > 0 && !selectedDurations.includes('all')) {
      queryParams.duration_range = selectedDurations.join(',');
    }
    if (selectedPrices.length > 0 && !selectedPrices.includes('all')) {
      queryParams.price_range = selectedPrices.join(',');
    }
    // Filtreleme yapıldığında sayfa konumunu korumak için 'preserveScroll' true olarak ayarlandı.
    // 'onFinish' içindeki manuel kaydırma mantığı kaldırıldı.
    router.get(route('tours.index'), queryParams, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  const clearFilters = () => {
    setSelectedDestinations([]);
    setSelectedDurations([]);
    setSelectedPrices([]);
    router.get(route('tours.index'), {}, {
      preserveState: true,
      replace: true,
      onSuccess: () => {
        // Filtreleri temizledikten sonra sayfanın en başına pürüzsüzce kaydırır.
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
  };

  // Sayfa kaydırma ve yeniden boyutlandırma olaylarını yöneten ana useEffect.
  // Bu efekt, filtre çubuğunun yapışkan davranışını kontrol eder. Header daraltma mantığı kaldırılmıştır.
  useEffect(() => {
    const handleScrollAndResize = () => {
      // filterBarRef mevcut değilse işlem yapma.
      if (!filterBarRef.current) return;

      const scrollPosition = window.scrollY;
      // Filtre çubuğunun sayfanın üstünden olan orijinal mesafesini al.
      const initialOffset = filterBarRef.current.offsetTop;
      
      // Standart başlık yüksekliği. Header artık daralmayacak.
      const headerHeight = 64; // h-16

      // Yapışkan davranışın başlayacağı noktayı belirle.
      // Bu nokta, filtre çubuğunun orijinal pozisyonundan header yüksekliği çıkarıldığında bulunur.
      const activationPoint = initialOffset - headerHeight;

      // Eğer kaydırma pozisyonu aktivasyon noktasını geçtiyse...
      if (scrollPosition > activationPoint && activationPoint > 0) {
        // Filtre çubuğunu yapışkan yap ve sabit header'ın altına konumlandır.
        // setHeaderShrunk(true) çağrısı kaldırıldı, böylece header daralmaz.
        setFilterBarSticky(true);
        setFilterBarTop(headerHeight);
      } else {
        // Aksi halde, filtre çubuğunu varsayılan durumuna geri döndür.
        setFilterBarSticky(false);
      }
    };

    // Olay dinleyicilerini ekliyoruz.
    window.addEventListener('scroll', handleScrollAndResize);
    window.addEventListener('resize', handleScrollAndResize);
    
    // Component DOM'dan kaldırıldığında olay dinleyicilerini temizle.
    // Header'ın başka sayfalardan etkilenmemesi için varsayılan durumuna döndürülür.
    return () => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
      setHeaderShrunk(false);
    };
  }, [setHeaderShrunk]); // Bağımlılık listesi, bu effect'in yalnızca bileşen yüklendiğinde ve kaldırıldığında çalışmasını sağlar.


  return (
    <GuestLayout seo={seo}>
      <div className={`tours-page bg-background text-foreground min-h-screen`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="py-6">
            {/* Yatay Filtreleme Çubuğu */}
            {/* 
              Filtre çubuğu, `isFilterBarSticky` durumuna göre yapışkan hale gelir.
              `top` değeri, başlığın o anki yüksekliğine (normal veya küçülmüş) göre ayarlanır.
              Mobil cihazlarda (`md:`) normal akışta kalır, daha büyük ekranlarda yapışkan olur.
            */}
            <section 
              ref={filterBarRef}
              className={`tours-filter-bar bg-card p-4 rounded-lg shadow-sm z-30 transition-all duration-300 ${isFilterBarSticky ? 'sticky' : 'relative'}`}
              style={{ top: isFilterBarSticky ? `${filterBarTop}px` : 'auto' }}
            >
              {/* --- MASAÜSTÜ FİLTRE GÖRÜNÜMÜ --- */}
              <div className="hidden md:flex items-center gap-4">
                {/* Destinasyon Filtresi (Genişlik: 4 birim) */}
                <div className="tours-destination-filter flex-grow" style={{ flexBasis: '33.33%' }}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between tours-destination-button">
                        {selectedDestinations.length > 0 ? selectedDestinations.map(val => destinations.find(d => d.value === val)?.label).join(', ') : 'Destinasyon'}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 tours-destination-popover">
                      {destinations.map(destination => (
                        <div key={destination.value} className="flex items-center space-x-2 tours-destination-item hover:bg-muted">
                          <Label htmlFor={`dest-${destination.value}`} className="flex items-center space-x-2 cursor-pointer w-full h-full p-2 text-muted-foreground">
                            <Checkbox
                              id={`dest-${destination.value}`}
                              checked={selectedDestinations.includes(destination.value) || (selectedDestinations.length === 0 && destination.value === 'all')}
                              onCheckedChange={() => handleMultiSelectChange(selectedDestinations, setSelectedDestinations, destination.value)}
                            />
                            <span>{destination.label}</span>
                          </Label>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Süre Filtresi (Genişlik: 3 birim) */}
                <div className="tours-duration-filter flex-grow" style={{ flexBasis: '25%' }}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between tours-duration-button">
                        {selectedDurations.length > 0 ? selectedDurations.map(val => durations.find(d => d.value === val)?.label).join(', ') : 'Süre'}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 tours-duration-popover">
                      {durations.map(duration => (
                        <div key={duration.value} className="flex items-center space-x-2 tours-duration-item hover:bg-muted">
                          <Label htmlFor={`duration-${duration.value}`} className="flex items-center space-x-2 cursor-pointer w-full h-full p-2 text-muted-foreground">
                            <Checkbox
                              id={`duration-${duration.value}`}
                              checked={selectedDurations.includes(duration.value) || (selectedDurations.length === 0 && duration.value === 'all')}
                              onCheckedChange={() => handleMultiSelectChange(selectedDurations, setSelectedDurations, duration.value)}
                            />
                            <span>{duration.label}</span>
                          </Label>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Fiyat Aralığı Filtresi (Genişlik: 3 birim) */}
                <div className="tours-price-filter flex-grow" style={{ flexBasis: '25%' }}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between tours-price-button">
                        {selectedPrices.length > 0 ? selectedPrices.map(val => prices.find(p => p.value === val)?.label).join(', ') : 'Fiyat Aralığı'}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 tours-price-popover">
                      {prices.map(price => (
                        <div key={price.value} className="flex items-center space-x-2 tours-price-item hover:bg-muted">
                          <Label htmlFor={`price-${price.value}`} className="flex items-center space-x-2 cursor-pointer w-full h-full p-2 text-muted-foreground">
                            <Checkbox
                              id={`price-${price.value}`}
                              checked={selectedPrices.includes(price.value) || (selectedPrices.length === 0 && price.value === 'all')}
                              onCheckedChange={() => handleMultiSelectChange(selectedPrices, setSelectedPrices, price.value)}
                            />
                            <span>{price.label}</span>
                          </Label>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Filtreleme Butonları (Genişlik: 2 birim) */}
                <div className="flex gap-2 flex-grow" style={{ flexBasis: '16.66%' }}>
                    <Button onClick={() => applyFilters()} className="tours-filter-apply-button w-full">
                      Filtrele
                    </Button>
                    {hasActiveFilters && (
                      <Button onClick={clearFilters} variant="outline" className="tours-clear-filters-button">
                        Temizle
                      </Button>
                    )}
                </div>
              </div>

              {/* --- MOBİL FİLTRE GÖRÜNÜMÜ (AKORDİYON) --- */}
              <div className="md:hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="filters">
                    <AccordionTrigger>Filtreler</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        {/* Mobil Destinasyon Filtresi */}
                        <div className="tours-destination-filter space-y-2">
                          <Label>Destinasyon</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-between tours-destination-button">
                                {selectedDestinations.length > 0 ? selectedDestinations.map(val => destinations.find(d => d.value === val)?.label).join(', ') : 'Seçim Yapın'}
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 tours-destination-popover">
                              {destinations.map(destination => (
                                <div key={destination.value} className="flex items-center space-x-2 tours-destination-item hover:bg-muted">
                                  <Label htmlFor={`mobile-dest-${destination.value}`} className="flex items-center space-x-2 cursor-pointer w-full h-full p-2 text-muted-foreground">
                                    <Checkbox
                                      id={`mobile-dest-${destination.value}`}
                                      checked={selectedDestinations.includes(destination.value) || (selectedDestinations.length === 0 && destination.value === 'all')}
                                      onCheckedChange={() => handleMultiSelectChange(selectedDestinations, setSelectedDestinations, destination.value)}
                                    />
                                    <span>{destination.label}</span>
                                  </Label>
                                </div>
                              ))}
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Mobil Süre Filtresi */}
                        <div className="tours-duration-filter space-y-2">
                          <Label>Süre</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-between tours-duration-button">
                                {selectedDurations.length > 0 ? selectedDurations.map(val => durations.find(d => d.value === val)?.label).join(', ') : 'Seçim Yapın'}
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 tours-duration-popover">
                              {durations.map(duration => (
                                <div key={duration.value} className="flex items-center space-x-2 tours-duration-item hover:bg-muted">
                                  <Label htmlFor={`mobile-duration-${duration.value}`} className="flex items-center space-x-2 cursor-pointer w-full h-full p-2 text-muted-foreground">
                                    <Checkbox
                                      id={`mobile-duration-${duration.value}`}
                                      checked={selectedDurations.includes(duration.value) || (selectedDurations.length === 0 && duration.value === 'all')}
                                      onCheckedChange={() => handleMultiSelectChange(selectedDurations, setSelectedDurations, duration.value)}
                                    />
                                    <span>{duration.label}</span>
                                  </Label>
                                </div>
                              ))}
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Mobil Fiyat Aralığı Filtresi */}
                        <div className="tours-price-filter space-y-2">
                          <Label>Fiyat Aralığı</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-between tours-price-button">
                                {selectedPrices.length > 0 ? selectedPrices.map(val => prices.find(p => p.value === val)?.label).join(', ') : 'Seçim Yapın'}
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 tours-price-popover">
                              {prices.map(price => (
                                <div key={price.value} className="flex items-center space-x-2 tours-price-item hover:bg-muted">
                                  <Label htmlFor={`mobile-price-${price.value}`} className="flex items-center space-x-2 cursor-pointer w-full h-full p-2 text-muted-foreground">
                                    <Checkbox
                                      id={`mobile-price-${price.value}`}
                                      checked={selectedPrices.includes(price.value) || (selectedPrices.length === 0 && price.value === 'all')}
                                      onCheckedChange={() => handleMultiSelectChange(selectedPrices, setSelectedPrices, price.value)}
                                    />
                                    <span>{price.label}</span>
                                  </Label>
                                </div>
                              ))}
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        {/* Mobil Filtreleme Butonları */}
                        <div className="flex flex-col gap-2">
                            <Button onClick={() => applyFilters()} className="tours-filter-apply-button w-full">
                              Filtrele
                            </Button>
                            {hasActiveFilters && (
                              <Button onClick={clearFilters} variant="outline" className="tours-clear-filters-button w-full">
                                Temizle
                              </Button>
                            )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>
          </div>

          {/* Ana İçerik */}
          <main>
            {/* Main Content */}
            <section ref={tourListRef} className="tours-main-content pt-6 md:pt-0 pb-12">
              <div className="max-w-6xl mx-auto">
                {tours.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tours.map((tour) => (
                      <TourCard key={tour.id} tour={tour} featuredBadge={FeaturedBadge} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground text-lg mt-8 tours-no-tours-message">Filtreleme kriterlerinize uygun tur bulunamadı.</p>
                )}

                {/* Pagination */}
                {paginationLinks && paginationLinks.length > 3 && (
                  <div className="mt-12 flex justify-center tours-pagination">
                    <nav className="flex items-center space-x-2">
                      {paginationLinks.map((link, index) => (
                        <Link
                          key={link.label || index}
                          href={link.url || '#'}
                          className={`px-4 py-2 rounded-md text-sm font-medium ${link.active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''} tours-pagination-link`}
                          preserveScroll
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </GuestLayout>
  );
}
