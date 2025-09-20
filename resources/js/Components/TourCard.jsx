import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Star, Users } from 'lucide-react';
import LazyImage from './LazyImage'; // Yeni merkezi LazyImage bileşenimizi import ediyoruz
import { useTranslation } from '@/hooks/useTranslation';

// Merkezi ve Yeniden Kullanılabilir Tur Kartı Bileşeni
export default function TourCard({ tour, featuredBadge: FeaturedBadge, isLcp = false }) {
  const { t } = useTranslation();
  const imageUrl = tour.image?.thumbnail_url || `https://placehold.co/400x200?text=${encodeURIComponent(t('tour_card.image_not_found', 'Görsel Bulunamadı'))}`;

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group relative">
      {/* Köşe Şeridi */}
      {tour.is_popular && FeaturedBadge && (
        <FeaturedBadge />
      )}

      <Link href={route('tour.show', tour.slug)} className="block">
        <div className="relative overflow-hidden h-48">
          {isLcp ? (
            // LCP (Largest Contentful Paint) optimizasyonu için
            // Bu resim "above the fold" ise, lazy loading olmadan ve yüksek öncelikle yüklenir.
            <img
              src={imageUrl}
              alt={tour.title}
              fetchpriority="high"
              loading="eager"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            // Diğer tüm resimler için lazy loading kullanılır.
            <LazyImage
              src={imageUrl}
              alt={tour.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              wrapperClassName="w-full h-full"
              effect="blur" // Resim yüklenirken bulanıklaştırma efekti uygula
            />
          )}
          <div className="absolute top-4 right-4">
            <div className="inline-flex items-center rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <span>{t('tour_card.days', '{count} Gün', { count: tour.duration_days })}</span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <Link href={route('tour.show', tour.slug)}>
            <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">{tour.title}</h3>
          </Link>
          <p className="text-muted-foreground text-sm mb-4">
            {tour.summary ? tour.summary.substring(0, 100) + '...' : ''}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Users size={14} className="mr-1.5" />
              {t('tour_card.people', '{min}-{max} Kişi', { min: tour.min_participants ?? 'N/A', max: tour.max_participants ?? 'N/A' })}
            </span>
            <span className="flex items-center">
              <Star size={14} className="mr-1.5 text-yellow-500" />
              {tour.rating !== null && tour.rating !== undefined ? Number(tour.rating).toFixed(1) : 'N/A'}
              <span className="text-xs text-muted-foreground ml-1">({tour.reviews_count || 0})</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">€{tour.price_from || 'N/A'}</span>
              <span className="text-sm text-muted-foreground block -mt-1">{t('tour_card.per_person', 'kişi başına')}</span>
            </div>
            <Button asChild>
              <Link href={route('tour.show', tour.slug)}>{t('tour_card.view_details', 'Detayları Gör')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
