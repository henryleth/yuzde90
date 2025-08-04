import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Calendar, Star, Sun } from 'lucide-react';

// Tasarım 2: Premium ve İçerik Odaklı
export default function TourCardV2({ tour }) {
  return (
    <Link href={route('tour.show', tour.slug)} className="block group">
      <Card className="tour-card-v2 w-full h-full flex flex-col overflow-hidden bg-card shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary">
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold leading-tight mb-1">{tour.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{tour.destinations?.map(d => d.name).join(', ')}</p>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-2xl font-extrabold text-primary">€{tour.price_from || '...'}</p>
              <p className="text-xs text-muted-foreground -mt-1">kişi başı</p>
            </div>
          </div>
        </CardHeader>
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={tour.image?.thumbnail_url || 'https://via.placeholder.com/400x200?text=Görsel+Yok'} 
            alt={tour.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4 flex-grow">
          <p className="text-muted-foreground text-sm">
            {tour.summary ? tour.summary.substring(0, 150) + '...' : 'Bu tur için özet bulunmamaktadır.'}
          </p>
        </CardContent>
        <CardFooter className="p-4 bg-muted/50 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <span className="flex items-center" title="Süre">
              <Calendar size={16} className="mr-1.5" /> {tour.duration_days} Gün
            </span>
            <span className="flex items-center" title="Puan">
              <Star size={16} className="mr-1.5 text-yellow-500" /> {typeof tour.rating === 'number' ? tour.rating.toFixed(1) : 'N/A'}
            </span>
          </div>
          <Button variant="link" className="p-0 h-auto text-primary">
            Detayları İncele
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
