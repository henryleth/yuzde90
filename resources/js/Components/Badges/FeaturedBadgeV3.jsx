import React from 'react';
import { Sparkles } from 'lucide-react';

// Tasarım 3: Zarif ve İnce Tasarım
export default function FeaturedBadgeV3() {
  return (
    <div className="border border-primary/50 bg-background/80 text-primary text-xs font-semibold px-3 py-1 rounded-md backdrop-blur-sm flex items-center">
      <Sparkles size={14} className="mr-2 opacity-80" />
      <span>Öne Çıkan Tur</span>
    </div>
  );
}
