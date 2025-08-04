import React, { Suspense, lazy } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyLoadedImageComponent = lazy(() => {
    // Sadece istemci tarafında çalışmasını garantile
    if (typeof window !== 'undefined') {
        return import('react-lazy-load-image-component').then(module => ({ default: module.LazyLoadImage }));
    }
    // Sunucu tarafında null döndürerek render edilmesini engelle
    return Promise.resolve({ default: () => null });
});

const ImagePlaceholder = ({ wrapperClassName }) => (
    <div className={wrapperClassName}>
        <div className="w-full h-full bg-gray-200 rounded-md animate-pulse"></div>
    </div>
);

const LazyImage = ({ src, alt, className, wrapperClassName, effect = 'blur' }) => {
    const isSsr = typeof window === 'undefined';

    if (isSsr) {
        return <ImagePlaceholder wrapperClassName={wrapperClassName} />;
    }

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
