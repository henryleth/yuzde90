import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/Components/ui/card';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, roles }) {
    const handleDelete = (id) => {
        if (confirm('Bu rolü silmek istediğinize emin misiniz?')) {
            router.delete(route('admin.roles.destroy', id));
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header="Rol Yönetimi"
            actionButton={
                <Button asChild>
                    <Link href={route('admin.roles.create')}>Yeni Rol Ekle</Link>
                </Button>
            }
        >
            <Head title="Roller" />

            <Card>
                <CardContent className="p-4">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Rol Adı</TableHead>
                                    <TableHead>İzinler</TableHead>
                                    <TableHead className="text-right">Aksiyonlar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {roles.data.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell>{role.name}</TableCell>
                                        <TableCell>
                                            {role.permissions.map(permission => (
                                                <Badge key={permission.id} variant="secondary" className="mr-1">
                                                    {permission.name}
                                                </Badge>
                                            ))}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={route('admin.roles.edit', role.id)} className="text-muted-foreground hover:text-green-600 mr-2">
                                                <Edit className="h-5 w-5 inline-block" />
                                            </Link>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(role.id)} className="text-muted-foreground hover:text-red-600">
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {roles.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan="3" className="text-center">Rol bulunamadı.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <Pagination links={roles.links} />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
