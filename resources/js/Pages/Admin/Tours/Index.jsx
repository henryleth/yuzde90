import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react'; // router import edildi
// import { Inertia } from '@inertiajs/inertia'; // Inertia importu kaldırıldı
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { MoreHorizontal, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/Components/ui/card';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, tours }) {
    const handleDelete = (id) => {
        if (confirm('Bu turu silmek istediğinize emin misiniz?')) {
            router.delete(route('admin.tours.destroy', id)); // Inertia.delete yerine router.delete kullanıldı
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Turlar"
            actionButton={
                <div className="flex items-center gap-2">
                    <Button asChild variant="outline">
                        <Link href={route('admin.optional-activities.index')}>Opsiyonel Aktiviteler</Link>
                    </Button>
                    <Button asChild>
                        <Link href={route('admin.tours.create')}>Yeni Tur Ekle</Link>
                    </Button>
                </div>
            }
        >
            <Head title="Turlar" />

            <Card>
                <CardContent className="p-4">
                    <div className="overflow-x-auto">
                        <Table className="min-w-full divide-y divide-gray-200">
                            <TableHeader className="bg-gray-50">
                                <TableRow>
                                    <TableHead>Görsel</TableHead>
                                    <TableHead>Başlık</TableHead>
                                    <TableHead>Yayınlandı</TableHead>
                                    <TableHead className="text-right">Aksiyonlar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tours.data.map((tour) => (
                                    <TableRow key={tour.id} className="group">
                                        <TableCell>
                                            {tour.image ? (
                                                <img src={tour.image.thumbnail_url} alt={tour.title} className="w-16 h-16 object-cover rounded-md" />
                                            ) : (
                                                <div className="w-16 h-16 bg-muted flex items-center justify-center rounded-md text-muted-foreground text-xs text-center">Görsel Yok</div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={route('admin.tours.edit', tour.id)}
                                                className="text-black hover:underline"
                                            >
                                                {tour.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={tour.is_published ? "default" : "destructive"}>
                                                {tour.is_published ? "Evet" : "Hayır"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right flex items-center justify-end space-x-2">
                                            <Link href={route('tour.show', tour.slug)} target="_blank" className="text-muted-foreground hover:text-blue-600">
                                                <ExternalLink className="h-5 w-5" />
                                            </Link>
                                            <Link href={route('admin.tours.edit', tour.id)} className="text-muted-foreground hover:text-green-600">
                                                <Edit className="h-5 w-5" />
                                            </Link>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(tour.id)} className="text-muted-foreground hover:text-red-600">
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <Pagination links={tours.links} />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
