import React, { useState } from 'react';

const SimpleLightbox = ({ isOpen, onClose, images, currentIndex, onNavigate }) => {
    if (!isOpen) return null;

    const [touchStartX, setTouchStartX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false); // Kaydırma durumunu takip etmek için

    const currentImage = images[currentIndex];

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
        setIsSwiping(false); // Başlangıçta kaydırma yok
    };

    const handleTouchMove = (e) => {
        // Sadece yatay kaydırma için varsayılan davranışı engelle
        if (Math.abs(e.touches[0].clientX - touchStartX) > Math.abs(e.touches[0].clientY - e.touches[0].clientY)) {
            e.preventDefault();
            setIsSwiping(true);
        }
    };

    const handleTouchEnd = (e) => {
        if (isSwiping) { // Sadece kaydırma yapıldıysa işlem yap
            const touchEndX = e.changedTouches[0].clientX;
            const deltaX = touchEndX - touchStartX;

            if (deltaX > 75) { // Sağa kaydırma (önceki görsel) - eşiği biraz artırdık
                onNavigate('prev');
            } else if (deltaX < -75) { // Sola kaydırma (sonraki görsel) - eşiği biraz artırdık
                onNavigate('next');
            }
        }
        setIsSwiping(false);
    };

    return (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
            }}
            onClick={onClose} // Overlay'a tıklayınca kapanması için
        >
            {/* Close Button */}
            <button 
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    zIndex: 10000,
                }}
                onClick={onClose}
            >
                &times;
            </button>

            {currentImage && (
                <img 
                    src={currentImage.src}
                    alt={currentImage.alt}
                    style={{
                        maxWidth: '90%',
                        maxHeight: '80%',
                        objectFit: 'contain',
                        margin: 'auto',
                    }}
                    onClick={(e) => e.stopPropagation()} // Görsele tıklayınca kapanmaması için
                    onTouchStart={handleTouchStart} // Dokunma olayları ekleniyor
                    onTouchMove={handleTouchMove} // Hareket sırasında varsayılanı engelle
                    onTouchEnd={handleTouchEnd} 
                />
            )}

            {/* Navigation Buttons */}
            {images.length > 1 && (
                <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
                    <button 
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            color: 'white',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            padding: '10px 15px',
                            borderRadius: '50%',
                        }}
                        onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
                    >
                        &lt;
                    </button>
                    <button 
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            color: 'white',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            padding: '10px 15px',
                            borderRadius: '50%',
                        }}
                        onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </div>
    );
};

export default SimpleLightbox; 