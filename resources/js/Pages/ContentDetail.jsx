import React from 'react';
import { usePage, Link, Head } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation'; // Çeviri hook'u eklendi
import GuestLayout from '@/Layouts/GuestLayout';
import { useTheme } from '@/Context/ThemeContext';
import moment from 'moment';
import 'moment/locale/tr';
import LazyImage from '@/Components/LazyImage'; // LazyImage bileşenini import et
import { ChevronRight, Calendar, Tag, Clock, ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Separator } from '@/Components/ui/separator';

// Kenar çubuğu için bir bileşen
const Sidebar = ({ post, relatedPosts, allCategories, allDestinations, relatedTours, recentContents, destinationTours, destinationPosts }) => {
  const { t } = useTranslation();
  
  // İlgili destinasyon (post'un ilk destinasyonu)
  const relatedDestination = post?.destinations?.[0];
  
  return (
    <aside className="sidebar w-full lg:w-1/3 lg:pl-8 space-y-6">
      {/* İlgili Destinasyon */}
      {relatedDestination && (
        <div className="space-y-6">
          {/* Destinasyon Kartı */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <Link href={route('destinations.show', { slug: relatedDestination.slug })} className="group block">
                <div className="space-y-0">
                  {/* Destinasyon Görseli */}
                  <div className="relative overflow-hidden h-48">
                    <LazyImage 
                      src={relatedDestination.image?.original_url || relatedDestination.image_url || 'https://images.pexels.com/photos/3418464/pexels-photo-3418464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                      alt={relatedDestination.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      wrapperClassName="w-full h-full block"
                      effect="blur"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-foreground transition-colors">
                        {relatedDestination.name}
                      </h3>
                      {relatedDestination.summary && (
                        <p className="text-sm text-white/90">
                          {relatedDestination.summary}
                        </p>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <ArrowRight className="h-5 w-5 text-white group-hover:text-primary-foreground transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Bu Destinasyondaki Turlar */}
          {destinationTours && destinationTours.length > 0 && (
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3 px-3 pt-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {t('content_detail.sidebar.destination_tours', '{destination} Turları', { destination: relatedDestination.name })}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-3 pb-3">
                <div className="space-y-4">
                  {destinationTours.slice(0, 4).map((tour, index, array) => (
                    <div key={tour.id}>
                      <Link href={route('tour.show', { slug: tour.slug })} className="group block">
                        <div className="flex items-start gap-3">
                          <div className="relative overflow-hidden rounded-lg flex-shrink-0 w-16 h-16">
                            <LazyImage 
                              src={tour.image_thumbnail || 'https://placehold.co/80'} 
                              alt={tour.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              wrapperClassName="w-full h-full block"
                              effect="blur"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm leading-tight text-foreground group-hover:text-primary transition-colors">
                              {tour.title}
                            </h4>
                            {tour.duration && (
                              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{tour.duration} gün</span>
                              </div>
                            )}
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                      </Link>
                      {index < array.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bu Destinasyondaki Blog Yazıları */}
          {destinationPosts && destinationPosts.length > 0 && (
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3 px-3 pt-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  {t('content_detail.sidebar.destination_posts', '{destination} ile İlgili Yazılar', { destination: relatedDestination.name })}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-3 pb-3">
                <div className="space-y-4">
                  {destinationPosts.filter(p => p.id !== post.id).slice(0, 4).map((destPost, index, array) => (
                    <div key={destPost.id}>
                      <Link href={route('contents.show', { slug: destPost.slug })} className="group block">
                        <div className="flex items-start gap-3">
                          <div className="relative overflow-hidden rounded-lg flex-shrink-0 w-16 h-16">
                            <LazyImage 
                              src={destPost.image_thumbnail_url || 'https://placehold.co/80'} 
                              alt={destPost.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              wrapperClassName="w-full h-full block"
                              effect="blur"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm leading-tight text-foreground group-hover:text-primary transition-colors">
                              {destPost.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{moment(destPost.published_at).locale('tr').format('DD MMM')}</span>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                      </Link>
                      {index < array.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </aside>
  );
};


export default function ContentDetail({ seo }) {
  const { t } = useTranslation();
  // Gerekli propları usePage'den alıyoruz.
  const { post, relatedPosts, allCategories, allDestinations, relatedTours, recentContents, destinationTours, destinationPosts } = usePage().props;

  // Eğer post verisi yoksa, kullanıcıya bir bilgilendirme mesajı gösteriyoruz.
  if (!post) {
    return (
      <GuestLayout>
        <div className={`bg-background text-foreground min-h-screen flex items-center justify-center`}>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t('content_detail.not_found.title', 'İçerik Bulunamadı')}</h1>
            <p className="text-muted-foreground">{t('content_detail.not_found.text', 'Aradığınız içerik mevcut değil veya silinmiş olabilir.')}</p>
            <Link href={route('home')} className="mt-6 inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/80 transition-colors">
              {t('content_detail.not_found.go_home', 'Ana Sayfaya Dön')}
            </Link>
          </div>
        </div>
      </GuestLayout>
    );
  }

  // Schema.org structured data for BlogPosting
  const articleSchema = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.summary,
    "image": post.image_original_url,
    "datePublished": post.published_at,
    "dateModified": post.updated_at || post.published_at,
    "author": {
      "@type": "Organization",
      "name": "Turquiana"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Turquiana",
      "logo": {
        "@type": "ImageObject",
        "url": "https://turquiana.com/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": typeof window !== 'undefined' ? window.location.href : ''
    }
  } : null;

  return (
    <GuestLayout seo={seo}>
      {articleSchema && (
        <Head>
          <script type="application/ld+json">
            {JSON.stringify(articleSchema)}
          </script>
        </Head>
      )}
      <div className={`content-detail-page bg-background text-foreground`}>
        
        {/* Hero Section: İçeriğin başlığını ve öne çıkan görselini gösterir. */}
        <section className="content-hero-section relative h-[50vh] flex items-end p-8 text-white">
          {/* LCP Optimizasyonu: Arka plan resmi yerine yüksek öncelikli bir <img> etiketi kullanılıyor. */}
          <img
            src={post.image_original_url || 'https://placehold.co/1200x600'}
            alt={post.title}
            fetchpriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <h1 className="content-title text-4xl md:text-6xl font-extrabold leading-tight mb-2 font-playfair">
              {post.title}
            </h1>
            <div className="content-meta flex flex-wrap gap-x-4 gap-y-2 items-center text-sm text-gray-300">
              <span className="meta-date flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {moment(post.published_at).locale('tr').format('DD MMMM YYYY')}
              </span>
              {post.destinations?.map(destination => (
                <Link key={destination.id} href={route('destinations.show', { slug: destination.slug })} className="meta-destination-tag hover:text-primary transition-colors flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {destination.name}
                </Link>
              ))}
              {post.content_categories?.map(cat => (
                <Link key={cat.id} href={route('contents.index', { category: cat.slug })} className="meta-category-tag hover:text-primary transition-colors flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Ana İçerik ve Kenar Çubuğu */}
        <div className="main-content-area max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-3">
            
            {/* Makale İçeriği */}
            <main className="content-body w-full lg:w-3/4">
              <article className="bg-card rounded-lg border border-border p-6 md:p-8 shadow-sm">
                {post.summary && (
                  <p className="summary-text text-lg italic text-muted-foreground border-l-4 border-primary pl-4 mb-8">
                    {post.summary}
                  </p>
                )}
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none text-foreground/90" 
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
              </article>
            </main>
            
            {/* Kenar Çubuğu */}
            <Sidebar 
              post={post}
              relatedPosts={relatedPosts}
              allCategories={allCategories}
              allDestinations={allDestinations}
              relatedTours={relatedTours}
              recentContents={recentContents}
              destinationTours={destinationTours}
              destinationPosts={destinationPosts}
            />
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
