import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Checkbox } from '@/Components/ui/checkbox';
import InputError from '@/Components/InputError';
import { useToast } from '@/hooks/use-toast';
import MediaManagerModal from '@/Components/MediaManagerModal';
import { PlusCircle, Trash2, ImageIcon as IconImageIcon } from 'lucide-react';

export default function Create({ auth, media_files }) {
    const { toast } = useToast();
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        summary: '',
        description: '',
        is_popular: false,
        image_id: null,
    });

    const generateSlug = (text) => {
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g')
    
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-') // Boşlukları - ile değiştir
            .replace(p, c => b.charAt(a.indexOf(c))) // Özel karakterleri dönüştür
            .replace(/&/g, '-and-') // & karakterini 'and' ile değiştir
            .replace(/[^\w\-]+/g, '') // Kelime olmayan karakterleri kaldır
            .replace(/\-\-+/g, '-') // Çoklu -'leri tek - ile değiştir
            .replace(/^-+/, '') // Baştaki -'leri temizle
            .replace(/-+$/, '') // Sondaki -'leri temizle
    }

    const handleImageSelect = (media) => {
        if (media) {
            setSelectedImage(media);
            setData('image_id', media.id);
        } else {
            setSelectedImage(null);
            setData('image_id', null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.destinations.store'), {
            onSuccess: () => {
                toast({
                    title: "Başarılı",
                    description: "Destinasyon başarıyla oluşturuldu.",
                });
            },
            onError: (errors) => {
                const errorMessages = Object.values(errors).flat();
                toast({
                    title: "Hata",
                    description: errorMessages.join('\n') || "Bilinmeyen bir hata oluştu.",
                    variant: "destructive",
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Yeni Destinasyon Ekle"
        >
            <Head title="Yeni Destinasyon Ekle" />

            <Card>
                <CardHeader>
                    <CardTitle>Destinasyon Bilgileri</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Destinasyon Adı</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) => {
                                        const newName = e.target.value;
                                        setData('name', newName);
                                        if (!isSlugManuallyEdited) {
                                            setData('slug', generateSlug(newName));
                                        }
                                    }}
                                    required
                                />
                                <InputError className="mt-2" message={errors.name} />
                            </div>
                            <div>
                                <Label htmlFor="slug">Slug (URL)</Label>
                                <Input
                                    id="slug"
                                    type="text"
                                    name="slug"
                                    value={data.slug}
                                    className="mt-1 block w-full"
                                    onChange={(e) => {
                                        setData('slug', e.target.value);
                                        setIsSlugManuallyEdited(true);
                                    }}
                                    required
                                />
                                <InputError className="mt-2" message={errors.slug} />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="summary">Özet</Label>
                            <Textarea
                                id="summary"
                                name="summary"
                                value={data.summary}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('summary', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.summary} />
                        </div>

                        <div>
                            <Label htmlFor="description">Açıklama</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('description', e.target.value)}
                                rows="5"
                            />
                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        <div>
                            <Label>Görsel</Label>
                            <div className="mt-2 border rounded-md p-4 flex flex-col items-center justify-center space-y-4">
                                {selectedImage ? (
                                    <img
                                        src={selectedImage.original_url}
                                        alt={selectedImage.name || selectedImage.file_name}
                                        className="max-w-full h-48 object-contain rounded-md"
                                    />
                                ) : (
                                    <div className="text-gray-500 flex flex-col items-center">
                                        <IconImageIcon className="h-12 w-12 text-gray-400" />
                                        <span className="mt-2">Henüz bir görsel seçilmedi.</span>
                                    </div>
                                )}
                                <div className="flex items-center space-x-2">
                                    <Button type="button" variant="outline" onClick={() => setIsImageModalOpen(true)}>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        {selectedImage ? 'Görseli Değiştir' : 'Görsel Seç'}
                                    </Button>
                                    {selectedImage && (
                                        <Button type="button" variant="destructive" onClick={() => handleImageSelect(null)}>
                                            <Trash2 className="mr-2 h-4 w-4" /> Kaldır
                                        </Button>
                                    )}
                                </div>
                                <MediaManagerModal
                                    isOpen={isImageModalOpen}
                                    onClose={() => setIsImageModalOpen(false)}
                                    onMediaSelect={(media) => {
                                        handleImageSelect(media);
                                        setIsImageModalOpen(false);
                                    }}
                                    initialSelectedMedia={selectedImage}
                                    isMultiSelect={false}
                                    media={media_files}
                                />
                            </div>
                            <InputError className="mt-2" message={errors.image_id} />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_popular"
                                checked={data.is_popular}
                                onCheckedChange={(checked) => setData('is_popular', checked)}
                            />
                            <Label htmlFor="is_popular">Popüler Destinasyon</Label>
                        </div>

                        <div className="flex justify-start mt-6">
                            <Button type="submit" disabled={processing}>
                                Destinasyonu Kaydet
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
