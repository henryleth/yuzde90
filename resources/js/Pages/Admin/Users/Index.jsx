import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/Components/ui/card';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, users }) {
    const handleDelete = (id) => {
        if (confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header="Kullanıcı Yönetimi"
            actionButton={
                <Button asChild>
                    <Link href={route('admin.users.create')}>Yeni Kullanıcı Ekle</Link>
                </Button>
            }
        >
            <Head title="Kullanıcılar" />

            <Card>
                <CardContent className="p-4">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ad Soyad</TableHead>
                                    <TableHead>E-posta</TableHead>
                                    <TableHead>Roller</TableHead>
                                    <TableHead className="text-right">Aksiyonlar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.roles.map(role => (
                                                <Badge key={role.id} variant="outline" className="mr-1">
                                                    {role.name}
                                                </Badge>
                                            ))}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={route('admin.users.edit', user.id)} className="text-muted-foreground hover:text-green-600 mr-2">
                                                <Edit className="h-5 w-5 inline-block" />
                                            </Link>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)} className="text-muted-foreground hover:text-red-600">
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {users.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan="4" className="text-center">Kullanıcı bulunamadı.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <Pagination links={users.links} />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
