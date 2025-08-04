import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter } from '@/Components/ui/card';
import { Zap } from 'lucide-react';

// Tasarım 2: Minimalist ve Şık
export default function DestinationCardV2({ destination }) {
  return (
    <Link href={route('destinations.show', destination.slug)} className="block group">
      <Card className="destination-card-v2 w-full h-full flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-56 w-full overflow-hidden">
          <img 
            src={destination.image?.thumbnail_url || 'https://via.placeholder.com/400x220?text=Görsel+Yok'} 
            alt={destination.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="text-xl font-bold text-foreground mb-2">{destination.name}</h3>
          <p className="text-sm text-muted-foreground">
            {destination.description ? destination.description.substring(0, 90) + '...' : 'Bu destinasyon için açıklama bulunmamaktadır.'}
          </p>
        </CardContent>
        <CardFooter className="p-4 bg-transparent mt-auto">
          <div className="w-full flex justify-between items-center">
            <div className="text-sm font-semibold text-primary">
              {destination.tours_count} Tur Mevcut
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground group-hover:text-primary transition-colors">
              Keşfet
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
