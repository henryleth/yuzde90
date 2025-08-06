import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import InputError from '@/Components/InputError';

export default function Create({ auth, permissions }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: [],
    });

    const onHandlePermissionChange = (permissionId) => {
        let newPermissions = [...data.permissions];
        if (newPermissions.includes(permissionId)) {
            newPermissions = newPermissions.filter(id => id !== permissionId);
        } else {
            newPermissions.push(permissionId);
        }
        setData('permissions', newPermissions);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.roles.store'));
    };

    return (
        <AdminLayout
            user={auth.user}
            header="Yeni Rol Ekle"
            actionButton={<Button onClick={submit} disabled={processing}>Kaydet</Button>}
        >
            <Head title="Yeni Rol Ekle" />

            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Rol Bilgileri</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <Label htmlFor="name">Rol Adı</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div>
                                <Label>İzinler</Label>
                                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {permissions.map((permission) => (
                                        <div key={permission.id} className="flex items-center">
                                            <Checkbox
                                                id={`permission-${permission.id}`}
                                                checked={data.permissions.includes(permission.id)}
                                                onCheckedChange={() => onHandlePermissionChange(permission.id)}
                                            />
                                            <Label htmlFor={`permission-${permission.id}`} className="ml-2">
                                                {permission.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                <InputError className="mt-2" message={errors.permissions} />
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
