import React from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox'; // Checkbox bileşeni eklendi
import { Button } from '@/Components/ui/button'; // Button bileşeni eklendi
import { Trash2 } from 'lucide-react'; // Trash2 ikonu eklendi

const MediaItemCard = React.memo(({ item, selectedMedia, setSelectedMedia, isMultiSelect, onDelete }) => {
    // Medya öğesi seçildiğinde çağrılır
    const handleCardClick = () => {
        setSelectedMedia(item);
    };

    // Medya öğesinin seçili olup olmadığını kontrol et
    const isSelected = isMultiSelect 
        ? selectedMedia.some(media => media.id === item.id)
        : selectedMedia?.id === item.id;

    return (
        <Card 
            key={item.id} 
            className={`relative cursor-pointer ${isSelected ? 'border-primary ring-2 ring-primary' : ''} media-item-card`}
            onClick={handleCardClick} // Card'ın kendisi tıklanabilir
        >
            {/* Checkbox kaldırıldı */}
            <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 z-20" // opacity-0 ve group-hover:opacity-100 kaldırıldı, z-index 20 yapıldı
                onClick={(e) => {
                    e.stopPropagation(); // Kart seçimini engelle
                    onDelete(item.id);
                }}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
            <CardContent className="p-2">
                <img 
                    src={item.thumbnail_url || item.original_url} 
                    alt={item.name || item.file_name} 
                    className="w-full h-32 object-cover rounded-md media-item-image"
                />
                <p className="text-xs text-center mt-2 truncate media-item-name">{item.name || item.file_name}</p>
            </CardContent>
        </Card>
    );
});

export default MediaItemCard; 