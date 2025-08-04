import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import OptionalActivityForm from './Partials/OptionalActivityForm';

export default function Create({ auth, media_files }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        is_published: false,
        image_id: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.optional-activities.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Yeni Opsiyonel Aktivite Ekle"
            actionButton={<Button onClick={submit} disabled={processing}>Kaydet</Button>}
        >
            <Head title="Yeni Opsiyonel Aktivite Ekle" />

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
        </AuthenticatedLayout>
    );
}
