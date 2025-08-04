import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Seo({ auth, settings }) {
    const { data, setData, post, processing, errors } = useForm({
        settings: {
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

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.seo.store'), {
            onSuccess: () => {
                toast({
                    title: "Başarılı!",
                    description: "SEO ayarları başarıyla kaydedildi.",
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

    const handleInputChange = (key, value) => {
        setData('settings', { ...data.settings, [key]: value });
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
        <AuthenticatedLayout
            user={auth.user}
            header="SEO Ayarları"
            actionButton={<Button onClick={submit} disabled={processing}>Ayarları Kaydet</Button>}
        >
            <Head title="SEO Ayarları" />

            <form onSubmit={submit}>
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Genel SEO Ayarları</CardTitle>
                            <CardDescription>Sitenin varsayılan başlık ve açıklama ayarları.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {renderSettingInput('seo.defaults.title', 'Site Başlığı')}
                            {renderSettingInput('seo.defaults.description', 'Site Açıklaması', true)}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tur Sayfaları</CardTitle>
                            <CardDescription>Değişkenler: {`{site_title}`}, {`{tour_title}`}, {`{tour_summary}`}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {renderSettingInput('seo.tours.index.title', 'Tur Listeleme Sayfası Başlığı')}
                            {renderSettingInput('seo.tours.index.description', 'Tur Listeleme Sayfası Açıklaması', true)}
                            {renderSettingInput('seo.tour.show.title', 'Tur Detay Sayfası Başlığı')}
                            {renderSettingInput('seo.tour.show.description', 'Tur Detay Sayfası Açıklaması', true)}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>İçerik Sayfaları</CardTitle>
                            <CardDescription>Değişkenler: {`{site_title}`}, {`{content_title}`}, {`{content_summary}`}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {renderSettingInput('seo.contents.index.title', 'İçerik Listeleme Sayfası Başlığı')}
                            {renderSettingInput('seo.contents.index.description', 'İçerik Listeleme Sayfası Açıklaması', true)}
                            {renderSettingInput('seo.content.show.title', 'İçerik Detay Sayfası Başlığı')}
                            {renderSettingInput('seo.content.show.description', 'İçerik Detay Sayfası Açıklaması', true)}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Destinasyon Sayfaları</CardTitle>
                            <CardDescription>Değişkenler: {`{site_title}`}, {`{destination_name}`}, {`{destination_description}`}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {renderSettingInput('seo.destinations.index.title', 'Destinasyon Listeleme Sayfası Başlığı')}
                            {renderSettingInput('seo.destinations.index.description', 'Destinasyon Listeleme Sayfası Açıklaması', true)}
                            {renderSettingInput('seo.destination.show.title', 'Destinasyon Detay Sayfası Başlığı')}
                            {renderSettingInput('seo.destination.show.description', 'Destinasyon Detay Sayfası Açıklaması', true)}
                        </CardContent>
                    </Card>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
