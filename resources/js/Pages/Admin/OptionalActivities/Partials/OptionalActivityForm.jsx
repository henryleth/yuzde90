import React, { useState } from 'react';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import RichTextEditor from '@/Components/RichTextEditor';
import MediaManagerModal from '@/Components/MediaManagerModal';
import { Button } from '@/Components/ui/button';
import { ImageIcon as IconImageIcon, PlusCircle, Trash2 } from 'lucide-react';
import InputError from '@/Components/InputError';

export default function OptionalActivityForm({ data, setData, errors, media_files }) {
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(data.image || null);

    const handleMediaSelect = (media) => {
        setSelectedImage(media);
        setData('image_id', media ? media.id : null);
    };

    return (
        <div className="space-y-6">
            <div>
                <Label htmlFor="name">Aktivite Adı</Label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />
                <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
                <Label htmlFor="price">Fiyat (€)</Label>
                <Input
                    id="price"
                    type="number"
                    name="price"
                    value={data.price || ''}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('price', e.target.value)}
                />
                <InputError className="mt-2" message={errors.price} />
            </div>

            <div>
                <Label htmlFor="description">Açıklama</Label>
                <RichTextEditor
                    value={data.description}
                    onChange={(value) => setData('description', value)}
                    className="mt-1"
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div>
                <Label>Öne Çıkan Görsel</Label>
                <div className="mt-2 border rounded-md p-4 flex flex-col items-center justify-center space-y-4">
                    {selectedImage ? (
                        <img src={selectedImage.original_url} alt={selectedImage.name} className="max-w-full h-48 object-contain rounded-md" />
                    ) : (
                        <div className="text-gray-500 flex flex-col items-center">
                            <IconImageIcon className="h-12 w-12 text-gray-400" />
                            <span className="mt-2">Henüz bir görsel seçilmedi.</span>
                        </div>
                    )}
                    <div className="flex items-center space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsMediaModalOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {selectedImage ? 'Görseli Değiştir' : 'Görsel Seç'}
                        </Button>
                        {selectedImage && (
                            <Button type="button" variant="destructive" onClick={() => handleMediaSelect(null)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Kaldır
                            </Button>
                        )}
                    </div>
                    <MediaManagerModal
                        isOpen={isMediaModalOpen}
                        onClose={() => setIsMediaModalOpen(false)}
                        onMediaSelect={(media) => { handleMediaSelect(media); setIsMediaModalOpen(false); }}
                        initialSelectedMedia={selectedImage}
                        isMultiSelect={false}
                        media={media_files}
                    />
                </div>
                <InputError className="mt-2" message={errors.image_id} />
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="is_published"
                    checked={data.is_published}
                    onCheckedChange={(checked) => setData('is_published', checked)}
                />
                <Label htmlFor="is_published">Yayınlandı</Label>
            </div>
        </div>
    );
}
