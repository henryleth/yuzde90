import React from 'react';
import { Star } from 'lucide-react';

// Tasarım 1: Şerit Tasarımı
export default function FeaturedBadgeV1() {
  return (
    <div className="absolute -top-2 -left-2 w-28 h-28 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-primary transform -rotate-45 translate-x-[-3.5rem] translate-y-[1rem] flex items-center justify-center shadow-lg">
        <div className="flex items-center text-primary-foreground text-xs font-bold uppercase tracking-wider transform rotate-45">
          <Star size={14} className="mr-1.5 fill-current" />
          <span>Öne Çıkan</span>
        </div>
      </div>
    </div>
  );
}
