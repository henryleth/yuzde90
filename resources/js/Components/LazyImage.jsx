import React, { useState, useEffect, Suspense, lazy } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Resim yüklenirken veya sunucu tarafında gösterilecek yer tutucu.
const ImagePlaceholder = ({ wrapperClassName }) => (
    <div className={wrapperClassName}>
        <div className="w-full h-full bg-gray-200 rounded-md animate-pulse"></div>
    </div>
);

// Bileşeni sadece istemci tarafında dinamik olarak yüklüyoruz.
const LazyLoadedImageComponent = lazy(() => 
    import('react-lazy-load-image-component').then(module => ({ default: module.LazyLoadImage }))
);

/**
 * SSR uyumlu, sadece istemci tarafında aktif olan "tembel yükleme" resim bileşeni.
 * Bu yöntem, React'in "useEffect" hook'unu kullanarak bileşenin sadece tarayıcıda
 * render edilmesini garanti eder.
 */
const LazyImage = (props) => {
    // Başlangıçta bileşenin "monte edilmediğini" varsayıyoruz.
    const [isMounted, setIsMounted] = useState(false);

    // useEffect, sadece istemci tarafında (tarayıcıda) çalışır.
    // Bileşen tarayıcıda monte edildiğinde, isMounted durumunu true yaparız.
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Eğer bileşen henüz monte edilmediyse (yani sunucudaysak veya 
    // tarayıcıdaki ilk render anındaysak), sadece yer tutucuyu gösteririz.
    // Bu, sunucudaki hatayı kesin olarak önler.
    if (!isMounted) {
        return <ImagePlaceholder wrapperClassName={props.wrapperClassName} />;
    }

    // Bileşen istemci tarafında monte edildikten sonra, asıl tembel yüklemeli
    // bileşeni Suspense ile birlikte render ederiz.
    return (
        <Suspense fallback={<ImagePlaceholder wrapperClassName={props.wrapperClassName} />}>
            <LazyLoadedImageComponent {...props} />
        </Suspense>
    );
};

export default LazyImage;