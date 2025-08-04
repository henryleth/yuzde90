import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ContentForm from './Partials/ContentForm';
import { useToast } from '@/hooks/use-toast'; // useToast hook'u eklendi

export default function Create({ auth, contentCategories, destinations, media_files }) {
    const { toast } = useToast(); // toast fonksiyonu alındı

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
            title: "İçerik oluşturulamadı.",
            description: finalErrorMessage,
            variant: "destructive",
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Yeni İçerik Oluştur"
        >
            <Head title="Yeni İçerik Oluştur" />
            <div className="max-w-4xl mx-auto">
                <ContentForm
                    content={null}
                    contentCategories={contentCategories}
                destinations={destinations}
                media_files={media_files}
                processing={false}
                errors={{}} // Errors prop'unu boş object olarak geçiyoruz, ContentForm içindeki useForm kendi errors state'ini yönetecek
                isEdit={false}
                onError={handleFormError} // Hata durumunda çağrılacak fonksiyon
                />
            </div>
        </AuthenticatedLayout>
    );
}
