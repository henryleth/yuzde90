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
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

            </Head>
            
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
