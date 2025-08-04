import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star, ArrowRight } from 'lucide-react';

// Tasarım 3: Canlı ve Maceraperest (Son Düzeltmelerle)
export default function TourCardV3({ tour, featuredBadge: FeaturedBadge }) {
  const nights = tour.duration_days > 0 ? tour.duration_days - 1 : 0;

  return (
    <Link href={route('tour.show', tour.slug)} className="block group h-full">
      <Card className="tour-card-v3 w-full h-full flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out relative rounded-lg overflow-hidden">
        
        {/* Köşe Şeridi */}
        {tour.is_featured && FeaturedBadge && (
          <FeaturedBadge />
        )}

        {/* Kart İçeriği */}
        <div className="flex flex-col flex-grow">
          <div className="relative h-64 w-full">
            <img 
              src={tour.image?.thumbnail_url || 'https://via.placeholder.com/400x260?text=Görsel+Yok'} 
              alt={tour.title} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              {/* Sağ Üst Köşe: Gün/Gece Bilgisi */}
              <div className="absolute top-4 right-4">
                <div className="inline-flex items-center rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <span>{tour.duration_days} Gün / {nights} Gece</span>
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-4 flex-grow flex flex-col bg-card">
            <h3 className="text-2xl font-bold text-foreground leading-tight mb-2">{tour.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">
              {tour.summary ? tour.summary.substring(0, 100) + '...' : 'Bu tur için özet bulunmamaktadır.'}
            </p>

            {/* Puan ve Destinasyonlar */}
            <div className="space-y-2 mb-4">
              {tour.destinations && tour.destinations.length > 0 && (
                  <div className="flex items-center text-sm text-muted-foreground truncate" title={tour.destinations.map(d => d.name).join(', ')}>
                    <MapPin size={14} className="mr-1.5 flex-shrink-0" />
                    <span className="truncate">{tour.destinations.map(d => d.name).join(', ')}</span>
                  </div>
              )}
              <div className="flex items-center space-x-1 text-sm">
                <Star size={14} className="text-yellow-500" />
                <span className="font-bold">{typeof tour.rating === 'number' ? tour.rating.toFixed(1) : 'N/A'}</span>
                <span className="text-muted-foreground">Puan</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-auto border-t pt-4">
              <div>
                <p className="text-xs text-muted-foreground">Starts from</p>
                <p className="text-2xl font-bold text-primary -mt-1">€{tour.price_from || 'N/A'}</p>
              </div>
              <Button className="rounded-full group-hover:bg-primary/90 transition-colors">
                Keşfet <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
