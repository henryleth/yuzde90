import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { usePage } from '@inertiajs/react';
import { PlusCircle, Upload, Image as ImageIcon, XCircle } from 'lucide-react';
import MediaItemCard from './MediaItemCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

const MediaManagerModal = ({ isOpen, onClose, onMediaSelect, initialSelectedMedia = null, isMultiSelect = false }) => { // isMultiSelect prop'u eklendi
    const { toast } = useToast();
    const { auth } = usePage().props;

    const [mediaItems, setMediaItems] = useState([]);
    // selectedMedia state'i isMultiSelect'e göre dizi veya tekil obje tutacak
    const [selectedMedia, setSelectedMedia] = useState(isMultiSelect ? (initialSelectedMedia || []) : initialSelectedMedia);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadTags, setUploadTags] = useState('');
    const [uploadDestinationId, setUploadDestinationId] = useState('');
    const [filterDestination, setFilterDestination] = useState("all");
    const [filterTags, setFilterTags] = useState('');
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetchMediaItems();
            fetchDestinations();
        }
    }, [isOpen]);

    useEffect(() => {
        // initialSelectedMedia değiştiğinde selectedMedia'yı güncelle
        setSelectedMedia(isMultiSelect ? (initialSelectedMedia || []) : initialSelectedMedia);
    }, [initialSelectedMedia, isMultiSelect]);

    const fetchMediaItems = async () => {
        try {
            const response = await fetch('/api/admin/media', {
                headers: {
                    'Accept': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setMediaItems(data.media);
            } else {
                toast({
                    title: "Medya Yüklenemedi",
                    description: data.error || "Medyalar çekilirken bir hata oluştu.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Hata",
                description: "Medyalar çekilirken bir ağ hatası oluştu.",
                variant: "destructive",
            });
            console.error("Medya çekme hatası:", error);
        }
    };

    const fetchDestinations = async () => {
        try {
            const response = await fetch('/api/destinations');
            const data = await response.json();
            if (response.ok) {
                setDestinations(data); 
            } else {
                toast({
                    title: "Destinasyonlar Yüklenemedi",
                    description: data.error || "Destinasyonlar çekilirken bir hata oluştu.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Hata",
                description: "Destinasyonlar çekilirken bir ağ hatası oluştu.",
                variant: "destructive",
            });
            console.error("Destinasyon çekme hatası:", error);
        }
    };

    const handleFileUpload = async () => {
        if (!uploadFile) {
            toast({
                title: "Uyarı",
                description: "Lütfen bir dosya seçin.",
                variant: "warning",
            });
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', uploadFile);
        if (uploadDestinationId) {
            formData.append('destination_id', uploadDestinationId);
        }
        if (uploadTags) {
            formData.append('tags', JSON.stringify(uploadTags.split(',').map(tag => tag.trim())));
        }

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // CSRF tokenini al
            const response = await fetch('/api/admin/media', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken, // CSRF tokenini başlığa ekle
                    // 'Authorization': `Bearer ${auth.user.token}`, 
                },
                body: formData,
            });
            const data = await response.json();

            if (response.ok) {
                toast({
                    title: "Başarılı",
                    description: data.message,
                    variant: "default",
                });
                setUploadFile(null);
                setUploadTags('');
                setUploadDestinationId('');
                fetchMediaItems(); // Medya listesini güncelle

                // Yeni yüklenen medya öğesini ana bileşene bildir ve dahili state'i güncelle
                setSelectedMedia(prev => {
                    let updatedSelection;
                    if (isMultiSelect) {
                        // Eğer çoklu seçimse, mevcut seçili medyaları ve yeni yükleneni birleştir
                        const currentPrev = Array.isArray(prev) ? prev : (prev ? [prev] : []);
                        updatedSelection = [...currentPrev, data.media];
                    } else {
                        // Eğer tekli seçimse, sadece yeni yükleneni ata
                        updatedSelection = data.media;
                    }
                    onMediaSelect(updatedSelection); // Ana bileşene seçimi ilet
                    return updatedSelection; // Dahili state'i güncelle
                });

                onClose(); // Başarılı yüklemeden sonra modalı kapat
            } else {
                const errorMessage = data.errors ? Object.values(data.errors).flat().join(' ') : (data.error || "Dosya yüklenirken bir hata oluştu.");
                toast({
                    title: "Yükleme Hatası",
                    description: errorMessage,
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Hata",
                description: "Dosya yüklenirken bir ağ hatası oluştu.",
                variant: "destructive",
            });
            console.error("Dosya yükleme hatası:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleMediaItemClick = (item) => {
        if (isMultiSelect) {
            // Çoklu seçimde, eğer zaten seçili ise çıkar, değilse ekle
            setSelectedMedia(prev => 
                prev.some(media => media.id === item.id)
                    ? prev.filter(media => media.id !== item.id)
                    : [...prev, item]
            );
        } else {
            // Tekli seçimde direkt ata
            setSelectedMedia(item);
        }
    };

    const handleSelectMedia = () => {
        if (isMultiSelect) {
            // Çoklu seçimde, seçili olanların hepsi gönderilir
            onMediaSelect(selectedMedia);
        } else {
            // Tekli seçimde, tekil seçilen gönderilir
            if (selectedMedia) {
                onMediaSelect(selectedMedia);
            } else {
                toast({
                    title: "Uyarı",
                    description: "Lütfen bir medya öğesi seçin.",
                    variant: "warning",
                });
                return; // Seçim yapılmazsa modalı kapatma
            }
        }
        onClose(); // Her iki durumda da modalı kapat
    };

    const deleteMediaItem = async (idToDelete) => {
        if (!confirm('Bu medya öğesini kalıcı olarak silmek istediğinizden emin misiniz?')) {
            return;
        }
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const response = await fetch(`/api/admin/media/${idToDelete}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: "Başarılı",
                    description: data.message,
                    variant: "default",
                });
                fetchMediaItems(); // Listeyi güncelle
                // Eğer silinen öğe seçili ise, seçimden kaldır
                if (isMultiSelect) {
                    setSelectedMedia(prev => prev.filter(item => item.id !== idToDelete));
                } else if (selectedMedia && selectedMedia.id === idToDelete) {
                    setSelectedMedia(null);
                }
            } else {
                toast({
                    title: "Silme Hatası",
                    description: data.error || "Medya öğesi silinirken bir hata oluştu.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Hata",
                description: "Medya öğesi silinirken bir ağ hatası oluştu.",
                variant: "destructive",
            });
            console.error("Medya silme hatası:", error);
        }
    };

    const filteredMediaItems = mediaItems.filter(item => {
        const matchesDestination = filterDestination === "all" ? true : 
            (item.destination_id && item.destination_id.toString() === filterDestination); 

        const matchesTags = filterTags ? 
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(filterTags.toLowerCase()))) 
            : true;

        return matchesDestination && matchesTags;
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
                {/* console.log("MediaManagerModal children:", children) */} {/* Debug log kaldırıldı */}
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col media-manager-modal-content bg-white p-0">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="media-manager-modal-title">Medya Kütüphanesi</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="library" className="w-full flex-1 overflow-y-auto px-6">
                    <TabsList className="grid w-full grid-cols-2 media-manager-tabs-list sticky top-0 bg-white z-10">
                        <TabsTrigger value="library" className="media-manager-tab-trigger">Kütüphane</TabsTrigger>
                        <TabsTrigger value="upload" className="media-manager-tab-trigger">Yükle</TabsTrigger>
                    </TabsList>
                    <TabsContent value="library" className="space-y-4 pt-4 media-library-content">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4 items-end media-filter-section">
                            <Select onValueChange={setFilterDestination} value={filterDestination} className="media-destination-filter-select">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Destinasyon Seç" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tüm Destinasyonlar</SelectItem>
                                    {destinations.map(dest => (
                                        <SelectItem key={dest.id} value={dest.id.toString()}>{dest.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                             <Input 
                                type="text" 
                                placeholder="Etiketlere Göre Filtrele (virgülle ayırın)" 
                                value={filterTags} 
                                onChange={(e) => setFilterTags(e.target.value)} 
                                className="media-tags-filter"
                            />
                            <Button onClick={() => {setFilterDestination("all"); setFilterTags('');}} variant="outline" className="media-clear-filters-button">
                                Filtreleri Temizle <XCircle className="ml-2 h-4 w-4"/>
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 media-grid">
                            {filteredMediaItems.length > 0 ? (
                                filteredMediaItems.map(item => (
                                    <MediaItemCard 
                                        key={item.id} 
                                        item={item} 
                                        selectedMedia={selectedMedia} 
                                        setSelectedMedia={handleMediaItemClick} // setSelectedMedia yerine handleMediaItemClick gönderildi
                                        isMultiSelect={isMultiSelect} // isMultiSelect prop'u MediaItemCard'a iletildi
                                        onDelete={deleteMediaItem} // onDelete prop'u eklendi
                                    />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500 media-no-media-found">Hiç medya bulunamadı.</p>
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="upload" className="space-y-4 pt-4 media-upload-content">
                        <div className="grid w-full max-w-sm items-center gap-1.5 media-file-upload-section">
                            <Label htmlFor="media-file" className="media-file-label">Dosya Seç</Label>
                            <Input 
                                id="media-file" 
                                type="file" 
                                onChange={(e) => setUploadFile(e.target.files[0])}
                                className="media-file-input"
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5 media-tags-input-section">
                            <Label htmlFor="media-tags" className="media-tags-label">Etiketler (virgülle ayırın)</Label>
                            <Input 
                                id="media-tags" 
                                type="text" 
                                value={uploadTags} 
                                onChange={(e) => setUploadTags(e.target.value)}
                                placeholder="ör: doğa, şehir, tarih" 
                                className="media-tags-input"
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5 media-destination-input-section">
                            <Label htmlFor="media-destination" className="media-destination-label">Destinasyon</Label>
                            <select 
                                id="media-destination" 
                                value={uploadDestinationId} 
                                onChange={(e) => setUploadDestinationId(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 media-destination-select"
                            >
                                <option value="">Seçiniz (Opsiyonel)</option>
                                {destinations.map(dest => (
                                    <option key={dest.id} value={dest.id}>{dest.name}</option>
                                ))}
                            </select>
                        </div>
                        <Button onClick={handleFileUpload} disabled={isUploading} className="media-upload-button">
                            {isUploading ? 'Yükleniyor...' : <> <Upload className="mr-2 h-4 w-4" /> Yükle</>}
                        </Button>
                    </TabsContent>
                </Tabs>
                <DialogFooter className="media-modal-footer flex-shrink-0 flex justify-start sm:space-x-2 p-6 pt-4 border-t"> {/* justify-start eklendi */}
                    <Button variant="outline" onClick={onClose} className="media-cancel-button">İptal</Button>
                    <Button onClick={handleSelectMedia} disabled={isMultiSelect ? selectedMedia.length === 0 : !selectedMedia} className="media-select-button">Seç</Button> {/* Seç butonu disabled durumu güncellendi */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default MediaManagerModal; 