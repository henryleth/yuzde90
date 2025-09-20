import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { usePage } from '@inertiajs/react';
import { PlusCircle, Upload, Image as ImageIcon, XCircle } from 'lucide-react';
import MediaItemCard from './MediaItemCard';
import MultiSelect from '@/Components/ui/multi-select';

const MediaManagerModal = ({ isOpen, onClose, onMediaSelect, initialSelectedMedia = null, isMultiSelect = false }) => { // isMultiSelect prop'u eklendi
    const { toast } = useToast();
    const { auth } = usePage().props;

    const [mediaItems, setMediaItems] = useState([]);
    // selectedMedia state'i isMultiSelect'e göre dizi veya tekil obje tutacak
    const [selectedMedia, setSelectedMedia] = useState(isMultiSelect ? (initialSelectedMedia || []) : initialSelectedMedia);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadTags, setUploadTags] = useState('');
    const [uploadDestinationIds, setUploadDestinationIds] = useState([]); // Çoklu destinasyon seçimi için
    const [uploadUrl, setUploadUrl] = useState(''); // URL'den yükleme için state
    const [uploadType, setUploadType] = useState('file'); // 'file' veya 'url'
    const [filterDestination, setFilterDestination] = useState("all");
    const [filterTags, setFilterTags] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [isEditingInfo, setIsEditingInfo] = useState(false); // Düzenleme modu
    const [editTags, setEditTags] = useState(''); // Düzenlenecek etiketler
    const [editDestinationIds, setEditDestinationIds] = useState([]); // Düzenlenecek destinasyonlar

    useEffect(() => {
        if (isOpen) {
            fetchMediaItems();
            fetchDestinations();
            // Modal açıldığında initialSelectedMedia'yı set et
            setSelectedMedia(isMultiSelect ? (initialSelectedMedia || []) : initialSelectedMedia);
        }
    }, [isOpen]);

    useEffect(() => {
        // initialSelectedMedia değiştiğinde ve modal açıksa selectedMedia'yı güncelle
        if (isOpen) {
            setSelectedMedia(isMultiSelect ? (initialSelectedMedia || []) : initialSelectedMedia);
        }
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
            const response = await fetch('/api/destinations', {
                headers: {
                    'Accept': 'application/json',
                },
            });
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
        if (uploadType === 'file') {
            await handleLocalFileUpload();
        } else if (uploadType === 'url') {
            await handleUrlUpload();
        }
    };

    const handleLocalFileUpload = async () => {
        if (!uploadFile) {
            toast({
                title: "Uyarı",
                description: "Lütfen bir dosya seçin.",
                variant: "warning",
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', uploadFile);
        await upload(formData);
    };

    const handleUrlUpload = async () => {
        if (!uploadUrl.trim()) {
            toast({
                title: "Uyarı",
                description: "Lütfen bir URL girin.",
                variant: "warning",
            });
            return;
        }

        const formData = new FormData();
        formData.append('url', uploadUrl);
        await upload(formData);
    };
    
    const upload = async (formData) => {
        setIsUploading(true);

        // Çoklu destinasyon desteği
        if (uploadDestinationIds.length > 0) {
            // destination_ids'i array olarak gönder (integer olarak)
            uploadDestinationIds.forEach((id, index) => {
                formData.append(`destination_ids[${index}]`, parseInt(id));
            });
        }
        
        if (uploadTags) {
            formData.append('tags', JSON.stringify(uploadTags.split(',').map(tag => tag.trim())));
        }

        try {
            const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
            const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';
            
            if (!csrfToken) {
                throw new Error('CSRF token bulunamadı. Sayfayı yenileyin.');
            }
            
            const response = await fetch('/api/admin/media', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: formData,
            });
            
            // Response'un content-type'ını kontrol et
            const contentType = response.headers.get("content-type");
            let data;
            
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                // HTML response gelirse hata göster
                const text = await response.text();
                console.error("Beklenmeyen response:", text.substring(0, 500));
                
                // Muhtemel dosya boyutu hatası
                if (text.includes("413") || text.includes("Request Entity Too Large")) {
                    throw new Error("Dosya boyutu çok büyük. Maksimum 10MB dosya yükleyebilirsiniz.");
                }
                throw new Error("Sunucu beklenmeyen bir yanıt döndürdü. Lütfen sayfayı yenileyip tekrar deneyin.");
            }

            if (response.ok) {
                toast({
                    title: "Başarılı",
                    description: data.message,
                    variant: "default",
                });
                setUploadFile(null);
                setUploadUrl('');
                setUploadTags('');
                setUploadDestinationIds([]); // Çoklu destinasyonları temizle
                fetchMediaItems(); 

                setSelectedMedia(prev => {
                    let updatedSelection;
                    if (isMultiSelect) {
                        const currentPrev = Array.isArray(prev) ? prev : (prev ? [prev] : []);
                        updatedSelection = [...currentPrev, data.media];
                    } else {
                        updatedSelection = data.media;
                    }
                    onMediaSelect(updatedSelection);
                    return updatedSelection;
                });

                onClose();
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
            // Tekli seçimde, aynı öğeye tekrar tıklanırsa seçimi kaldır
            setSelectedMedia(prev => 
                prev && prev.id === item.id ? null : item
            );
            // Eğer seçim kaldırıldıysa, düzenleme modunu da kapat
            if (selectedMedia && selectedMedia.id === item.id) {
                setIsEditingInfo(false);
            }
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

    const startEditingInfo = () => {
        if (selectedMedia && !Array.isArray(selectedMedia)) {
            setEditTags(selectedMedia.tags ? selectedMedia.tags.join(', ') : '');
            setEditDestinationIds(selectedMedia.destination_ids || []);
            setIsEditingInfo(true);
        }
    };

    const saveEditedInfo = async () => {
        if (!selectedMedia || Array.isArray(selectedMedia)) return;
        
        try {
            const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
            const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';
            
            if (!csrfToken) {
                throw new Error('CSRF token bulunamadı. Sayfayı yenileyin.');
            }
            
            const newTags = editTags.split(',').map(tag => tag.trim()).filter(tag => tag);
            const newDestinationIds = editDestinationIds.map(id => parseInt(id));
            
            const response = await fetch(`/api/admin/media/${selectedMedia.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    tags: newTags,
                    destination_ids: newDestinationIds
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                
                // Güncellenmiş medya bilgilerini selectedMedia'ya yansıt
                setSelectedMedia(prev => ({
                    ...prev,
                    tags: newTags,
                    destination_ids: newDestinationIds
                }));
                
                // MediaItems listesini de güncelle
                setMediaItems(prevItems => 
                    prevItems.map(item => 
                        item.id === selectedMedia.id 
                            ? { ...item, tags: newTags, destination_ids: newDestinationIds }
                            : item
                    )
                );
                
                toast({
                    title: "Başarılı",
                    description: "Medya bilgileri güncellendi.",
                });
                setIsEditingInfo(false);
            } else {
                const data = await response.json();
                toast({
                    title: "Hata",
                    description: data.error || "Güncelleme başarısız.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Hata",
                description: "Güncelleme sırasında bir hata oluştu.",
                variant: "destructive",
            });
        }
    };

    const deleteMediaItem = async (idToDelete) => {
        if (!confirm('Bu medya öğesini kalıcı olarak silmek istediğinizden emin misiniz?')) {
            return;
        }
        try {
            const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
            const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';
            
            if (!csrfToken) {
                throw new Error('CSRF token bulunamadı. Sayfayı yenileyin.');
            }
            
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
        // Destinasyon filtreleme - destination_ids array'ini kontrol et
        const matchesDestination = filterDestination === "all" ? true : 
            (item.destination_ids && item.destination_ids.includes(parseInt(filterDestination))); 

        const matchesTags = filterTags ? 
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(filterTags.toLowerCase()))) 
            : true;

        return matchesDestination && matchesTags;
    }).sort((a, b) => {
        // Seçili medyaları en üste taşı, kendi aralarında seçilme sırasını koru
        if (isMultiSelect && Array.isArray(selectedMedia)) {
            const aIndex = selectedMedia.findIndex(m => m.id === a.id);
            const bIndex = selectedMedia.findIndex(m => m.id === b.id);
            
            // İkisi de seçiliyse, seçilme sırasına göre sırala
            if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex;
            }
            
            // Sadece a seçiliyse, a'yı üste al
            if (aIndex !== -1) return -1;
            
            // Sadece b seçiliyse, b'yi üste al
            if (bIndex !== -1) return 1;
        } else if (!isMultiSelect && selectedMedia) {
            // Tekli seçimde
            if (selectedMedia.id === a.id) return -1;
            if (selectedMedia.id === b.id) return 1;
        }
        
        // Seçili değillerse ID'ye göre sırala (yeniden eskiye)
        return b.id - a.id;
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
                        {/* Yükleme Tipi Seçimi için Tabs */}
                        <Tabs value={uploadType} onValueChange={setUploadType}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="file">Dosyadan Yükle</TabsTrigger>
                                <TabsTrigger value="url">URL'den Yükle</TabsTrigger>
                            </TabsList>
                            <TabsContent value="file" className="space-y-4 pt-4">
                                <div className="grid w-full max-w-sm items-center gap-1.5 media-file-upload-section">
                                    <Label htmlFor="media-file" className="media-file-label">Dosya Seç</Label>
                                    <Input 
                                        id="media-file" 
                                        type="file" 
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                // Dosya boyutunu kontrol et (10MB = 10 * 1024 * 1024 bytes)
                                                const maxSize = 10 * 1024 * 1024; // 10MB
                                                if (file.size > maxSize) {
                                                    toast({
                                                        title: "Dosya Çok Büyük",
                                                        description: `Dosya boyutu ${(file.size / (1024 * 1024)).toFixed(2)}MB. Maksimum 10MB dosya yükleyebilirsiniz.`,
                                                        variant: "destructive",
                                                    });
                                                    e.target.value = ''; // Input'u temizle
                                                    return;
                                                }
                                                
                                                // Dosya formatını kontrol et
                                                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp'];
                                                if (!allowedTypes.includes(file.type)) {
                                                    toast({
                                                        title: "Geçersiz Dosya Formatı",
                                                        description: "Sadece jpeg, png, jpg, gif, svg, webp formatları kabul edilir.",
                                                        variant: "destructive",
                                                    });
                                                    e.target.value = ''; // Input'u temizle
                                                    return;
                                                }
                                            }
                                            setUploadFile(file);
                                        }}
                                        className="media-file-input"
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="url" className="space-y-4 pt-4">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="media-url">Resim URL'i</Label>
                                    <Input
                                        id="media-url"
                                        type="text"
                                        value={uploadUrl}
                                        onChange={(e) => setUploadUrl(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Ortak Alanlar */}
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
                            <Label htmlFor="media-destination" className="media-destination-label">Destinasyonlar (Birden fazla seçebilirsiniz)</Label>
                            <MultiSelect
                                id="media-destination"
                                selectedValues={uploadDestinationIds}
                                onSelect={(newValues) => setUploadDestinationIds(newValues)}
                                options={destinations.map(dest => ({
                                    value: dest.id.toString(),
                                    label: dest.name
                                }))}
                                placeholder="Destinasyon seçiniz..."
                            />
                        </div>
                        <Button onClick={handleFileUpload} disabled={isUploading} className="media-upload-button">
                            {isUploading ? 'Yükleniyor...' : <> <Upload className="mr-2 h-4 w-4" /> Yükle</>}
                        </Button>
                    </TabsContent>
                </Tabs>
                <DialogFooter className="media-modal-footer flex-shrink-0 flex justify-between items-center sm:space-x-2 p-6 pt-4 border-t">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {selectedMedia && !Array.isArray(selectedMedia) && (
                            isEditingInfo ? (
                                // Düzenleme modu
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label className="min-w-[100px]">Etiketler:</Label>
                                        <Input 
                                            type="text" 
                                            value={editTags} 
                                            onChange={(e) => setEditTags(e.target.value)}
                                            placeholder="Etiketleri virgülle ayırın"
                                            className="flex-1 h-8"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label className="min-w-[100px]">Destinasyonlar:</Label>
                                        <MultiSelect
                                            selectedValues={editDestinationIds.map(id => id.toString())}
                                            onSelect={(values) => setEditDestinationIds(values)}
                                            options={destinations.map(dest => ({
                                                value: dest.id.toString(),
                                                label: dest.name
                                            }))}
                                            placeholder="Destinasyon seçiniz..."
                                            className="flex-1"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={saveEditedInfo}>Kaydet</Button>
                                        <Button size="sm" variant="outline" onClick={() => setIsEditingInfo(false)}>İptal</Button>
                                    </div>
                                </div>
                            ) : (
                                // Görüntüleme modu (tıklanabilir)
                                <div 
                                    className="space-y-1 cursor-pointer hover:bg-secondary/20 p-2 -m-2 rounded transition-colors"
                                    onClick={startEditingInfo}
                                    title="Düzenlemek için tıklayın"
                                >
                                    {(selectedMedia.tags && selectedMedia.tags.length > 0) || (selectedMedia.destination_ids && selectedMedia.destination_ids.length > 0) ? (
                                        <>
                                            {selectedMedia.tags && selectedMedia.tags.length > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">Etiketler:</span>
                                                    <span className="flex gap-1">
                                                        {selectedMedia.tags.map((tag, index) => (
                                                            <span key={index} className="px-2 py-0.5 bg-secondary rounded text-xs">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )}
                                            {selectedMedia.destination_ids && selectedMedia.destination_ids.length > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">Destinasyonlar:</span>
                                                    <span className="flex gap-1">
                                                        {(() => {
                                                            const destIds = selectedMedia.destination_ids || [];
                                                            const destNames = destIds.map(id => {
                                                                const dest = destinations.find(d => d.id == id);
                                                                return dest ? dest.name : `ID: ${id}`;
                                                            });
                                                            return destNames.map((name, index) => (
                                                                <span key={index} className="px-2 py-0.5 bg-primary/10 rounded text-xs">
                                                                    {name}
                                                                </span>
                                                            ));
                                                        })()}
                                                    </span>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-muted-foreground italic">
                                            Etiket ve destinasyon eklemek için tıklayın
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                        {Array.isArray(selectedMedia) && selectedMedia.length > 0 && (
                            <div className="text-sm">
                                {selectedMedia.length} medya seçildi
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose} className="media-cancel-button">İptal</Button>
                        <Button onClick={handleSelectMedia} disabled={isMultiSelect ? selectedMedia.length === 0 : !selectedMedia} className="media-select-button">Seç</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default MediaManagerModal; 