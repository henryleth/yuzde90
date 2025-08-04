import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import ContentForm from './Partials/ContentForm';
import { useToast } from '@/hooks/use-toast'; // useToast hook'u eklendi

export default function Edit({ auth, content, contentCategories, destinations }) {
    const { toast } = useToast(); // toast fonksiyonu alındı
    const { media_files } = usePage().props;

    // Hataları yöneten fonksiyon
    const handleFormError = (errors) => {
        let errorMessages = [];
        // Genel hataları topla
        if (errors.general && errors.general.length > 0) {
            errorMessages = [...errorMessages, ...errors.general];
        }
        // Diğer alan hatalarını topla
        Object.keys(errors).forEach(key => {
            if (key !== 'general' && Array.isArray(errors[key])) {
                errorMessages = [...errorMessages, ...errors[key]];
            }
        });

        const finalErrorMessage = errorMessages.length > 0 
            ? errorMessages.join('\n') 
            : "Bilinmeyen bir hata oluştu.";

        toast({
            title: "İçerik güncellenemedi.",
            description: finalErrorMessage,
            variant: "destructive",
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={`İçeriği Düzenle: ${content.title}`}
        >
            <Head title={`İçeriği Düzenle: ${content.title}`} />
            <div className="max-w-4xl mx-auto">
                <ContentForm
                    content={content}
                    contentCategories={contentCategories}
                destinations={destinations}
                media_files={media_files}
                processing={false}
                errors={{}} // Errors prop'unu boş object olarak geçiyoruz, ContentForm içindeki useForm kendi errors state'ini yönetecek
                isEdit={true}
                onError={handleFormError} // Hata durumunda çağrılacak fonksiyon
                />
            </div>
        </AuthenticatedLayout>
    );
}
