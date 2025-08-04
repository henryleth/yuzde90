import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal, CheckCircle, Clock, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Pagination from '@/Components/Pagination';
import CategoryManagerModal from '@/Components/CategoryManagerModal';
import { format } from "date-fns";

export default function Index({ auth, contents }) {
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const { delete: deleteContent } = useForm();

    const categoryColors = [
        "bg-blue-100 text-blue-800",
        "bg-green-100 text-green-800",
        "bg-yellow-100 text-yellow-800",
        "bg-red-100 text-red-800",
        "bg-purple-100 text-purple-800",
        "bg-indigo-100 text-indigo-800",
        "bg-pink-100 text-pink-800",
    ];

    const getCategoryBadgeClass = (index) => {
        return `${categoryColors[index % categoryColors.length]} rounded-full px-2 py-0.5 text-xs font-semibold`;
    };

    const handleDelete = (id) => {
        if (confirm('Bu içeriği silmek istediğinize emin misiniz?')) {
            deleteContent(route('admin.contents.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="İçerikler"
            actionButton={
                <div className="flex space-x-2">
                    <Button asChild>
                        <Link href={route('admin.contents.create')}>Yeni İçerik Ekle</Link>
                    </Button>
                    <Button variant="outline" onClick={() => setIsCategoryModalOpen(true)}>Kategoriler</Button>
                </div>
            }
        >
            <Head title="İçerikler" />

            <Card>
                <CardContent className="p-4">
                    <div className="overflow-x-auto">
                        <Table className="min-w-full divide-y divide-gray-200">
                            <TableHeader className="bg-gray-50">
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Başlık</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Destinasyonlar</TableHead>
                                    <TableHead>Yayınlanma Tarihi</TableHead>
                                    <TableHead className="text-right">Aksiyonlar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contents.data.map((content) => (
                                    <TableRow key={content.id} className="group">
                                        <TableCell className="font-medium">{content.id}</TableCell>
                                        <TableCell>
                                            <Link
                                                href={route('admin.contents.edit', content.id)}
                                                className="text-black hover:underline"
                                            >
                                                {content.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {content.content_categories.map((cat, index) => (
                                                    <Badge key={cat.id} className={getCategoryBadgeClass(index)}>
                                                        {cat.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {content.destinations.map(dest => (
                                                    <Badge key={dest.id} variant="outline" className="rounded-full bg-blue-100 text-blue-800">{dest.name}</Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {content.published_at ? (
                                                <div className="flex items-center space-x-2">
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                    <span>{format(new Date(content.published_at), 'dd.MM.yyyy')}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center space-x-2 text-muted-foreground">
                                                    <Clock className="h-4 w-4 text-orange-500" />
                                                    <span>Taslak</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Menüyü aç</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('contents.show', content.slug)} className="block w-full text-left" target="_blank">
                                                            <span className="flex items-center"><ExternalLink className="mr-2 h-4 w-4" /> İçeriği Görüntüle</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.contents.edit', content.id)} className="block w-full text-left">
                                                            <span className="flex items-center"><Edit className="mr-2 h-4 w-4" /> Düzenle</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleDelete(content.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                                        <span className="flex items-center"><Trash2 className="mr-2 h-4 w-4" /> Sil</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <Pagination links={contents.links} />
                </CardContent>
            </Card>
            <CategoryManagerModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
            />
        </AuthenticatedLayout>
    );
}
