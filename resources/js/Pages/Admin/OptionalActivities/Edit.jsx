import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import OptionalActivityForm from './Partials/OptionalActivityForm';

export default function Edit({ auth, activity, media_files }) {
    const { data, setData, put, processing, errors } = useForm({
        name: activity.name || '',
        description: activity.description || '',
        price: activity.price || '',
        is_published: activity.is_published || false,
        image_id: activity.image_id || null,
        image: activity.image || null, // Form bileşenine göndermek için
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.optional-activities.update', activity.id));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={`Opsiyonel Aktivite Düzenle: ${activity.name}`}
            actionButton={<Button onClick={submit} disabled={processing}>Değişiklikleri Kaydet</Button>}
        >
            <Head title={`Opsiyonel Aktivite Düzenle: ${activity.name}`} />

            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardContent className="p-6">
                        <form onSubmit={submit}>
                            <OptionalActivityForm
                                data={data}
                                setData={setData}
                                errors={errors}
                                media_files={media_files}
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
