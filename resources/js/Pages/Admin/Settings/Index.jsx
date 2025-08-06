import React, { useState, useCallback } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from "@/Components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion"
import { RefreshCw } from 'lucide-react';


export default function Index({ auth, settings }) {
    const { data, setData, post, processing, errors } = useForm({
        settings: {
            'cache.enabled': settings['cache.enabled'] === '1', // String '1'/'0' değerini boolean'a çevir.
            'seo.defaults.title': settings['seo.defaults.title'] || '',
            'seo.defaults.description': settings['seo.defaults.description'] || '',
            'seo.tours.index.title': settings['seo.tours.index.title'] || '',
            'seo.tours.index.description': settings['seo.tours.index.description'] || '',
            'seo.tour.show.title': settings['seo.tour.show.title'] || '',
            'seo.tour.show.description': settings['seo.tour.show.description'] || '',
            'seo.contents.index.title': settings['seo.contents.index.title'] || '',
            'seo.contents.index.description': settings['seo.contents.index.description'] || '',
            'seo.content.show.title': settings['seo.content.show.title'] || '',
            'seo.content.show.description': settings['seo.content.show.description'] || '',
            'seo.destinations.index.title': settings['seo.destinations.index.title'] || '',
            'seo.destinations.index.description': settings['seo.destinations.index.description'] || '',
            'seo.destination.show.title': settings['seo.destination.show.title'] || '',
            'seo.destination.show.description': settings['seo.destination.show.description'] || '',
        }
    });

    const { toast } = useToast();
    const [cachedPages, setCachedPages] = useState([]);
    const [isLoadingCache, setIsLoadingCache] = useState(false);

    const fetchCachedPages = useCallback(async () => {
        setIsLoadingCache(true);
        try {
            const response = await fetch(route('admin.settings.cache.list'));
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCachedPages(data);
        } catch (error) {
            console.error("Failed to fetch cached pages:", error);
            toast({
                title: "Hata!",
                description: "Önbelleğe alınmış sayfalar getirilirken bir hata oluştu.",
                variant: "destructive",
            });
            setCachedPages([]); // Hata durumunda listeyi temizle
        } finally {
            setIsLoadingCache(false);
        }
    }, [toast]);


    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.store'), {
            onSuccess: () => {
                toast({
                    title: "Başarılı!",
                    description: "Ayarlar başarıyla kaydedildi.",
                    className: 'bg-green-600 text-white border-green-600',
                });
            },
            onError: () => {
                toast({
                    title: "Hata!",
                    description: "Ayarlar kaydedilirken bir hata oluştu.",
                    variant: "destructive",
                });
            }
        });
    };

    const handleClearCache = () => {
        router.post(route('admin.settings.cache.clear'), {}, {
            preserveState: true,
            onSuccess: () => {
                toast({
                    title: "Başarılı!",
                    description: "Tüm uygulama önbelleği başarıyla temizlendi.",
                    className: 'bg-green-600 text-white border-green-600',
                });
            },
            onError: (errors) => {
                 console.error(errors);
                toast({
                    title: "Hata!",
                    description: "Önbellek temizlenirken bir hata oluştu. Lütfen konsolu kontrol edin.",
                    variant: "destructive",
                });
            }
        });
    };

    const handleInputChange = (key, value) => {
        setData('settings', { ...data.settings, [key]: value });
    };

    const handleSwitchChange = (checked) => {
        setData('settings', { ...data.settings, 'cache.enabled': checked });
    };

    const renderSettingInput = (key, label, isTextarea = false) => (
        <div key={key}>
            <Label htmlFor={key}>{label}</Label>
            {isTextarea ? (
                <Textarea
                    id={key}
                    value={data.settings[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="mt-1 block w-full"
                    rows={3}
                />
            ) : (
                <Input
                    id={key}
                    type="text"
                    value={data.settings[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="mt-1 block w-full"
                />
            )}
        </div>
    );

    return (
        <AdminLayout
            user={auth.user}
            header="Genel Ayarlar"
            actionButton={<Button onClick={submit} disabled={processing}>Ayarları Kaydet</Button>}
        >
            <Head title="Genel Ayarlar" />

            <form onSubmit={submit}>
                <Tabs defaultValue="seo" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="seo">SEO Ayarları</TabsTrigger>
                        <TabsTrigger value="cache">Önbellek Ayarları</TabsTrigger>
                    </TabsList>

                    {/* SEO Ayarları Sekmesi */}
                    <TabsContent value="seo">
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>SEO Ayarları</CardTitle>
                                <CardDescription>
                                    Arama motoru optimizasyonu için varsayılan ve sayfaya özel başlık ve açıklama ayarları.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-4">
                                {/* Genel SEO Ayarları */}
                                <div className="space-y-4 rounded-md border p-4 shadow-sm">
                                    <h3 className="text-md font-medium">Genel SEO Ayarları</h3>
                                    {renderSettingInput('seo.defaults.title', 'Site Başlığı')}
                                    {renderSettingInput('seo.defaults.description', 'Site Açıklaması', true)}
                                </div>

                                {/* Tur Sayfaları */}
                                <div className="space-y-4 rounded-md border p-4 shadow-sm">
                                    <h3 className="text-md font-medium">Tur Sayfaları</h3>
                                    <p className="text-sm text-muted-foreground">Değişkenler: {`{site_title}`}, {`{tour_title}`}, {`{tour_summary}`}</p>
                                    {renderSettingInput('seo.tours.index.title', 'Tur Listeleme Sayfası Başlığı')}
                                    {renderSettingInput('seo.tours.index.description', 'Tur Listeleme Sayfası Açıklaması', true)}
                                    {renderSettingInput('seo.tour.show.title', 'Tur Detay Sayfası Başlığı')}
                                    {renderSettingInput('seo.tour.show.description', 'Tur Detay Sayfası Açıklaması', true)}
                                </div>

                                {/* İçerik Sayfaları */}
                                <div className="space-y-4 rounded-md border p-4 shadow-sm">
                                    <h3 className="text-md font-medium">İçerik Sayfaları</h3>
                                    <p className="text-sm text-muted-foreground">Değişkenler: {`{site_title}`}, {`{content_title}`}, {`{content_summary}`}</p>
                                    {renderSettingInput('seo.contents.index.title', 'İçerik Listeleme Sayfası Başlığı')}
                                    {renderSettingInput('seo.contents.index.description', 'İçerik Listeleme Sayfası Açıklaması', true)}
                                    {renderSettingInput('seo.content.show.title', 'İçerik Detay Sayfası Başlığı')}
                                    {renderSettingInput('seo.content.show.description', 'İçerik Detay Sayfası Açıklaması', true)}
                                </div>

                                {/* Destinasyon Sayfaları */}
                                <div className="space-y-4 rounded-md border p-4 shadow-sm">
                                    <h3 className="text-md font-medium">Destinasyon Sayfaları</h3>
                                    <p className="text-sm text-muted-foreground">Değişkenler: {`{site_title}`}, {`{destination_name}`}, {`{destination_description}`}</p>
                                    {renderSettingInput('seo.destinations.index.title', 'Destinasyon Listeleme Sayfası Başlığı')}
                                    {renderSettingInput('seo.destinations.index.description', 'Destinasyon Listeleme Sayfası Açıklaması', true)}
                                    {renderSettingInput('seo.destination.show.title', 'Destinasyon Detay Sayfası Başlığı')}
                                    {renderSettingInput('seo.destination.show.description', 'Destinasyon Detay Sayfası Açıklaması', true)}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Önbellek Ayarları Sekmesi */}
                    <TabsContent value="cache">
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>Önbellek Ayarları</CardTitle>
                                <CardDescription>
                                    Sitenin performansını yönetmek için önbellek ayarlarını yapılandırın ve yönetin.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-4">
                                {/* Otomatik Önbellek Ayarları */}
                                <div className="space-y-4 rounded-md border p-4 shadow-sm">
                                    <h3 className="text-md font-medium">Otomatik Önbellekleme</h3>
                                    <div className="flex items-center space-x-3 pt-2">
                                        <Switch
                                            id="cache-enabled"
                                            checked={data.settings['cache.enabled']}
                                            onCheckedChange={handleSwitchChange}
                                        />
                                        <div className="space-y-1">
                                            <Label htmlFor="cache-enabled" className="text-base">Site Geneli Önbellekleme</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Aktif olduğunda, sitenin sayfaları performansı artırmak için 24 saat boyunca önbelleğe alınır.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Manuel Önbellek Yönetimi */}
                                <div className="space-y-4 rounded-md border p-4 shadow-sm">
                                    <h3 className="text-md font-medium">Manuel Önbellek Yönetimi</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Sitede yapılan içerik veya ayar değişikliklerinin anında görünür olması için önbelleği temizleyin.
                                    </p>
                                    <Button
                                        type="button"
                                        onClick={handleClearCache}
                                        variant="destructive"
                                        disabled={processing}
                                        className="clear-cache-button mt-2"
                                    >
                                        Tüm Site Önbelleğini Temizle
                                    </Button>

                                    <Accordion type="single" collapsible className="w-full mt-4">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger onClick={() => !cachedPages.length && fetchCachedPages()}>
                                                <div className="flex items-center gap-2">
                                                    Önbelleğe Alınmış Sayfaları Görüntüle ({cachedPages.length})
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Akordiyonun açılıp/kapanmasını engelle
                                                            fetchCachedPages();
                                                        }}
                                                        disabled={isLoadingCache}
                                                        className="h-6 w-6"
                                                    >
                                                        <RefreshCw className={`h-4 w-4 ${isLoadingCache ? 'animate-spin' : ''}`} />
                                                    </Button>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {isLoadingCache ? (
                                                    <p className="text-sm text-muted-foreground p-4">Yükleniyor...</p>
                                                ) : cachedPages.length > 0 ? (
                                                    <div className="max-h-60 overflow-y-auto">
                                                        <ul className="space-y-2 p-2">
                                                            {cachedPages.map((page, index) => (
                                                                <li key={index} className="text-sm p-2 rounded-md bg-muted/50">
                                                                    <p className="font-mono text-xs break-all">{page.url}</p>
                                                                    <p className="text-xs text-muted-foreground mt-1">
                                                                        Son Değişiklik: {page.modified_at} | Boyut: {page.size}
                                                                    </p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground p-4">
                                                        Görüntülenecek önbelleğe alınmış sayfa bulunamadı.
                                                    </p>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </form>
        </AdminLayout>
    );
}
