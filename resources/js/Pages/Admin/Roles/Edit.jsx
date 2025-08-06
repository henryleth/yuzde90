import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, role, permissions }) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name || '',
        permissions: role.permissions.map(p => p.name) || [],
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('admin.roles.update', role.id), {
            preserveScroll: true,
        });
    }

    const handlePermissionChange = (e) => {
        const permissionName = e.target.name;
        if (e.target.checked) {
            setData('permissions', [...data.permissions, permissionName]);
        } else {
            setData('permissions', data.permissions.filter((p) => p !== permissionName));
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={`Rol Düzenle: ${role.name}`}
        >
            <Head title={`Rol Düzenle: ${role.name}`} />

            <div className="bg-white p-6 rounded shadow">
                <form onSubmit={handleSubmit} className="max-w-lg">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Rol Adı</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.name && <div className="text-red-600 mt-1">{errors.name}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">İzinler</label>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            {permissions.map(permission => (
                                <div key={permission.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name={permission.name}
                                        id={`permission-${permission.id}`}
                                        checked={data.permissions.includes(permission.name)}
                                        onChange={handlePermissionChange}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor={`permission-${permission.id}`} className="ml-2 block text-sm text-gray-900">{permission.name}</label>
                                </div>
                            ))}
                        </div>
                        {errors.permissions && <div className="text-red-600 mt-1">{errors.permissions}</div>}
                    </div>

                    <div className="flex items-center justify-end">
                        <Link href={route('admin.roles.index')} className="text-gray-600 hover:text-gray-900 mr-4">
                            İptal
                        </Link>
                        <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300">
                            Güncelle
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
