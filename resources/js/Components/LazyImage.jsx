import React, { useState, useEffect } from 'react';
// CommonJS modülü olduğu için ve SSR sırasında sorun çıkardığı için,
// paketi varsayılan olarak içe aktarıp, ardından bileşeni içinden alıyoruz.
// Bu, 'Named export 'LazyLoadImage' not found' hatasını çözer.
// Vite'ın geliştirme sunucusunda CommonJS modüllerini işlemesiyle ilgili sorunları
// çözmek için namespace importu (* as) kullanıyoruz.
import * as LazyLoadImagePkg from 'react-lazy-load-image-component';

// Paketin yapısına göre LazyLoadImage'i alıyoruz.
// Geliştirme (dev) ve üretim (build) ortamlarındaki farklılıkları ele almak için
// birden fazla olası yapıyı kontrol ediyoruz.
const LazyLoadImage = LazyLoadImagePkg.LazyLoadImage || LazyLoadImagePkg.default || LazyLoadImagePkg;
import 'react-lazy-load-image-component/src/effects/blur.css';

// Resim yüklenirken veya sunucu tarafında gösterilecek yer tutucu.
const ImagePlaceholder = ({ wrapperClassName }) => (
    <div className={wrapperClassName}>
        <div className="w-full h-full bg-gray-200 rounded-md animate-pulse"></div>
    </div>
);

/**
 * SSR uyumlu, sadece istemci tarafında aktif olan "tembel yükleme" resim bileşeni.
 * Bu yöntem, React'in "useEffect" hook'unu kullanarak bileşenin sadece tarayıcıda
 * render edilmesini garanti eder. Sunucu tarafında ise bir yer tutucu gösterilir.
 */
const LazyImage = (props) => {
    // Başlangıçta bileşenin "monte edilmediğini" varsayıyoruz. Bu, sunucu tarafında her zaman false olacaktır.
    const [isMounted, setIsMounted] = useState(false);

    // useEffect, sadece istemci tarafında (tarayıcıda) çalışır.
    // Bileşen tarayıcıda monte edildiğinde, isMounted durumunu true yaparız.
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Eğer bileşen henüz monte edilmediyse (yani sunucudaysak), sadece yer tutucuyu gösteririz.
    // Bu, sunucu tarafında `LazyLoadImage` bileşeninin render edilmesini önler.
    if (!isMounted) {
        return <ImagePlaceholder wrapperClassName={props.wrapperClassName} />;
    }

    // Bileşen istemci tarafında monte edildikten sonra, asıl tembel yüklemeli bileşeni render ederiz.
    return (
        <LazyLoadImage {...props} />
    );
};

export default LazyImage;
