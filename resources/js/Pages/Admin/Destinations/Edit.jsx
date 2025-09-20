import React, { useState, useEffect, Suspense, lazy } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import InputError from '@/Components/InputError';
import MediaManagerModal from '@/Components/MediaManagerModal';

// RichTextEditor'ı yalnızca istemci tarafında yüklenecek şekilde dinamik olarak içe aktar.
const RichTextEditor = lazy(() => import('@/Components/RichTextEditor'));

// SSR sırasında 'document' hatasını önlemek için, bileşenin yalnızca
// tarayıcıda (istemci tarafında) render edilip edilmediğini kontrol et.
const isBrowser = typeof window !== 'undefined';
import { Image as ImageIcon, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Edit({ auth, destination }) {
    const [isMediaManagerOpen, setIsMediaManagerOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        slug: '',
        summary: '',
        description: '',
        image_id: null,
        is_popular: false,
        meta_title: '',
        meta_description: '',
    });

    // Destinasyon prop'u değiştiğinde veya sayfa ilk yüklendiğinde formu doldur
    useEffect(() => {
        if (destination) {
            setData({
                name: destination.name,
                slug: destination.slug,
                summary: destination.summary || '',
                description: destination.description,
                image_id: destination.image_id || null,
                is_popular: destination.is_popular || false,
                meta_title: destination.meta_title || '',
                meta_description: destination.meta_description || '',
            });
            setSelectedImage(destination.image || null);
        } else {
            // Yeni destinasyon oluşturuluyorsa formu temizle
            reset();
            setSelectedImage(null);
        }
    }, [destination]);

    // Hataları toast olarak göster
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast({
                title: "Hata",
                description: "Lütfen tüm alanları kontrol edin.",
                variant: "destructive",
            });
        }
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (destination) {
            // Mevcut destinasyonu güncelle
            put(route('admin.destinations.update', destination.id), {
                onSuccess: () => {
                    toast({
                        title: "Başarılı",
                        description: "Destinasyon başarıyla güncellendi.",
                    });
                },
                onError: (err) => {
                    console.error('Destinasyon güncelleme hatası:', err);
                }
            });
        } else {
            // Yeni destinasyon oluştur
            post(route('admin.destinations.store'), {
                onSuccess: () => {
                    toast({
                        title: "Başarılı",
                        description: "Destinasyon başarıyla eklendi.",
                    });
                    // Yönlendirme gerekiyorsa, örneğin listeleme sayfasına
                    window.location.href = route('admin.destinations.index');
                },
                onError: (err) => {
                    console.error('Destinasyon ekleme hatası:', err);
                }
            });
        }
    };

    const handleMediaSelect = (media) => {
        setSelectedImage(media);
        setData('image_id', media.id);
        setIsMediaManagerOpen(false);
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setData('image_id', null);
    };

    return (
        <AdminLayout
            user={auth.user}
            header={destination ? 'Destinasyon Düzenle' : 'Yeni Destinasyon Ekle'}
            actionButton={
                <Link href={route('admin.destinations.index')}>
                    <Button variant="outline">Geri Dön</Button>
                </Link>
            }
        >
            <Head title={destination ? 'Destinasyon Düzenle' : 'Yeni Destinasyon Ekle'} />

            <div className="max-w-4xl mx-auto">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>{destination ? 'Destinasyon Bilgilerini Düzenle' : 'Yeni Destinasyon Oluştur'}</CardTitle>
                            <CardDescription>
                                {destination ? 'Destinasyonunuzun detaylarını güncelleyin.' : 'Yeni bir destinasyon oluşturmak için gerekli bilgileri girin.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Tabs defaultValue="general">
                                    <TabsList>
                                        <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
                                        <TabsTrigger value="seo">SEO Ayarları</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="general" className="space-y-6 pt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="md:col-span-2 space-y-4">
                                                <div>
                                                    <Label htmlFor="name">Destinasyon Adı</Label>
                                                    <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full" disabled={processing} />
                                                    <InputError message={errors.name} className="mt-2" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="slug">Slug</Label>
                                                    <Input id="slug" type="text" value={data.slug} onChange={(e) => setData('slug', e.target.value)} className="mt-1 block w-full" disabled={processing} />
                                                    <InputError message={errors.slug} className="mt-2" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="summary">Özet</Label>
                                                    <Textarea id="summary" value={data.summary} onChange={(e) => setData('summary', e.target.value)} className="mt-1 block w-full" rows={2} />
                                                    <InputError message={errors.summary} className="mt-2" />
                                                </div>
                                            </div>
                                            <div className="md:col-span-1">
                                                <Label>Öne Çıkan Görsel</Label>
                                                <div className="mt-1 border rounded-md p-4 flex flex-col items-center justify-center space-y-4">
                                                    {selectedImage ? (
                                                        <div className="relative w-40 h-40 rounded-md overflow-hidden">
                                                            <img src={selectedImage.thumbnail_url} alt="Öne Çıkan Görsel" className="w-full h-full object-cover" />
                                                            <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 rounded-full" onClick={handleRemoveImage}>
                                                                <XCircle className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className="text-gray-500 flex flex-col items-center justify-center w-40 h-40 bg-muted rounded-md">
                                                            <ImageIcon className="h-12 w-12 text-gray-400" />
                                                            <span className="mt-2 text-sm">Görsel Seç</span>
                                                        </div>
                                                    )}
                                                    <Button type="button" variant="outline" className="w-full" onClick={() => setIsMediaManagerOpen(true)}>
                                                        {selectedImage ? 'Değiştir' : 'Görsel Seç'}
                                                    </Button>
                                                </div>
                                                <InputError message={errors.image_id} className="mt-2" />
                                            </div>
                                            <div className="md:col-span-3">
                                                <Label htmlFor="description">Açıklama</Label>
                                                {isBrowser && (
                                                    <Suspense fallback={<div>Yükleniyor...</div>}>
                                                        <RichTextEditor
                                                            id="description"
                                                            value={data.description}
                                                            onChange={(content) => setData('description', content)}
                                                            placeholder="Destinasyon hakkında detaylı bilgi girin..."
                                                            className="mt-1 block w-full"
                                                        />
                                                    </Suspense>
                                                )}
                                                <InputError message={errors.description} className="mt-2" />
                                            </div>
                                            <div className="md:col-span-3 flex items-center space-x-2">
                                                <Checkbox id="is_popular" checked={data.is_popular} onCheckedChange={(checked) => setData('is_popular', checked)} />
                                                <Label htmlFor="is_popular">Popüler olarak işaretle</Label>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="seo" className="space-y-6 pt-4">
                                        <h3 className="text-lg font-semibold">SEO Ayarları</h3>
                                        <p className="text-sm text-muted-foreground mb-4">Bu destinasyona özel SEO başlığı ve açıklaması girin. Boş bırakılırsa genel ayarlardaki şablonlar kullanılır.</p>
                                        <div>
                                            <Label htmlFor="meta_title">Meta Başlık</Label>
                                            <Input id="meta_title" type="text" value={data.meta_title || ''} onChange={(e) => setData('meta_title', e.target.value)} className="mt-1 block w-full" placeholder="Genel şablon kullanılacak" />
                                            <InputError className="mt-2" message={errors.meta_title} />
                                        </div>
                                        <div>
                                            <Label htmlFor="meta_description">Meta Açıklama</Label>
                                            <Textarea id="meta_description" value={data.meta_description || ''} onChange={(e) => setData('meta_description', e.target.value)} className="mt-1 block w-full" rows={3} placeholder="Genel şablon kullanılacak" />
                                            <InputError className="mt-2" message={errors.meta_description} />
                                        </div>
                                    </TabsContent>
                                </Tabs>
                                <div className="mt-6">
                                    <Button type="submit" disabled={processing}>
                                        {destination ? 'Güncelle' : 'Oluştur'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <MediaManagerModal
                isOpen={isMediaManagerOpen}
                onClose={() => setIsMediaManagerOpen(false)}
                onMediaSelect={handleMediaSelect}
                initialSelectedMedia={selectedImage}
            />
        </AdminLayout>
    );
}
