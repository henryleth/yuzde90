import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Users } from 'lucide-react';
// SSR (Sunucu Tarafı Oluşturma) hatasını çözmek için içe aktarma yöntemi güncellendi.
import LazyLoadImagePkg from 'react-lazy-load-image-component';
const { LazyLoadImage } = LazyLoadImagePkg;
import 'react-lazy-load-image-component/src/effects/blur.css';

// Merkezi ve Yeniden Kullanılabilir Tur Kartı Bileşeni
export default function TourCard({ tour, featuredBadge: FeaturedBadge }) {
  return (
    <Card className="w-full h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group relative">
      {/* Köşe Şeridi */}
      {tour.is_featured && FeaturedBadge && (
        <FeaturedBadge />
      )}

      <Link href={route('tour.show', tour.slug)} className="block">
        <div className="relative overflow-hidden h-48">
          {/*
            LazyLoadImage bileşeni, resimlerin sadece kullanıcı ekranına geldiğinde yüklenmesini sağlar.
            'effect="blur"' prop'u, resim yüklenene kadar bulanık bir placeholder gösterir.
            Bu, sayfa yükleme performansını artırır ve kullanıcı deneyimini iyileştirir.
          */}
          <LazyLoadImage
            src={tour.image?.thumbnail_url || 'https://via.placeholder.com/400x200?text=Görsel+Bulunamadı'}
            alt={tour.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            effect="blur"
            wrapperClassName="w-full h-full"
          />
          <div className="absolute top-4 right-4">
            <div className="inline-flex items-center rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <span>{tour.duration_days} Gün</span>
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
              {tour.min_participants ?? 'N/A'}-{tour.max_participants ?? 'N/A'} Kişi
            </span>
            <span className="flex items-center">
              <Star size={14} className="mr-1.5 text-yellow-500" />
              {typeof tour.rating === 'number' ? tour.rating.toFixed(1) : 'N/A'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">€{tour.price_from || 'N/A'}</span>
              <span className="text-sm text-muted-foreground block -mt-1">kişi başına</span>
            </div>
            <Button asChild>
              <Link href={route('tour.show', tour.slug)}>Detayları Gör</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
