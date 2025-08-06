import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, roles }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        roles: [],
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.users.store'));
    }

    const handleRoleChange = (e) => {
        const roleName = e.target.name;
        if (e.target.checked) {
            setData('roles', [...data.roles, roleName]);
        } else {
            setData('roles', data.roles.filter((role) => role !== roleName));
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header="Yeni Kullanıcı Ekle"
        >
            <Head title="Yeni Kullanıcı Ekle" />

            <div className="bg-white p-6 rounded shadow">
                <form onSubmit={handleSubmit} className="max-w-lg">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ad Soyad</label>
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && <div className="text-red-600 mt-1">{errors.email}</div>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon (Opsiyonel)</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.phone && <div className="text-red-600 mt-1">{errors.phone}</div>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Şifre</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.password && <div className="text-red-600 mt-1">{errors.password}</div>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
                        <input
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Roller</label>
                        {roles.map(role => (
                            <div key={role.id} className="flex items-center mt-1">
                                <input
                                    type="checkbox"
                                    name={role.name}
                                    id={`role-${role.id}`}
                                    onChange={handleRoleChange}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor={`role-${role.id}`} className="ml-2 block text-sm text-gray-900">{role.name}</label>
                            </div>
                        ))}
                        {errors.roles && <div className="text-red-600 mt-1">{errors.roles}</div>}
                    </div>

                    <div className="flex items-center justify-end">
                        <Link href={route('admin.users.index')} className="text-gray-600 hover:text-gray-900 mr-4">
                            İptal
                        </Link>
                        <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300">
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
