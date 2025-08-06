import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Button } from '@/Components/ui/button';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/Components/ui/card';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, destinations }) {
    const handleDelete = (id) => {
        if (confirm('Bu destinasyonu silmek istediğinize emin misiniz?')) {
            router.delete(route('admin.destinations.destroy', id));
        }
    };

    return (
        <AdminLayout
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
                <CardContent className="p-4">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Görsel</TableHead>
                                    <TableHead>Adı</TableHead>
                                    <TableHead className="text-right">Aksiyonlar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {destinations.data.map((destination) => (
                                    <TableRow key={destination.id}>
                                        <TableCell>
                                            {destination.image ? (
                                                <img src={destination.image.thumbnail_url} alt={destination.name} className="w-16 h-16 object-cover rounded-md" />
                                            ) : (
                                                <div className="w-16 h-16 bg-muted flex items-center justify-center rounded-md text-muted-foreground text-xs text-center">Görsel Yok</div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={route('admin.destinations.edit', destination.id)} className="text-black hover:underline">
                                                {destination.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={route('destinations.show', destination.slug)} target="_blank" className="text-muted-foreground hover:text-blue-600 mr-2">
                                                <ExternalLink className="h-5 w-5 inline-block" />
                                            </Link>
                                            <Link href={route('admin.destinations.edit', destination.id)} className="text-muted-foreground hover:text-green-600 mr-2">
                                                <Edit className="h-5 w-5 inline-block" />
                                            </Link>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(destination.id)} className="text-muted-foreground hover:text-red-600">
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {destinations.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan="3" className="text-center">Destinasyon bulunamadı.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <Pagination links={destinations.links} />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
