import React from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, usePage } from '@inertiajs/react';

export default function Guest({ children, seo = {} }) {
    const { canonical } = usePage().props;

    return (
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                {canonical && <link rel="canonical" href={canonical} />}
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={seo.og_url} />
                <meta property="og:title" content={seo.og_title} />
                <meta property="og:description" content={seo.og_description} />
                {seo.og_image && <meta property="og:image" content={seo.og_image} />}

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={seo.og_url} />
                <meta property="twitter:title" content={seo.og_title} />
                <meta property="twitter:description" content={seo.og_description} />
                {seo.og_image && <meta property="twitter:image" content={seo.og_image} />}
                
                {/* Schema.org Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TravelAgency",
                        "name": "Turquiana",
                        "description": "La mejor agencia de turismo cultural en Turquía",
                        "url": "https://turquiana.com",
                        "logo": "https://turquiana.com/images/logo.png",
                        "image": "https://turquiana.com/images/hero.jpg",
                        "telephone": "+90 536 658 3468",
                        "email": "info@turquiana.com",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Alemdar, İncili Çavuş Sk. No:13",
                            "addressLocality": "Fatih",
                            "addressRegion": "Estambul",
                            "postalCode": "34110",
                            "addressCountry": "TR"
                        },
                        "sameAs": [
                            "https://www.facebook.com/turquiana",
                            "https://www.instagram.com/turquiana",
                            "https://www.twitter.com/turquiana"
                        ],
                        "priceRange": "€€€",
                        "openingHours": "Lu-Vi 09:00-18:00, Sa 09:00-14:00",
                        "paymentAccepted": ["Efectivo", "Tarjeta de Crédito", "Transferencia Bancaria"],
                        "currenciesAccepted": "EUR,USD,TRY",
                        "availableLanguage": ["Turco", "Inglés", "Español"]
                    })}
                </script>
            </Head>
            
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
