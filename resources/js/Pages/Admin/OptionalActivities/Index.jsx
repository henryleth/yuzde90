import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, activities }) {
    const handleDelete = (id) => {
        if (confirm('Bu aktiviteyi silmek istediğinize emin misiniz?')) {
            router.delete(route('admin.optional-activities.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Opsiyonel Aktiviteler"
            actionButton={
                <Button asChild>
                    <Link href={route('admin.optional-activities.create')}>Yeni Aktivite Ekle</Link>
                </Button>
            }
        >
            <Head title="Opsiyonel Aktiviteler" />

            <Card>
                <CardContent className="p-4">
                    <div className="overflow-x-auto">
                        <Table className="min-w-full divide-y divide-gray-200">
                            <TableHeader className="bg-gray-50">
                                <TableRow>
                                    <TableHead>Görsel</TableHead>
                                    <TableHead>Aktivite Adı</TableHead>
                                    <TableHead>Fiyat</TableHead>
                                    <TableHead>Yayınlandı</TableHead>
                                    <TableHead className="text-right">Aksiyonlar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activities.data.map((activity) => (
                                    <TableRow key={activity.id}>
                                        <TableCell>
                                            {activity.image ? (
                                                <img src={activity.image.thumbnail_url} alt={activity.name} className="w-16 h-16 object-cover rounded-md" />
                                            ) : (
                                                <div className="w-16 h-16 bg-muted flex items-center justify-center rounded-md text-muted-foreground text-xs text-center">Görsel Yok</div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={route('admin.optional-activities.edit', activity.id)}
                                                className="text-black hover:underline"
                                            >
                                                {activity.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {activity.price ? `€${activity.price}` : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={activity.is_published ? "default" : "destructive"}>
                                                {activity.is_published ? "Evet" : "Hayır"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link href={route('admin.optional-activities.edit', activity.id)} className="text-muted-foreground hover:text-green-600">
                                                    <Edit className="h-5 w-5" />
                                                </Link>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(activity.id)} className="text-muted-foreground hover:text-red-600">
                                                    <Trash2 className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <Pagination links={activities.links} />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
