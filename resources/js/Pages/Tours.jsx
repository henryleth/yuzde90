import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { Checkbox } from '@/Components/ui/checkbox';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '@/Context/ThemeContext';
import { router, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';
import GuestLayout from '@/Layouts/GuestLayout';
import TourCard from '@/Components/TourCard';
import FeaturedBadge from '@/Components/Badges/FeaturedBadgeCorner';
import axios from 'axios'; // axios'u geri ekliyoruz

export default function Tours({ tours: initialTours, allDestinations, filters, seo }) {
    const { t } = useTranslation();
    const { setHeaderShrunk } = useTheme();
    const { props: { version } } = usePage(); // Inertia versiyonunu al

    // Turları, sayfalama bilgilerini ve yükleme durumunu yönetmek için state'ler
    const [tours, setTours] = useState(initialTours.data);
    const [pagination, setPagination] = useState(initialTours);
    const [loading, setLoading] = useState(false);
    const observer = useRef();
    const lastTourElementRef = useRef(); // Son eleman için ref

    // Filtre çubuğunun yapışkan davranışını yönetmek için state'ler
    const [isFilterBarSticky, setFilterBarSticky] = useState(false);
    const [filterBarTop, setFilterBarTop] = useState(64);
    const filterBarRef = useRef(null);

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

  const destinations = [{ value: 'all', label: t('tours.filters.all', 'Tümü') }, ...allDestinations.map(dest => ({ value: dest.slug, label: dest.name }))];

  const durations = [
    { value: 'all', label: t('tours.filters.all', 'Tümü') },
    { value: '3-5', label: t('tours.filters.days_3_5', '3-5 Gün') },
    { value: '6-10', label: t('tours.filters.days_6_10', '6-10 Gün') },
    { value: '10-1000', label: t('tours.filters.days_10_plus', '10+ Gün') },
  ];

  // Fiyat aralıkları güncellendi ve dil bağımlılığı kaldırıldı
  const prices = [
    { value: 'all', label: t('tours.filters.all', 'Tümü') },
    { value: '500-1000', label: '€500 - €1000' },
    { value: '1000-1500', label: '€1000 - €1500' },
    { value: '1500-2000', label: '€1500 - €2000' },
    { value: '2000+', label: '€2000+' },
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

  // Filtreler uygulandığında, tur listesini sıfırla ve Inertia ile yeni verileri getir
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
    
    router.get(route('tours.index'), queryParams, {
        preserveState: true,
        replace: true,
        onSuccess: (page) => {
            setTours(page.props.tours.data);
            setPagination(page.props.tours);
        }
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


    // Daha fazla tur yüklemek için axios kullanan fonksiyon
    const loadMoreTours = () => {
        if (!pagination.next_page_url || loading) return;
        setLoading(true);

        axios.get(pagination.next_page_url, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            const newTours = response.data.data;
            const newPagination = response.data;
            setTours(prevTours => [...prevTours, ...newTours]);
            setPagination(newPagination);
        })
        .catch(error => {
            console.error("Error loading more tours:", error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    // IntersectionObserver'ı kuran ve yöneten useEffect
    useEffect(() => {
        if (loading) return;

        // rootMargin'i negatif bir değere ayarlayarak, son eleman ekranın altına
        // belirli bir miktar yaklaştığında değil, ekranın alt kenarını geçtikten
        // sonra yükleme yapılmasını sağlıyoruz. Bu, sayfa ilk açıldığında
        // içeriğin kısa olması durumunda istenmeyen yüklemeleri engeller.
        const options = {
            root: null,
            rootMargin: '0px 0px -500px 0px', // Son eleman, görünümün altından 50px yukarı kaydırıldığında tetiklenir.
            threshold: 0,
        };

        const currentObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && pagination.next_page_url) {
                loadMoreTours();
            }
        }, options);

        if (lastTourElementRef.current) {
            currentObserver.observe(lastTourElementRef.current);
        }

        return () => {
            if (lastTourElementRef.current) {
                currentObserver.unobserve(lastTourElementRef.current);
            }
        };
    }, [loading, pagination]);

    // Filtre çubuğunun yapışkan davranışını yöneten useEffect
    useEffect(() => {
        const handleScrollAndResize = () => {
            if (!filterBarRef.current) return;
            const scrollPosition = window.scrollY;
            const initialOffset = filterBarRef.current.offsetTop;
            const headerHeight = 64;
            const activationPoint = initialOffset - headerHeight;

            if (scrollPosition > activationPoint && activationPoint > 0) {
                setFilterBarSticky(true);
                setFilterBarTop(headerHeight);
            } else {
                setFilterBarSticky(false);
            }
        };

        window.addEventListener('scroll', handleScrollAndResize);
        window.addEventListener('resize', handleScrollAndResize);
        return () => {
            window.removeEventListener('scroll', handleScrollAndResize);
            window.removeEventListener('resize', handleScrollAndResize);
            setHeaderShrunk(false);
        };
    }, [setHeaderShrunk]);


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
                        {selectedDestinations.length > 0 ? selectedDestinations.map(val => destinations.find(d => d.value === val)?.label).join(', ') : t('tours.filters.destination', 'Destinasyon')}
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
                        {selectedDurations.length > 0 ? selectedDurations.map(val => durations.find(d => d.value === val)?.label).join(', ') : t('tours.filters.duration', 'Süre')}
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
                        {selectedPrices.length > 0 ? selectedPrices.map(val => prices.find(p => p.value === val)?.label).join(', ') : t('tours.filters.price_range', 'Fiyat Aralığı')}
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
                      {t('tours.filters.filter_button', 'Filtrele')}
                    </Button>
                    {hasActiveFilters && (
                      <Button onClick={clearFilters} variant="outline" className="tours-clear-filters-button">
                        {t('tours.filters.clear_button', 'Temizle')}
                      </Button>
                    )}
                </div>
              </div>

              {/* --- MOBİL FİLTRE GÖRÜNÜMÜ (AKORDİYON) --- */}
              <div className="md:hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="filters">
                    <AccordionTrigger>{t('tours.filters.mobile_title', 'Filtreler')}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        {/* Mobil Destinasyon Filtresi */}
                        <div className="tours-destination-filter space-y-2">
                          <Label>{t('tours.filters.destination', 'Destinasyon')}</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-between tours-destination-button">
                                {selectedDestinations.length > 0 ? selectedDestinations.map(val => destinations.find(d => d.value === val)?.label).join(', ') : t('tours.filters.make_selection', 'Seçim Yapın')}
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
                          <Label>{t('tours.filters.duration', 'Süre')}</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-between tours-duration-button">
                                {selectedDurations.length > 0 ? selectedDurations.map(val => durations.find(d => d.value === val)?.label).join(', ') : t('tours.filters.make_selection', 'Seçim Yapın')}
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
                          <Label>{t('tours.filters.price_range', 'Fiyat Aralığı')}</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-between tours-price-button">
                                {selectedPrices.length > 0 ? selectedPrices.map(val => prices.find(p => p.value === val)?.label).join(', ') : t('tours.filters.make_selection', 'Seçim Yapın')}
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
                              {t('tours.filters.filter_button', 'Filtrele')}
                            </Button>
                            {hasActiveFilters && (
                              <Button onClick={clearFilters} variant="outline" className="tours-clear-filters-button w-full">
                                {t('tours.filters.clear_button', 'Temizle')}
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
            <section className="tours-main-content pt-6 md:pt-0 pb-12">
              <div className="max-w-6xl mx-auto">
                {tours.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tours.map((tour, index) => (
                        <div key={tour.id} ref={tours.length === index + 1 ? lastTourElementRef : null}>
                            <TourCard tour={tour} featuredBadge={FeaturedBadge} />
                        </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground text-lg mt-8 tours-no-tours-message">
                    {t('tours.no_tours_found', 'Filtreleme kriterlerinize uygun tur bulunamadı.')}
                  </p>
                )}
                {/* Yükleme göstergesi */}
                {loading && <p className="text-center py-4">{t('tours.loading', 'Yükleniyor...')}</p>}
              </div>
            </section>
          </main>
        </div>
      </div>
    </GuestLayout>
  );
}
