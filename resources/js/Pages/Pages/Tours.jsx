import React, { useEffect, useRef, useState } from 'react'; // useState eklendi
import { usePage, router } from '@inertiajs/react'; // usePage ve router import edildi
// Inertia importları kaldırıldı: import { usePage } from '@inertiajs/inertia-react'; import { Inertia } from '@inertiajs/inertia';

const Tours = () => {
  const { tours, filters, allDestinations } = usePage().props; // allDestinations eklendi
  const resultsRef = useRef(null);

  // Destinasyon, süre ve fiyat filtreleri için state'ler (şimdilik boş diziler)
  const [selectedDestinations, setSelectedDestinations] = useState(filters.destinations || []);
  const [selectedDurations, setSelectedDurations] = useState(filters.duration_range || []);
  const [selectedPrices, setSelectedPrices] = useState(filters.price_range || []);
  const [sortBy, setSortBy] = useState(filters.sort_by || 'latest');

  // Filtreleri uygulayan fonksiyon
  const applyFilters = () => {
    let queryParams = {};

    if (selectedDestinations.length > 0) {
      queryParams.destinations = selectedDestinations.join(',');
    }
    if (selectedDurations.length > 0) {
      queryParams.duration_range = selectedDurations.join(',');
    }
    if (selectedPrices.length > 0 && !selectedPrices.includes('all')) { // "all" seçili değilse ekle
      queryParams.price_range = selectedPrices.join(',');
    }
    if (sortBy !== 'latest') {
      queryParams.sort_by = sortBy;
    }

    router.get(route('tours.index'), queryParams, {
      preserveState: true,
      replace: true,
      onSuccess: () => {
        if (resultsRef.current) {
          const headerOffset = 80; // Sabit başlığın yüksekliği
          const elementPosition = resultsRef.current.getBoundingClientRect().top; // Elementin viewport'a göre konumu
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset; // Hedef kaydırma konumu

          window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); // Hesaplanan konuma kaydır
        }
      },
    });
  };

  // Filtreleri temizleyen fonksiyon
  const clearFilters = () => {
    setSelectedDestinations([]);
    setSelectedDurations([]);
    setSelectedPrices([]);
    setSortBy('latest'); // Sıralamayı varsayılana döndür
    router.get(route('tours.index'), {}, {
      preserveState: true,
      replace: true,
      onSuccess: () => {
        if (resultsRef.current) {
          const headerOffset = 80; // Sabit başlığın yüksekliği
          const elementPosition = resultsRef.current.getBoundingClientRect().top; // Elementin viewport'a göre konumu
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset; // Hedef kaydırma konumu

          window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); // Hesaplanan konuma kaydır
        }
      },
    });
  };

  useEffect(() => {
    // İlk yüklemede filtreleri uygula (eğer varsa)
    // Bu useEffect sadece filtreler değiştiğinde çalışacak şekilde ayarlandı.
    // Yani initial yüklemede de çalışacak.
  }, [selectedDestinations, selectedDurations, selectedPrices, sortBy]);


  return (
    <div>
      {/* Tours component content */}
    </div>
  );
};

export default Tours;