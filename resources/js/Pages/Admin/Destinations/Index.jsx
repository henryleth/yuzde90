import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { PlusCircle, MoreHorizontal, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import Pagination from '@/Components/Pagination';
import { toast } from '@/hooks/use-toast'; // Toast için import

export default function Index({ auth, destinations: initialDestinations }) {
    const [destinations, setDestinations] = useState(initialDestinations.data); // Initial veriyi state'e al

    // Inertia'dan gelen veriler değiştiğinde state'i güncelle
    useEffect(() => {
        setDestinations(initialDestinations.data);
    }, [initialDestinations.data]);

    const { delete: deleteDestination } = useForm();

    const handleDelete = (id) => {
        if (confirm('Bu destinasyonu silmek istediğinize emin misiniz?')) {
            deleteDestination(route('admin.destinations.destroy', id), {
                onSuccess: () => {
                    toast({
                        title: "Başarılı",
                        description: "Destinasyon başarıyla silindi.",
                    });
                    // Silme sonrası listeyi güncelle
                    router.reload({ only: ['destinations'] });
                },
                onError: (err) => {
                    toast({
                        title: "Hata",
                        description: "Destinasyon silinirken bir hata oluştu.",
                        variant: "destructive",
                    });
                    console.error('Destinasyon silme hatası:', err);
                }
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Destinasyonlar"
            actionButton={
                <Button asChild>
                    <Link href={route('admin.destinations.create')}>Yeni Destinasyon Ekle</Link>
                </Button>
            }
        >
            <Head title="Destinasyonlar" />

            <Card>
                <CardHeader>
                    <CardTitle>Tüm Destinasyonlar</CardTitle>
                    <CardDescription>Mevcut tüm destinasyonları buradan yönetebilirsiniz.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table className="min-w-full divide-y divide-gray-200">
                            <TableHeader className="bg-gray-50">
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Görsel</TableHead>
                                    <TableHead>Adı</TableHead>
                                    <TableHead className="text-right">Aksiyonlar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {destinations.length > 0 ? (
                                    destinations.map((destination) => (
                                        <TableRow key={destination.id} className="group">
                                            <TableCell className="font-medium">{destination.id}</TableCell>
                                            <TableCell>
                                                {destination.image ? (
                                                    <img src={destination.image.thumbnail_url} alt={destination.name} className="w-16 h-16 object-cover rounded-md" />
                                                ) : (
                                                    <div className="w-16 h-16 bg-muted flex items-center justify-center rounded-md text-muted-foreground text-xs text-center">Görsel Yok</div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={route('admin.destinations.edit', destination.id)} // admin düzenleme rotası
                                                    className="text-black hover:underline"
                                                >
                                                    {destination.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="text-right flex items-center justify-end space-x-2">
                                                <Link href={route('destinations.show', destination.slug)} target="_blank" className="text-muted-foreground hover:text-blue-600">
                                                    <ExternalLink className="h-5 w-5" />
                                                </Link>
                                                <Link href={route('admin.destinations.edit', destination.id)} className="text-muted-foreground hover:text-green-600">
                                                    <Button variant="ghost" size="icon">
                                                        <Edit className="h-5 w-5" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(destination.id)} className="text-muted-foreground hover:text-red-600">
                                                    <Trash2 className="h-5 w-5" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan="4" className="text-center py-4 text-muted-foreground">
                                            Henüz destinasyon bulunmamaktadır.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <Pagination links={initialDestinations.links} />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
