import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Star, MapPin, Award } from 'lucide-react';

// Tasarım 1: Modern ve Minimalist (Güncellenmiş)
export default function TourCardV1({ tour }) {
  const nights = tour.duration_days > 0 ? tour.duration_days - 1 : 0;

  return (
    <Link href={route('tour.show', tour.slug)} className="block group">
      <Card className="tour-card-v1 w-full h-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border-transparent hover:border-primary">
        <div className="relative overflow-hidden">
          <img 
            src={tour.image?.thumbnail_url || 'https://via.placeholder.com/400x250?text=Görsel+Yok'} 
            alt={tour.title} 
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute top-0 left-0 p-4">
            {tour.is_featured && (
              <div className="bg-amber-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-md flex items-center">
                <Award size={14} className="mr-1.5" />
                Öne Çıkan
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-2xl font-bold text-white leading-tight shadow-text">{tour.title}</h3>
            {tour.destinations && tour.destinations.length > 0 && (
              <div className="flex items-center text-sm text-white/90 mt-1">
                <MapPin size={14} className="mr-1.5" />
                <span>{tour.destinations.map(d => d.name).join(', ')}</span>
              </div>
            )}
          </div>
        </div>
        <CardContent className="p-6 flex-grow flex flex-col">
          <p className="text-muted-foreground text-sm mb-4 flex-grow">
            {tour.summary ? tour.summary.substring(0, 120) + '...' : 'Bu tur için özet bulunmamaktadır.'}
          </p>
          <div className="flex justify-between items-center text-sm text-muted-foreground border-t pt-4 mt-auto">
            <div className="flex items-center space-x-4">
              <span className="flex items-center" title="Süre">
                <Clock size={16} className="mr-1.5" /> {tour.duration_days} Gün / {nights} Gece
              </span>
              <span className="flex items-center" title="Puan">
                <Star size={16} className="mr-1.5 text-yellow-500" /> {typeof tour.rating === 'number' ? tour.rating.toFixed(1) : 'N/A'}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Starts from</p>
              <p className="text-xl font-bold text-primary -mt-1">€{tour.price_from || 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
