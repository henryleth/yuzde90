import React from 'react';
import { Award } from 'lucide-react';

// Tasarım 2: Modern Hap Tasarımı
export default function FeaturedBadgeV2() {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold uppercase px-4 py-1.5 rounded-full shadow-lg flex items-center animate-pulse">
      <Award size={14} className="mr-2" />
      <span>Öne Çıkan</span>
    </div>
  );
}
