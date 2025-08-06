import { usePage } from '@inertiajs/react';
import get from 'lodash.get';

/**
 * Çevirileri yönetmek için bir custom hook.
 * Inertia ile paylaşılan 'translations' prop'unu kullanarak
 * metinleri mevcut dile göre çevirir.
 *
 * @returns {{ t: (key: string, replacements?: object) => string }}
 */
export function useTranslation() {
    const { translations, locale } = usePage().props;

    /**
     * Verilen anahtara karşılık gelen çeviriyi bulur.
     * Dinamik değerler için yer tutucuları destekler.
     *
     * @param {string} key - Çeviri anahtarı (örn: 'navbar.home').
     * @param {object} replacements - Yer tutucuları değiştirmek için kullanılan obje (örn: { name: 'Istanbul' }).
     * @returns {string} Çevrilmiş metin.
     */
    function t(key, defaultText = '', replacements = {}) {
        // Eğer defaultText bir obje ise, replacements olarak kabul et
        if (typeof defaultText === 'object' && defaultText !== null) {
            replacements = defaultText;
            defaultText = key; // Anahtarı varsayılan metin olarak kullan
        }

        // Çeviriyi 'site' objesinden alır. Anahtar bulunamazsa, varsayılan metni kullanır.
        let translation = get(translations.site, key, defaultText);

        // Hem :placeholder hem de {placeholder} formatındaki yer tutucuları `replacements` objesindeki değerlerle değiştirir.
        Object.keys(replacements).forEach(placeholder => {
            const value = replacements[placeholder];
            // :placeholder formatı
            translation = translation.replace(new RegExp(`:${placeholder}`, 'g'), value);
            // {placeholder} formatı
            translation = translation.replace(new RegExp(`{${placeholder}}`, 'g'), value);
        });

        return translation;
    }

    return { t, locale };
}
