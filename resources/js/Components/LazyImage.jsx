import React, { Suspense } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Bu bileşen, hem sunucu tarafı render (SSR) sırasında hem de istemci tarafında
// resim yüklenirken gösterilecek olan yer tutucudur (placeholder).
const ImagePlaceholder = ({ wrapperClassName }) => (
    <div className={wrapperClassName}>
        <div className="w-full h-full bg-gray-200 rounded-md animate-pulse"></div>
    </div>
);

// LazyLoadImage değişkenini başlangıçta tanımsız bırakıyoruz.
let LazyLoadImage;

// Kodun sadece istemci tarafında (tarayıcıda) çalışıp çalışmadığını kontrol ediyoruz.
// `typeof window !== 'undefined'` kontrolü, bu bloğun sunucuda asla çalışmamasını sağlar.
if (typeof window !== 'undefined') {
    // Eğer istemci tarafındaysak, 'react-lazy-load-image-component' kütüphanesini
    // React.lazy kullanarak dinamik olarak yüklüyoruz.
    LazyLoadImage = React.lazy(() => 
        import('react-lazy-load-image-component').then(module => ({ default: module.LazyLoadImage }))
    );
}

/**
 * Proje genelinde kullanılacak olan, SSR uyumlu, tembel yüklemeli (lazy-loaded) resim bileşeni.
 */
const LazyImage = ({ src, alt, className, wrapperClassName, effect = 'blur' }) => {
    // Sunucu tarafı render sırasında, LazyLoadImage değişkeni tanımsız (undefined) olacaktır.
    // Bu durumda, React.lazy'i hiç çalıştırmadan doğrudan yer tutucuyu döndürüyoruz.
    // Bu, sunucudaki "undefined component" hatasını kesin olarak önler.
    if (!LazyLoadImage) {
        return <ImagePlaceholder wrapperClassName={wrapperClassName} />;
    }

    // İstemci tarafında ise, LazyLoadImage tanımlı olduğu için,
    // Suspense ile birlikte asıl tembel yüklemeli bileşeni render ediyoruz.
    return (
        <Suspense fallback={<ImagePlaceholder wrapperClassName={wrapperClassName} />}>
            <LazyLoadImage
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
