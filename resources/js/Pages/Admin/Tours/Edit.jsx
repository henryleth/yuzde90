import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useToast } from '@/hooks/use-toast';

// Shadcn UI Components
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Checkbox } from '@/Components/ui/checkbox';
import { Separator } from '@/Components/ui/separator';
import { Card, CardContent, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { Trash2, PlusCircle, ImageIcon as IconImageIcon, Menu, Lightbulb } from 'lucide-react';

import MediaManagerModal from '@/Components/MediaManagerModal';

// RichTextEditor'ı yalnızca istemci tarafında yüklenecek şekilde dinamik olarak içe aktar.
// Bu, SSR sırasında 'document is not defined' hatasını önler.
const RichTextEditor = lazy(() => import('@/Components/RichTextEditor'));

// SSR sırasında 'document' hatasını önlemek için, bileşenin yalnızca
// tarayıcıda (istemci tarafında) render edilip edilmediğini kontrol et.
const isBrowser = typeof window !== 'undefined';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import MultiSelect from '@/Components/ui/multi-select';
import InputError from '@/Components/InputError';

// Başlangıç fiyatlandırma verisini dolduran ve mevcut verilerle birleştiren yardımcı fonksiyon
const initializePricingTiers = (seasons, categories, existingTiers = []) => {
    let tiers = [];
    // `seasons` artık bir nesne olduğu için, anahtarları üzerinde döngü kuruyoruz.
    Object.keys(seasons).forEach(season => {
        categories.forEach(category => {
            const existingTier = existingTiers.find(t => t.season_name === season && t.category_name === category);
            if (existingTier) {
                tiers.push(existingTier);
            } else {
                tiers.push({
                    id: `temp-tier-${Date.now()}-${season}-${category}`,
                    season_name: season,
                    category_name: category,
                    price_per_person_1: null,
                    price_per_person_2: null,
                    price_per_person_3: null,
                });
            }
        });
    });
    return tiers;
};

export default function Edit({ auth, tour, destinations, optionalActivities, media_files, config_seasons, config_categories }) {
    const { toast } = useToast();

    const { data, setData, put, processing, errors } = useForm({
        title: tour.title || '',
        slug: tour.slug || '',
        summary: tour.summary || '',
        description: tour.description || '',
        is_popular: tour.is_popular || false,
        duration_days: tour.duration_days || 0,
        duration_nights: tour.duration_nights || 0,
        language: tour.language || 'Türkçe',
        min_participants: tour.min_participants || 0,
        max_participants: tour.max_participants || 0,
        rating: tour.rating || 0,
        reviews_count: tour.reviews_count || 0,
        is_published: tour.is_published || false,
        inclusions_html: tour.inclusions_html || '',
        exclusions_html: tour.exclusions_html || '',
        hotels: typeof tour.hotels === 'string' ? JSON.parse(tour.hotels) : tour.hotels || {},
        destinations: tour.destinations ? tour.destinations.map(d => d.id) : [],
        featured_media_id: tour.featured_media?.id || null,
        gallery_media_ids: Array.isArray(tour.gallery_media_ids) ? tour.gallery_media_ids : [],
        daily_program: (tour.tour_days || []).map(day => ({ ...day, activities: day.day_activities || [] })),
        pricing_tiers: initializePricingTiers(config_seasons, config_categories, tour.pricing_tiers || []),
        optional_activity_ids: tour.optional_activities ? tour.optional_activities.map(oa => oa.id) : [],
        meta_title: tour.meta_title || '',
        meta_description: tour.meta_description || '',
    });

    const [selectedFeaturedMedia, setSelectedFeaturedMedia] = useState(tour.featured_media || null);
    const [selectedGalleryMedia, setSelectedGalleryMedia] = useState(Array.isArray(tour.gallery_images_urls) ? tour.gallery_images_urls : []);
    const [activeTab, setActiveTab] = useState('general-info');
    
    // Otel yönetimi için state'ler
    const [currentHotels, setCurrentHotels] = useState(typeof tour.hotels === 'string' ? JSON.parse(tour.hotels) : tour.hotels || {});
    const [editingCity, setEditingCity] = useState(null);
    const [tempCityName, setTempCityName] = useState('');
    const [editingCategory, setEditingCategory] = useState({ city: null, category: null });
    const [tempCategoryName, setTempCategoryName] = useState('');

    const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(true);

    const generateSlug = (text) => {
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g')
    
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(p, c => b.charAt(a.indexOf(c)))
            .replace(/&/g, '-and-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '')
    }

    const submit = (e) => {
        e.preventDefault();
        const dataToSubmit = { ...data };
        put(route('admin.tours.update', tour.id), {
            data: dataToSubmit,
            onError: (errors) => {
                let errorMessages = Object.values(errors).flat();
                toast({
                    title: "Tur güncellenemedi.",
                    description: errorMessages.join('\n') || "Bilinmeyen bir hata oluştu.",
                    variant: "destructive",
                });
            },
            onSuccess: () => {
                toast({
                    title: "Tur başarıyla güncellendi!",
                    description: "Değişiklikler kaydedildi.",
                });
            },
        });
    };

    const destinationOptions = destinations.map(dest => ({ value: dest.id, label: dest.name }));
    const optionalActivityOptions = optionalActivities.map(activity => ({ value: activity.id, label: activity.name }));
    
    const handleDestinationSelect = (destinationId) => {
        setData(prevData => {
            const currentDestinations = prevData.destinations || [];
            const isSelected = currentDestinations.includes(destinationId);
            return { ...prevData, destinations: isSelected ? currentDestinations.filter(id => id !== destinationId) : [...currentDestinations, destinationId] };
        });
    };

    const handleOptionalActivitySelect = (activityId) => {
        setData(prevData => {
            const currentActivities = prevData.optional_activity_ids || [];
            const isSelected = currentActivities.includes(activityId);
            return { ...prevData, optional_activity_ids: isSelected ? currentActivities.filter(id => id !== activityId) : [...currentActivities, activityId] };
        });
    };

    const addCityToHotels = (cityName) => {
        if (cityName && !currentHotels[cityName]) setCurrentHotels(prev => ({ ...prev, [cityName]: {} }));
    };

    const handleCityNameChange = (oldCityName, newCityName) => {
        if (oldCityName === newCityName || !newCityName) return;
        setCurrentHotels(prev => {
            const newHotels = {};
            Object.keys(prev).forEach(key => { newHotels[key === oldCityName ? newCityName : key] = prev[key]; });
            return newHotels;
        });
    };

    const addCategoryToCity = (cityName, categoryName) => {
        if (cityName && categoryName && !currentHotels[cityName]?.[categoryName]) {
            setCurrentHotels(prev => ({ ...prev, [cityName]: { ...prev[cityName], [categoryName]: [] } }));
        }
    };

    const handleCategoryNameChange = (cityName, oldCategoryName, newCategoryName) => {
        if (oldCategoryName === newCategoryName || !newCategoryName) return;
        setCurrentHotels(prev => {
            const newHotels = { ...prev };
            if (newHotels[cityName]) {
                const newCategories = {};
                Object.keys(newHotels[cityName]).forEach(categoryKey => { newCategories[categoryKey === oldCategoryName ? newCategoryName : categoryKey] = newHotels[cityName][categoryKey]; });
                newHotels[cityName] = newCategories;
            }
            return newHotels;
        });
    };

    const addHotelToCategory = (cityName, categoryName, hotelName) => {
        if (cityName && categoryName && hotelName) {
            // Virgülle ayrılmış otelleri ayır ve her birini ayrı kayıt olarak ekle
            const hotelNames = hotelName.split(',').map(name => name.trim()).filter(name => name);
            
            setCurrentHotels(prev => {
                const newHotels = hotelNames.map(name => ({ name }));
                return {
                    ...prev,
                    [cityName]: {
                        ...prev[cityName],
                        [categoryName]: [...(prev[cityName]?.[categoryName] || []), ...newHotels]
                    }
                };
            });
        }
    };

    const removeHotelFromCategory = (cityName, categoryName, indexToRemove) => {
        setCurrentHotels(prev => ({ ...prev, [cityName]: { ...prev[cityName], [categoryName]: (prev[cityName]?.[categoryName] || []).filter((_, index) => index !== indexToRemove) } }));
    };

    const removeCategoryFromCity = (cityName, categoryName) => {
        setCurrentHotels(prev => {
            const newCities = { ...prev };
            if (newCities[cityName]) {
                delete newCities[cityName][categoryName];
                if (Object.keys(newCities[cityName]).length === 0) delete newCities[cityName];
            }
            return newCities;
        });
    };

    const removeCityFromHotels = (cityName) => {
        setCurrentHotels(prev => {
            const { [cityName]: _, ...restCities } = prev;
            return restCities;
        });
    };

    useEffect(() => { setData('hotels', currentHotels); }, [currentHotels]);

    const addDay = () => {
        setData(prevData => {
            const newDayNumber = prevData.daily_program.length > 0 ? Math.max(...prevData.daily_program.map(d => d.day_number)) + 1 : 1;
            return { ...prevData, daily_program: [...prevData.daily_program, { id: `temp-day-${Date.now()}`, day_number: newDayNumber, title: `Yeni Gün`, activities: [] }] };
        });
    };

    const removeDay = (idToRemove) => {
        setData(prevData => ({ ...prevData, daily_program: prevData.daily_program.filter(day => day.id !== idToRemove) }));
    };

    const handleDayTitleChange = (idToUpdate, newTitle) => {
        setData(prevData => ({ ...prevData, daily_program: prevData.daily_program.map(day => day.id === idToUpdate ? { ...day, title: newTitle } : day) }));
    };

    const addActivity = (dayId) => {
        setData(prevData => ({ ...prevData, daily_program: prevData.daily_program.map(day => {
            if (day.id === dayId) {
                const newOrder = day.activities.length > 0 ? Math.max(...day.activities.map(a => a.order)) + 1 : 0;
                return { ...day, activities: [...day.activities, { id: `temp-activity-${Date.now()}`, description: '', is_highlight: false, order: newOrder }] };
                }
                return day;
        })}));
    };

    const removeActivity = (dayId, activityIdToRemove) => {
        setData(prevData => ({ ...prevData, daily_program: prevData.daily_program.map(day => {
            if (day.id === dayId) return { ...day, activities: day.activities.filter(activity => activity.id !== activityIdToRemove) };
                return day;
        })}));
    };

    const handleActivityChange = (dayId, activityIdToUpdate, field, value) => {
        setData(prevData => ({ ...prevData, daily_program: prevData.daily_program.map(day => {
            if (day.id === dayId) return { ...day, activities: day.activities.map(activity => activity.id === activityIdToUpdate ? { ...activity, [field]: value } : activity) };
                return day;
        })}));
    };

    const onDayDragEnd = (result) => {
        if (!result.destination) return;
        setData(prevData => {
            const reorderedDays = Array.from(prevData.daily_program);
            const [removed] = reorderedDays.splice(result.source.index, 1);
            reorderedDays.splice(result.destination.index, 0, removed);
            const finalReorderedDays = reorderedDays.map((day, index) => ({ ...day, day_number: index + 1, activities: day.activities.map((activity, activityIndex) => ({ ...activity, order: activityIndex })) }));
            return { ...prevData, daily_program: finalReorderedDays };
        });
    };

    const onActivityDragEnd = (result) => {
        if (!result.destination || result.source.droppableId !== result.destination.droppableId) return;
        const dayId = result.source.droppableId.replace('activities-', '');
        setData(prevData => ({ ...prevData, daily_program: prevData.daily_program.map(day => {
            if (String(day.id) === dayId) {
                    const reorderedActivities = Array.from(day.activities);
                    const [removed] = reorderedActivities.splice(result.source.index, 1);
                    reorderedActivities.splice(result.destination.index, 0, removed);
                const finalReorderedActivities = reorderedActivities.map((activity, index) => ({ ...activity, order: index }));
                    return { ...day, activities: finalReorderedActivities };
                }
                return day;
        })}));
    };

    const handleFeaturedMediaSelect = (media) => {
        if (!media) {
            setSelectedFeaturedMedia(null);
            setData(prevData => ({ ...prevData, featured_media_id: null }));
        } else {
        setSelectedFeaturedMedia(media);
            setData(prevData => ({ ...prevData, featured_media_id: media.id }));
        }
    };

    const handleGalleryMediaSelect = (mediaItems) => {
        setSelectedGalleryMedia(mediaItems);
        setData('gallery_media_ids', mediaItems.map(item => item.id));
    };

    const removeGalleryMedia = (idToRemove) => {
        const updatedMedia = selectedGalleryMedia.filter(item => item.id !== idToRemove);
        setSelectedGalleryMedia(updatedMedia);
        setData('gallery_media_ids', updatedMedia.map(item => item.id));
    };

    const onGalleryDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedMedia = Array.from(selectedGalleryMedia);
        const [removed] = reorderedMedia.splice(result.source.index, 1);
        reorderedMedia.splice(result.destination.index, 0, removed);
        setSelectedGalleryMedia(reorderedMedia);
        setData('gallery_media_ids', reorderedMedia.map(item => item.id));
    };

    const handleMatrixPriceChange = (seasonName, categoryName, priceType, value) => {
        setData('pricing_tiers', data.pricing_tiers.map(tier => {
            if (tier.season_name === seasonName && tier.category_name === categoryName) {
                return { ...tier, [priceType]: parseFloat(value) || null };
                }
                return tier;
        }));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={`Turu Düzenle: ${tour.title}`}
        >
            <Head title={`Tur Düzenle: ${tour.title}`} />
            <div>
                <Card className="bg-white shadow-sm sm:rounded-lg px-10 py-10">
                    <CardContent className="px-0 pb-0">
                        <form onSubmit={submit} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>
                            <Tabs defaultValue="general-info" onValueChange={setActiveTab}>
                                <TabsList className="flex flex-wrap border-b h-auto p-0 bg-white rounded-t-lg overflow-x-auto justify-start">
                                    <TabsTrigger value="general-info" className="px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap">Genel Bilgiler</TabsTrigger>
                                    <TabsTrigger value="hotels" className="px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap">Oteller</TabsTrigger>
                                    <TabsTrigger value="media" className="px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap">Görseller</TabsTrigger>
                                    <TabsTrigger value="daily-program" className="px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap">Günlük Program</TabsTrigger>
                                    <TabsTrigger value="pricing" className="px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap">Fiyatlandırma</TabsTrigger>
                                    <TabsTrigger value="optional-activities" className="px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap">Opsiyonel Aktiviteler</TabsTrigger>
                                    <TabsTrigger value="seo" className="px-4 py-3 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:text-muted-foreground whitespace-nowrap">SEO Ayarları</TabsTrigger>
                                </TabsList>

                                <TabsContent value="general-info" className="space-y-6 pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="title">Tur Adı</Label>
                                            <Input 
                                                id="title" 
                                                type="text" 
                                                name="title" 
                                                value={data.title} 
                                                className="mt-1 block w-full" 
                                                onChange={(e) => {
                                                    const newTitle = e.target.value;
                                                    setData('title', newTitle);
                                                    if (!isSlugManuallyEdited) {
                                                        setData('slug', generateSlug(newTitle));
                                                    }
                                                }}
                                                required 
                                            />
                                            <InputError className="mt-2" message={errors.title} />
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
                                        <Label htmlFor="summary">Kısa Özet</Label>
                                        <Textarea id="summary" name="summary" value={data.summary} className="mt-1 block w-full" onChange={(e) => setData('summary', e.target.value)} rows="3" />
                                        <InputError className="mt-2" message={errors.summary} />
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="description">Açıklama</Label>
                                            {isBrowser && (
                                                <Suspense fallback={<div>Yükleniyor...</div>}>
                                                    <RichTextEditor value={data.description} onChange={(value) => setData('description', value)} className="mt-1 block w-full min-h-[200px]" />
                                                </Suspense>
                                            )}
                                            <InputError message={errors.description} className="mt-2" />
                                        </div>
                                        <div>
                                            <Label htmlFor="inclusions_html">Dahil Olanlar</Label>
                                            {isBrowser && (
                                                <Suspense fallback={<div>Yükleniyor...</div>}>
                                                    <RichTextEditor value={data.inclusions_html} onChange={(value) => setData('inclusions_html', value)} className="mt-1 block w-full min-h-[150px]" />
                                                </Suspense>
                                            )}
                                            <InputError message={errors.inclusions_html} className="mt-2" />
                                        </div>
                                        <div>
                                            <Label htmlFor="exclusions_html">Dahil Olmayanlar</Label>
                                            {isBrowser && (
                                                <Suspense fallback={<div>Yükleniyor...</div>}>
                                                    <RichTextEditor value={data.exclusions_html} onChange={(value) => setData('exclusions_html', value)} className="mt-1 block w-full min-h-[150px]" />
                                                </Suspense>
                                            )}
                                            <InputError message={errors.exclusions_html} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div>
                                            <Label htmlFor="language">Dil</Label>
                                            <Input id="language" type="text" name="language" value={data.language} className="mt-1 block w-full" onChange={(e) => setData('language', e.target.value)} required />
                                            <InputError className="mt-2" message={errors.language} />
                                        </div>
                                        <div>
                                            <Label htmlFor="duration_days">Gün Sayısı</Label>
                                            <Input id="duration_days" type="number" name="duration_days" value={data.duration_days} className="mt-1 block w-full" onChange={(e) => setData('duration_days', parseInt(e.target.value))} required />
                                            <InputError className="mt-2" message={errors.duration_days} />
                                        </div>
                                        <div>
                                            <Label htmlFor="duration_nights">Gece Sayısı</Label>
                                            <Input id="duration_nights" type="number" name="duration_nights" value={data.duration_nights} className="mt-1 block w-full" onChange={(e) => setData('duration_nights', parseInt(e.target.value))} required />
                                            <InputError className="mt-2" message={errors.duration_nights} />
                                        </div>
                                         <div>
                                            <Label htmlFor="min_participants">Min. Katılımcı</Label>
                                            <Input id="min_participants" type="number" name="min_participants" value={data.min_participants} className="mt-1 block w-full" onChange={(e) => setData('min_participants', parseInt(e.target.value))} />
                                            <InputError className="mt-2" message={errors.min_participants} />
                                        </div>
                                        <div>
                                            <Label htmlFor="max_participants">Maks. Katılımcı</Label>
                                            <Input id="max_participants" type="number" name="max_participants" value={data.max_participants} className="mt-1 block w-full" onChange={(e) => setData('max_participants', parseInt(e.target.value))} />
                                            <InputError className="mt-2" message={errors.max_participants} />
                                        </div>
                                        <div>
                                            <Label htmlFor="rating">Puan (0-5)</Label>
                                            <Input id="rating" type="number" name="rating" value={data.rating} className="mt-1 block w-full" onChange={(e) => setData('rating', parseFloat(e.target.value))} min="0" max="5" step="0.1" />
                                            <InputError className="mt-2" message={errors.rating} />
                                        </div>
                                        <div>
                                            <Label htmlFor="reviews_count">Yorum Sayısı</Label>
                                            <Input id="reviews_count" type="number" name="reviews_count" value={data.reviews_count} className="mt-1 block w-full" onChange={(e) => setData('reviews_count', parseInt(e.target.value))} min="0" />
                                            <InputError className="mt-2" message={errors.reviews_count} />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="destinations">Destinasyonlar</Label>
                                        <MultiSelect options={destinationOptions} selectedValues={data.destinations} onSelect={handleDestinationSelect} placeholder="Destinasyon Seç" />
                                        <InputError className="mt-2" message={errors.destinations} />
                                    </div>
                                    <div className="flex items-center space-x-2 mt-4">
                                        <Checkbox id="is_popular" checked={data.is_popular} onCheckedChange={(checked) => setData('is_popular', checked)} />
                                        <Label htmlFor="is_popular">Popüler Tur</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-4">
                                        <Checkbox id="is_published" checked={data.is_published} onCheckedChange={(checked) => setData('is_published', checked)} />
                                        <Label htmlFor="is_published">Yayınlandı</Label>
                                    </div>
                                </TabsContent>

                                    <TabsContent value="hotels" className="space-y-6 pt-4">
                                    <h3 className="text-lg font-semibold">Otel Bilgileri</h3>
                                    <p className="text-sm text-muted-foreground">Her şehir ve kategori için otel listelerini yönetin.</p>
                                     <Accordion type="multiple" className="w-full space-y-4" defaultValue={Object.keys(currentHotels)}>
                                        {Object.keys(currentHotels).map(cityName => (
                                            <AccordionItem value={cityName} key={cityName} className="border rounded-lg px-4 pt-4">
                                                <AccordionTrigger className="flex items-center justify-between font-bold text-base capitalize hover:no-underline p-0">
                                                     <CardTitle className="capitalize cursor-pointer text-lg font-semibold">{cityName}</CardTitle>
                                                     <div className="ml-auto p-2 rounded-full hover:bg-red-100 text-red-600 cursor-pointer" onClick={(e) => { e.stopPropagation(); removeCityFromHotels(cityName); }}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="pt-3 pb-0">
                                                     <Input type="text" placeholder="Yeni Kategori Ekle (Örn: Deluxe)" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCategoryToCity(cityName, e.target.value); e.target.value = ''; } }} className="w-60 mb-3" />
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                        {(currentHotels[cityName] && Object.keys(currentHotels[cityName]) || []).map(categoryName => (
                                                            <div key={`${cityName}-${categoryName}`} className="border rounded-md p-3">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    {editingCategory.city === cityName && editingCategory.category === categoryName ? (
                                                                        <Input 
                                                                            type="text" 
                                                                            value={tempCategoryName} 
                                                                            onChange={(e) => setTempCategoryName(e.target.value)} 
                                                                            onBlur={() => { 
                                                                                handleCategoryNameChange(cityName, categoryName, tempCategoryName); 
                                                                                setEditingCategory({ city: null, category: null }); 
                                                                            }} 
                                                                            onKeyDown={(e) => { 
                                                                                if (e.key === 'Enter') { 
                                                                                    handleCategoryNameChange(cityName, categoryName, tempCategoryName); 
                                                                                    setEditingCategory({ city: null, category: null }); 
                                                                                } 
                                                                            }} 
                                                                            autoFocus 
                                                                            className="font-semibold text-sm capitalize" 
                                                                        />
                                                                    ) : (
                                                                        <h4 
                                                                            className="font-semibold text-sm capitalize cursor-pointer hover:bg-gray-100 px-2 py-1 rounded" 
                                                                            onClick={() => {
                                                                                setEditingCategory({ city: cityName, category: categoryName });
                                                                                setTempCategoryName(categoryName);
                                                                            }}
                                                                        >
                                                                            {categoryName}
                                                                        </h4>
                                                                    )}
                                                                    <div className="p-1 rounded-full hover:bg-red-100 text-red-600 cursor-pointer" onClick={(e) => { e.stopPropagation(); removeCategoryFromCity(cityName, categoryName); }}>
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-2 mb-3">
                                                                    {(currentHotels[cityName][categoryName] || []).map((hotel, hotelIndex) => (
                                                                        <div key={hotelIndex} className="flex items-center space-x-2">
                                                                             <Input type="text" value={hotel.name} onChange={(e) => {
                                                                                 const newHotels = { ...currentHotels };
                                                                                 newHotels[cityName][categoryName][hotelIndex].name = e.target.value;
                                                                                 setCurrentHotels(newHotels);
                                                                             }} placeholder="Otel Adı" className="flex-1" />
                                                                             <Button variant="destructive" size="icon" onClick={() => removeHotelFromCategory(cityName, categoryName, hotelIndex)}>
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                 <Input type="text" placeholder="Yeni Otel Adı Ekle (virgülle ayırarak çoklu ekleyebilirsiniz)" onKeyDown={(e) => { if (e.key === 'Enter') { addHotelToCategory(cityName, categoryName, e.target.value); e.target.value = ''; } }} className="w-full" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                     <Input type="text" placeholder="Yeni Şehir Ekle (Örn: istanbul)" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCityToHotels(e.target.value.toLowerCase()); e.target.value = ''; } }} className="w-full" />
                                </TabsContent>

                                <TabsContent value="media" className="space-y-6 pt-4">
                                    <h3 className="text-lg font-semibold">Tur Görsel Yönetimi</h3>
                                    <p className="text-sm text-muted-foreground">Öne çıkan görseli ve galeri görsellerini buradan yönetin.</p>
                                    <Separator />

                                    <div className="mt-6">
                                        <Label>Öne Çıkan Görsel</Label>
                                        <div className="mt-2 border rounded-md p-4 flex flex-col items-center justify-center space-y-4">
                                            {selectedFeaturedMedia ? (
                                                 <img src={selectedFeaturedMedia.original_url} alt={selectedFeaturedMedia.name || selectedFeaturedMedia.file_name} className="max-w-full h-48 object-contain rounded-md" />
                                            ) : (
                                                <div className="text-gray-500 flex flex-col items-center">
                                                    <IconImageIcon className="h-12 w-12 text-gray-400" />
                                                    <span className="mt-2">Henüz bir görsel seçilmedi.</span>
                                                </div>
                                            )}
                                             <div className="flex items-center space-x-2">
                                                 <Button type="button" variant="outline" onClick={() => setIsFeaturedModalOpen(true)}>
                                                     <PlusCircle className="mr-2 h-4 w-4" /> 
                                                     {selectedFeaturedMedia ? 'Görseli Değiştir' : 'Görsel Seç'}
                                                </Button>
                                                 {selectedFeaturedMedia && (
                                                     <Button type="button" variant="destructive" onClick={() => handleFeaturedMediaSelect(null)}>
                                                         <Trash2 className="mr-2 h-4 w-4" /> Kaldır
                                                     </Button>
                                                 )}
                                             </div>
                                             <MediaManagerModal isOpen={isFeaturedModalOpen} onClose={() => setIsFeaturedModalOpen(false)} onMediaSelect={(media) => { handleFeaturedMediaSelect(media); setIsFeaturedModalOpen(false); }} initialSelectedMedia={selectedFeaturedMedia} isMultiSelect={false} media={media_files}/>
                                        </div>
                                        <InputError className="mt-2" message={errors.featured_media_id} />
                                    </div>

                                    <div className="mt-6">
                                        <Label>Galeri Görselleri</Label>
                                         <DragDropContext onDragEnd={onGalleryDragEnd}>
                                            <Droppable droppableId="gallery-media" direction="horizontal">
                                                {(provided) => (
                                                     <div {...provided.droppableProps} ref={provided.innerRef} className="mt-2 border rounded-md p-4 flex flex-wrap gap-4 items-start">
                                                        {selectedGalleryMedia.length > 0 ? (
                                                            selectedGalleryMedia.map((media, index) => (
                                                                <Draggable key={media.id} draggableId={media.id.toString()} index={index}>
                                                                    {(provided) => (
                                                                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="relative group w-32 h-32">
                                                                             <img src={media.thumbnail_url} alt={media.name || media.file_name} className="w-full h-full object-cover rounded-md" />
                                                                             <Button variant="destructive" size="icon" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeGalleryMedia(media.id)} >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))
                                                        ) : (
                                                            <div className="text-gray-500 flex flex-col items-center w-full">
                                                                <IconImageIcon className="h-12 w-12 text-gray-400" />
                                                                <span className="mt-2">Henüz galeri görseli seçilmedi.</span>
                                                            </div>
                                                        )}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                         <Button type="button" variant="outline" onClick={() => setIsGalleryModalOpen(true)} className="mt-4">
                                                <PlusCircle className="mr-2 h-4 w-4" /> Galeri Görseli Ekle
                                            </Button>
                                         <MediaManagerModal isOpen={isGalleryModalOpen} onClose={() => setIsGalleryModalOpen(false)} onMediaSelect={(items) => { handleGalleryMediaSelect(items); setIsGalleryModalOpen(false); }} initialSelectedMedia={selectedGalleryMedia} isMultiSelect={true} media={media_files} />
                                    </div>
                                    <InputError className="mt-2" message={errors.gallery_media_ids} />
                                </TabsContent>

                                <TabsContent value="daily-program" className="space-y-6 pt-4 daily-program-content">
                                    <h3 className="text-lg font-semibold">Günlük Tur Programı</h3>
                                    <p className="text-sm text-muted-foreground">Turunuzun gün gün detaylı programını buradan yönetin.</p>
                                    <DragDropContext onDragEnd={onDayDragEnd}>
                                        <Droppable droppableId="days">
                                            {(provided) => (
                                                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                                                     <Accordion type="multiple" className="w-full space-y-4" defaultValue={data.daily_program.map(day => `day-${day.id}`)}>
                                                        {data.daily_program.length > 0 ? (
                                                            data.daily_program.map((day, dayIndex) => (
                                                                 <Draggable key={day.id} draggableId={String(day.id)} index={dayIndex}>
                                                                    {(provided) => (
                                                                         <AccordionItem value={`day-${day.id}`} key={day.id} ref={provided.innerRef} {...provided.draggableProps} className="border rounded-lg px-4 pt-4 daily-program-day-item">
                                                                            <AccordionTrigger className="flex items-center justify-between font-bold text-base hover:no-underline p-0 capitalize">
                                                                                 <div className="flex items-center gap-2 flex-1">
                                                                                     <span {...provided.dragHandleProps}><Menu className="h-5 w-5 text-gray-400 cursor-grab" /></span>
                                                                                     <Input type="text" value={day.title} onChange={(e) => handleDayTitleChange(day.id, e.target.value)} className="text-lg font-semibold flex-1 border-0 shadow-none focus:ring-0 p-0" />
                                                                                </div>
                                                                                 <div className="ml-auto p-2 rounded-full hover:bg-red-100 text-red-600 cursor-pointer" onClick={(e) => { e.stopPropagation(); removeDay(day.id); }}>
                                                                                    <Trash2 className="h-4 w-4" />
                                                                                </div>
                                                                            </AccordionTrigger>
                                                                            <AccordionContent className="pt-3 pb-0">
                                                                                 <DragDropContext onDragEnd={(result) => onActivityDragEnd(result)}>
                                                                                     <Droppable droppableId={`activities-${day.id}`}>
                                                                                        {(providedActivities) => (
                                                                                            <div {...providedActivities.droppableProps} ref={providedActivities.innerRef} className="space-y-4">
                                                                                                {day.activities.length > 0 ? (
                                                                                                    day.activities.map((activity, activityIndex) => (
                                                                                                         <Draggable key={activity.id} draggableId={String(activity.id)} index={activityIndex}>
                                                                                                            {(providedActivity) => (
                                                                                                                 <div ref={providedActivity.innerRef} {...providedActivity.draggableProps} className="border rounded-md p-3 relative daily-program-activity-item">
                                                                                                                    <div className="flex items-center gap-2 mb-2">
                                                                                                                         <span {...providedActivity.dragHandleProps}><Menu className="h-4 w-4 text-gray-400 cursor-grab" /></span>
                                                                                                                        <Label className="flex items-center">
                                                                                                                             <Checkbox checked={activity.is_highlight} onCheckedChange={(checked) => handleActivityChange(day.id, activity.id, 'is_highlight', checked)} className="mr-2" />
                                                                                                                            <Lightbulb className="h-4 w-4 mr-1 text-yellow-500" /> Günün Etkinliği
                                                                                                                        </Label>
                                                                                                                         <div className="ml-auto p-1 rounded-full hover:bg-red-100 text-red-600 cursor-pointer" onClick={() => removeActivity(day.id, activity.id)}>
                                                                                                                            <Trash2 className="h-4 w-4" />
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                     <div className="space-y-2">
                                                                                                                         <Label htmlFor={`activity-description-${day.id}-${activity.id}`}>Aktivite Açıklaması</Label>
                                                                                                                         {isBrowser && (
                                                                                                                            <Suspense fallback={<div>Yükleniyor...</div>}>
                                                                                                                                <RichTextEditor value={activity.description || ''} onChange={(value) => handleActivityChange(day.id, activity.id, 'description', value)} className="mt-1 block w-full min-h-[100px]" showHtmlButton={false} />
                                                                                                                            </Suspense>
                                                                                                                         )}
                                                                                                                        <InputError message={errors[`daily_program.${dayIndex}.activities.${activityIndex}.description`]} className="mt-2" />
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            )}
                                                                                                        </Draggable>
                                                                                                    ))
                                                                                                 ) : ( <p className="text-center text-gray-500">Bu gün için henüz bir aktivite yok.</p> )}
                                                                                                {providedActivities.placeholder}
                                                                                            </div>
                                                                                        )}
                                                                                    </Droppable>
                                                                                </DragDropContext>
                                                                                 <Button type="button" onClick={() => addActivity(day.id)} variant="outline" className="mt-4">
                                                                                    <PlusCircle className="mr-2 h-4 w-4" /> Aktivite Ekle
                                                                                </Button>
                                                                            </AccordionContent>
                                                                        </AccordionItem>
                                                                    )}
                                                                </Draggable>
                                                            ))
                                                         ) : ( <p className="text-center text-gray-500">Henüz günlük program tanımlanmadı.</p> )}
                                                    {provided.placeholder}
                                                     </Accordion>
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                     <Button type="button" onClick={addDay} className="mt-4"><PlusCircle className="mr-2 h-4 w-4" /> Yeni Gün Ekle</Button>
                                </TabsContent>

                                <TabsContent value="pricing" className="space-y-6 pt-4">
                                    <h3 className="text-lg font-semibold">Tur Fiyatlandırması</h3>
                                    <div className="overflow-x-auto mt-4">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="border-b bg-muted/50">
                                                    <th className="px-3 py-2 text-start text-sm font-medium sticky left-0 bg-muted/50 z-10">Sezon / Kategori</th>
                                                    {config_categories.map(category => (
                                                        <th key={category} className="px-3 py-2 text-center text-sm font-medium border-l">{category}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* `config_seasons` bir nesne olduğu için `Object.entries` ile hem anahtarı hem de değeri alıyoruz. */}
                                                {Object.entries(config_seasons).map(([seasonKey, seasonName]) => (
                                                    <tr key={seasonKey} className="border-b last:border-b-0 hover:bg-muted/50">
                                                        <td className="px-3 py-2 text-sm font-medium sticky left-0 bg-background z-10 border-r">
                                                            {/* Görünen isim çevrilmiş `seasonName` olacak. */}
                                                            <span className="font-semibold">{seasonName}</span>
                                                        </td>
                                                        {config_categories.map(category => {
                                                            // Fiyatları bulurken ve güncellerken `seasonKey` (`low_season` vb.) kullanıyoruz.
                                                            const tier = data.pricing_tiers.find(t => t.season_name === seasonKey && t.category_name === category) || {};
                                                            return (
                                                                <td key={`${seasonKey}-${category}`} className="px-3 py-2 text-left text-sm border-l">
                                                                    <div className="flex flex-col space-y-1">
                                                                        <div className="flex items-center justify-between">
                                                                            <label className="text-xs w-12">1 Kişi:</label>
                                                                            <Input type="number" step="0.01" value={tier.price_per_person_1 || ''} onChange={e => handleMatrixPriceChange(seasonKey, category, 'price_per_person_1', e.target.value)} className="w-[80px]" placeholder="-" />
                                                                        </div>
                                                                        <div className="flex items-center justify-between">
                                                                            <label className="text-xs w-12">2 Kişi:</label>
                                                                            <Input type="number" step="0.01" value={tier.price_per_person_2 || ''} onChange={e => handleMatrixPriceChange(seasonKey, category, 'price_per_person_2', e.target.value)} className="w-[80px]" placeholder="-" />
                                                                        </div>
                                                                        <div className="flex items-center justify-between">
                                                                            <label className="text-xs w-12">3 Kişi:</label>
                                                                            <Input type="number" step="0.01" value={tier.price_per_person_3 || ''} onChange={e => handleMatrixPriceChange(seasonKey, category, 'price_per_person_3', e.target.value)} className="w-[80px]" placeholder="-" />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </TabsContent>
                                
                                <TabsContent value="optional-activities" className="space-y-6 pt-4">
                                    <h3 className="text-lg font-semibold">Opsiyonel Aktiviteler</h3>
                                     <div>
                                         <Label htmlFor="optional_activities">Aktiviteler</Label>
                                         <MultiSelect options={optionalActivityOptions} selectedValues={data.optional_activity_ids} onSelect={handleOptionalActivitySelect} placeholder="Aktivite Seç" />
                                        <InputError className="mt-2" message={errors.optional_activity_ids} />
                                    </div>
                                </TabsContent>

                                {/* SEO Sekmesi */}
                                <TabsContent value="seo" className="space-y-6 pt-4">
                                    <h3 className="text-lg font-semibold">SEO Ayarları</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Bu tura özel SEO başlığı ve açıklaması girin. Boş bırakılırsa genel ayarlardaki şablonlar kullanılır.</p>
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
                                <div className="flex justify-start mt-6">
                                    <Button type="submit" disabled={processing}>Değişiklikleri Kaydet</Button>
                                </div>
                            </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
