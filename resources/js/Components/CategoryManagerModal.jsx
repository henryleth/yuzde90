import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import InputError from '@/Components/InputError';
import axios from 'axios'; // axios import edildi

export default function CategoryManagerModal({ isOpen, onClose }) {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
    });

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
            reset();
            setEditingCategory(null);
        }
    }, [isOpen]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast({
                title: "Hata",
                description: "Lütfen tüm alanları kontrol edin.",
                variant: "destructive",
            });
        }
    }, [errors]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(route('admin.content-categories.index'));
            setCategories(response.data.data); // Backendden gelen paginate edilmiş verinin 'data' kısmı
        } catch (err) {
            toast({
                title: "Hata",
                description: "Kategoriler yüklenirken bir hata oluştu.",
                variant: "destructive",
            });
            console.error('Kategori yükleme hatası:', err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            put(route('admin.content-categories.update', editingCategory.id), {
                onSuccess: () => {
                    toast({
                        title: "Başarılı",
                        description: "Kategori başarıyla güncellendi.",
                    });
                    reset();
                    setEditingCategory(null);
                    fetchCategories();
                },
                onError: (err) => {
                    toast({
                        title: "Hata",
                        description: "Kategori güncellenirken bir hata oluştu.",
                        variant: "destructive",
                    });
                    console.error('Kategori güncelleme hatası:', err);
                }
            });
        } else {
            post(route('admin.content-categories.store'), {
                onSuccess: () => {
                    toast({
                        title: "Başarılı",
                        description: "Kategori başarıyla eklendi.",
                    });
                    reset();
                    fetchCategories();
                },
                onError: (err) => {
                    toast({
                        title: "Hata",
                        description: "Kategori eklenirken bir hata oluştu.",
                        variant: "destructive",
                    });
                    console.error('Kategori ekleme hatası:', err);
                }
            });
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setData('name', category.name);
    };

    const handleDelete = (id) => {
        if (confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
            router.delete(route('admin.content-categories.destroy', id), {
                onSuccess: () => {
                    toast({
                        title: "Başarılı",
                        description: "Kategori başarıyla silindi.",
                    });
                    fetchCategories();
                },
                onError: (err) => {
                    toast({
                        title: "Hata",
                        description: "Kategori silinirken bir hata oluştu.",
                        variant: "destructive",
                    });
                    console.error('Kategori silme hatası:', err);
                }
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg border border-gray-200"> {/* Arkaplan rengi beyaz yapıldı */}
                <DialogHeader>
                    <DialogTitle>{editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}</DialogTitle>
                    <DialogDescription>
                        {editingCategory ? 'Kategoriyi düzenleyin.' : 'Yeni bir içerik kategorisi ekleyin.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Kategori Adı</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                            disabled={processing}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <Button type="submit" disabled={processing}>
                        {editingCategory ? 'Güncelle' : 'Ekle'}
                    </Button>
                    {editingCategory && (
                        <Button type="button" variant="outline" onClick={() => { setEditingCategory(null); reset(); }}>
                            İptal
                        </Button>
                    )}
                </form>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Mevcut Kategoriler</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Adı</TableHead>
                                <TableHead className="text-right">Aksiyonlar</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-medium">{category.id}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell className="text-right flex items-center justify-end space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-800">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="3" className="text-center py-4 text-muted-foreground">
                                        Henüz kategori bulunmamaktadır.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    );
}