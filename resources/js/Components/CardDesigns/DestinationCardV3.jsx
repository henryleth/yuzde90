import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { ArrowRightCircle } from 'lucide-react';

// Tasarım 3: Sanatsal ve Dikkat Çekici
export default function DestinationCardV3({ destination }) {
  return (
    <Link href={route('destinations.show', destination.slug)} className="block group">
      <Card className="destination-card-v3 w-full h-full flex flex-col items-center text-center overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
        <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-secondary group-hover:border-primary transition-all duration-300 mb-4">
          <img 
            src={destination.image?.thumbnail_url || 'https://via.placeholder.com/200x200?text=Görsel+Yok'} 
            alt={destination.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <CardContent className="p-0 flex-grow flex flex-col">
          <h3 className="text-2xl font-bold text-foreground mb-2">{destination.name}</h3>
          <p className="text-sm text-muted-foreground flex-grow">
            {destination.description ? destination.description.substring(0, 70) + '...' : 'Açıklama mevcut değil.'}
          </p>
          <div className="mt-4">
            <div className="text-lg font-semibold text-primary mb-2">
              {destination.tours_count} Tur
            </div>
            <Button variant="outline" className="rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              Turları Gör <ArrowRightCircle size={18} className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
