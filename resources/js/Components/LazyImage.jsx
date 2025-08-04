import React, { Suspense, lazy } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';

/**
 * 'react-lazy-load-image-component' kütüphanesini SSR uyumlu olacak şekilde
 * dinamik olarak yükleyen bir sarmalayıcı (wrapper) bileşen.
 */

// Bileşeni 'React.lazy' ile dinamik olarak import ediyoruz.
// Bu, bileşenin sadece istemci tarafında (tarayıcıda) yüklenmesini sağlar.
const LazyLoadedImageComponent = lazy(() => 
    import('react-lazy-load-image-component').then(module => ({ default: module.LazyLoadImage }))
);

/**
 * Asıl resim yüklenene kadar gösterilecek olan yer tutucu (placeholder) bileşen.
 * wrapperClassName prop'unu alarak ana resimle aynı boyutlarda olmasını sağlar,
 * bu sayede sayfa kayması (layout shift) engellenir.
 */
const ImagePlaceholder = ({ wrapperClassName }) => (
    <div className={wrapperClassName}>
        <div className="w-full h-full bg-gray-200 rounded-md animate-pulse"></div>
    </div>
);


/**
 * Proje genelinde kullanılacak olan tembel yüklemeli (lazy-loaded) resim bileşeni.
 * Standart bir <img> etiketi gibi kullanılabilir, ancak arka planda tembel yükleme
 * ve SSR uyumluluğu özelliklerini barındırır.
 * 
 * @param {string} src - Resim kaynağının URL'i.
 * @param {string} alt - Resim için alternatif metin.
 * @param {string} className - Resim etiketine (<img />) uygulanacak CSS sınıfları.
 * @param {string} wrapperClassName - Resmi saran <div> etiketine uygulanacak CSS sınıfları.
 * @param {string} [effect="blur"] - Tembel yükleme efekti (örn: "blur", "black-and-white").
 */
const LazyImage = ({ src, alt, className, wrapperClassName, effect = 'blur' }) => {
    return (
        <Suspense fallback={<ImagePlaceholder wrapperClassName={wrapperClassName} />}>
            <LazyLoadedImageComponent
                src={src}
                alt={alt}
                className={className}
                wrapperClassName={wrapperClassName}
                effect={effect}
            />
        </Suspense>
    );
};

export default LazyImage;
