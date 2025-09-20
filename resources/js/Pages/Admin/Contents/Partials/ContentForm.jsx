import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'; // Tabs bileşenleri eklendi
import { Checkbox } from '@/Components/ui/checkbox';
import RichTextEditor from '@/Components/RichTextEditor';
import MediaManagerModal from '@/Components/MediaManagerModal'; // MediaLibraryModal yerine MediaManagerModal import edildi
import MultiSelect from '@/Components/ui/multi-select'; // MultiSelect import edildi
import { format } from "date-fns";
import { CalendarIcon, ImageIcon as IconImageIcon, PlusCircle, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { cn } from "@/lib/utils";

export default function ContentForm({ content, contentCategories, destinations, isEdit = false, onError }) {
    const { data, setData, post, put, reset, processing, errors } = useForm({
        title: content?.title || '',
        slug: content?.slug || '',
        summary: content?.summary || '',
        content: content?.content || '',
        published_at: content?.published_at ? new Date(content.published_at) : null,
        image_id: content?.image_id || null,
        categories: content?.content_categories?.map(cat => cat.id) || [],
        destinations: content?.destinations?.map(dest => dest.id) || [],
        meta_title: content?.meta_title || '',
        meta_description: content?.meta_description || '',
    });

    const [mediaModalOpen, setMediaModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(content?.image || null);

    const { media_files } = usePage().props;

    useEffect(() => {
        if (isEdit && content) {
            setData({
                title: content.title || '',
                slug: content.slug || '',
                summary: content.summary || '',
                content: content.content || '',
                published_at: content.published_at ? new Date(content.published_at) : null,
                image_id: content.image_id || null,
                categories: content.content_categories?.map(cat => cat.id) || [],
                destinations: content.destinations?.map(dest => dest.id) || [],
                meta_title: content.meta_title || '',
                meta_description: content.meta_description || '',
            });
            setSelectedImage(content.image || null);
        }
    }, [content, isEdit]);

    // Slug otomatik oluşturma
    useEffect(() => {
        if (!isEdit && data.title) {
            setData('slug', generateSlug(data.title));
        }
    }, [data.title, isEdit]);


    const generateSlug = (text) => {
        return text
            .toString()
            .normalize('NFD')
            .replace(/\p{M}/gu, '')
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.contents.update', content.id), {
                onSuccess: () => {
                    // Başarılı olursa Inertia otomatik toast gösterir, burada ekstra bir şey yapmaya gerek yok
                },
                onError: (validationErrors) => {
                    if (typeof onError === 'function') {
                        onError(validationErrors);
                    }
                },
            });
        } else {
            post(route('admin.contents.store'), {
                onSuccess: () => {
                    reset(); // Formu sıfırla
                },
                onError: (validationErrors) => {
                    if (typeof onError === 'function') {
                        onError(validationErrors);
                    }
                },
            });
        }
    };

    const handleMediaSelect = (media) => {
        setSelectedImage(media);
        setData('image_id', media ? media.id : null);
        setMediaModalOpen(false);
    };

    const categoryOptions = contentCategories.map(cat => ({
        value: cat.id,
        label: cat.name,
    }));

    const destinationOptions = destinations.map(dest => ({
        value: dest.id.toString(), // String'e çevir MultiSelect için
        label: dest.name,
    }));

    const handleCategorySelect = (categoryId) => {
        setData(prevData => {
            const currentCategories = prevData.categories || [];
            const isSelected = currentCategories.includes(categoryId);

            if (isSelected) {
                return {
                    ...prevData,
                    categories: currentCategories.filter(id => id !== categoryId),
                };
            } else {
                return {
                    ...prevData,
                    categories: [...currentCategories, categoryId],
                };
            }
        });
    };

    const handleDestinationSelect = (selectedDestinationIds) => {
        setData(prevData => ({
            ...prevData,
            destinations: selectedDestinationIds.map(id => parseInt(id)), // String'den integer'a çevir
        }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{isEdit ? 'İçeriği Düzenle' : 'Yeni İçerik Oluştur'}</CardTitle>
                <CardDescription>
                    {isEdit ? 'Mevcut içeriğin detaylarını güncelleyin.' : 'Yeni bir içerik oluşturun ve yayınlayın.'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <InputError message={errors.general} className="mb-4" />
                    <Tabs defaultValue="general">
                        <TabsList>
                            <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
                            <TabsTrigger value="seo">SEO Ayarları</TabsTrigger>
                        </TabsList>
                        <TabsContent value="general" className="space-y-6 pt-4">
                            <div>
                                <Label htmlFor="title">Başlık</Label>
                                <Input id="title" name="title" value={data.title} onChange={(e) => setData('title', e.target.value)} required className="mt-1 block w-full" />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" name="slug" value={data.slug} onChange={(e) => setData('slug', e.target.value)} required className="mt-1 block w-full" />
                                <InputError message={errors.slug} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="summary">Özet</Label>
                                <Textarea id="summary" name="summary" value={data.summary} onChange={(e) => setData('summary', e.target.value)} className="mt-1 block w-full" rows="4" />
                                <InputError message={errors.summary} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="content">İçerik</Label>
                                <RichTextEditor value={data.content} onChange={(value) => setData('content', value)} className="mt-1 block w-full min-h-[300px] bg-white text-gray-900 editor-light-mode" />
                                <InputError message={errors.content} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="published_at">Yayınlanma Tarihi</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={"outline"} className={cn("w-[240px] justify-start text-left font-normal", !data.published_at && "text-muted-foreground")}>
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {data.published_at ? format(data.published_at, "PPP") : <span>Tarih Seç</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={data.published_at} onSelect={(date) => setData('published_at', date)} initialFocus />
                                    </PopoverContent>
                                </Popover>
                                <InputError message={errors.published_at} className="mt-2" />
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
                                        <Button type="button" variant="outline" onClick={() => setMediaModalOpen(true)}>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            {selectedImage ? 'Görseli Değiştir' : 'Görsel Seç'}
                                        </Button>
                                        {selectedImage && (
                                            <Button type="button" variant="destructive" onClick={() => handleMediaSelect(null)}>
                                                <Trash2 className="mr-2 h-4 w-4" /> Kaldır
                                            </Button>
                                        )}
                                    </div>
                                    <MediaManagerModal isOpen={mediaModalOpen} onClose={() => setMediaModalOpen(false)} onMediaSelect={handleMediaSelect} initialSelectedMedia={selectedImage} isMultiSelect={false} media={media_files} />
                                </div>
                                <InputError className="mt-2" message={errors.image_id} />
                            </div>

                            <div>
                                <Label htmlFor="categories">Kategoriler</Label>
                                <MultiSelect options={categoryOptions} selectedValues={data.categories} onSelect={handleCategorySelect} placeholder="Kategori Seç" />
                                <InputError message={errors.categories} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="destinations">Destinasyonlar</Label>
                                <MultiSelect 
                                    options={destinationOptions} 
                                    selectedValues={data.destinations.map(id => id.toString())} // Integer'ları string'e çevir
                                    onSelect={handleDestinationSelect} 
                                    placeholder="Destinasyon Seç" 
                                />
                                <InputError message={errors.destinations} className="mt-2" />
                            </div>
                        </TabsContent>
                        <TabsContent value="seo" className="space-y-6 pt-4">
                            <h3 className="text-lg font-semibold">SEO Ayarları</h3>
                            <p className="text-sm text-muted-foreground mb-4">Bu içeriğe özel SEO başlığı ve açıklaması girin. Boş bırakılırsa genel ayarlardaki şablonlar kullanılır.</p>
                            <div>
                                <Label htmlFor="meta_title">Meta Başlık</Label>
                                <Input
                                    id="meta_title"
                                    type="text"
                                    value={data.meta_title || ''}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="Genel şablon kullanılacak"
                                />
                                <InputError className="mt-2" message={errors.meta_title} />
                            </div>
                            <div>
                                <Label htmlFor="meta_description">Meta Açıklama</Label>
                                <Textarea
                                    id="meta_description"
                                    value={data.meta_description || ''}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    className="mt-1 block w-full"
                                    rows={3}
                                    placeholder="Genel şablon kullanılacak"
                                />
                                <InputError className="mt-2" message={errors.meta_description} />
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className="flex items-center gap-4 mt-6">
                        <Button type="submit" disabled={processing}>Kaydet</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
