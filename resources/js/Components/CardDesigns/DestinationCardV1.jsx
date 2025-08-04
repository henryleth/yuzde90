import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { ArrowRight } from 'lucide-react';
// SSR (Sunucu Tarafı Oluşturma) hatasını çözmek için içe aktarma yöntemi güncellendi.
import LazyLoadImagePkg from 'react-lazy-load-image-component';
const { LazyLoadImage } = LazyLoadImagePkg;
import 'react-lazy-load-image-component/src/effects/blur.css';

// Tasarım 1: Görsel Odaklı ve Modern (Güncellenmiş)
export default function DestinationCardV1({ destination }) {
  return (
    <Link href={route('destinations.show', destination.slug)} className="block group">
      <Card className="destination-card-v1 w-full overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
        <div className="relative aspect-video w-full"> {/* aspect-video ile yatay oran sağlandı */}
          <LazyLoadImage
            src={destination.image?.thumbnail_url || 'https://via.placeholder.com/400x225?text=Görsel+Yok'}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            effect="blur"
            wrapperClassName="w-full h-full"
          />
          <div className="absolute inset-0 p-6 flex items-end">
            <h3 className="text-3xl font-extrabold text-white leading-tight shadow-text transform group-hover:-translate-y-2 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
              {destination.name}
            </h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
