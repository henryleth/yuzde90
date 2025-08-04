import React from 'react';
import { Star } from 'lucide-react';

// Tasarım: Köşe Şerit
export default function FeaturedBadgeCorner() {
  return (
    <div 
      className="absolute top-0 left-0 w-28 h-28 overflow-hidden"
      style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
    >
      <div 
        className="absolute top-[18px] left-[-30px] w-[150px] transform -rotate-45 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider text-center py-1 shadow-md"
      >
        <div className="flex items-center justify-center">
          <Star size={12} className="mr-1.5" />
          <span>Öne Çıkan</span>
        </div>
      </div>
    </div>
  );
}
