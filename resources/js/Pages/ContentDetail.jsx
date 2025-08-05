import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useTheme } from '@/Context/ThemeContext';
import moment from 'moment';
import 'moment/locale/tr';
import LazyImage from '@/Components/LazyImage'; // LazyImage bileşenini import et
import { ChevronRight, Calendar, Tag } from 'lucide-react';

// Kenar çubuğu için bir bileşen
const Sidebar = ({ relatedPosts, allCategories, allDestinations, relatedTours, recentContents }) => (
  <aside className="sidebar w-full lg:w-1/3 lg:pl-8">
    {/* İlgili Yazılar */}
    {relatedPosts && relatedPosts.length > 0 && (
      <div className="sidebar-widget mb-8 bg-card p-4 rounded-lg border border-border shadow-sm">
        <h3 className="sidebar-widget-title text-xl font-bold mb-4 text-foreground">İlgili Yazılar</h3>
        <ul className="sidebar-post-list space-y-4">
          {relatedPosts.map(post => (
            <li key={post.id} className="sidebar-post-item flex items-center">
              <Link href={route('contents.show', post.slug)} className="flex items-center group">
                <LazyImage 
                  src={post.image_thumbnail_url || 'https://via.placeholder.com/80'} 
                  alt={post.title} 
                  className="w-16 h-16 object-cover rounded-md mr-4 group-hover:opacity-80 transition-opacity"
                  wrapperClassName="w-16 h-16"
                  effect="blur"
                />
                <span className="font-semibold text-muted-foreground group-hover:text-primary transition-colors">{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* İlgili Turlar */}
    {relatedTours && relatedTours.length > 0 && (
      <div className="sidebar-widget mb-8 bg-card p-4 rounded-lg border border-border shadow-sm">
        <h3 className="sidebar-widget-title text-xl font-bold mb-4 text-foreground">İlgili Turlar</h3>
        <ul className="sidebar-post-list space-y-4">
          {relatedTours.map(tour => (
            <li key={tour.id} className="sidebar-post-item flex items-center">
              <Link href={route('tour.show', tour.slug)} className="flex items-center group">
                <LazyImage 
                  src={tour.image_thumbnail || 'https://via.placeholder.com/80'} 
                  alt={tour.title} 
                  className="w-16 h-16 object-cover rounded-md mr-4 group-hover:opacity-80 transition-opacity"
                  wrapperClassName="w-16 h-16"
                  effect="blur"
                />
                <span className="font-semibold text-muted-foreground group-hover:text-primary transition-colors">{tour.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Son İçerikler */}
    {recentContents && recentContents.length > 0 && (
      <div className="sidebar-widget mb-8 bg-card p-4 rounded-lg border border-border shadow-sm">
        <h3 className="sidebar-widget-title text-xl font-bold mb-4 text-foreground">Son İçerikler</h3>
        <ul className="sidebar-post-list space-y-4">
          {recentContents.map(content => (
            <li key={content.id} className="sidebar-post-item flex items-center">
              <Link href={route('contents.show', content.slug)} className="flex items-center group">
                <LazyImage 
                  src={content.image_thumbnail || 'https://via.placeholder.com/80'} 
                  alt={content.title} 
                  className="w-16 h-16 object-cover rounded-md mr-4 group-hover:opacity-80 transition-opacity"
                  wrapperClassName="w-16 h-16"
                  effect="blur"
                />
                <span className="font-semibold text-muted-foreground group-hover:text-primary transition-colors">{content.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Kategoriler */}
    {allCategories && allCategories.length > 0 && (
      <div className="sidebar-widget mb-8 bg-card p-4 rounded-lg border border-border shadow-sm">
        <h3 className="sidebar-widget-title text-xl font-bold mb-4 text-foreground">Kategoriler</h3>
        <ul className="sidebar-category-list space-y-2">
          {allCategories.map(category => (
            <li key={category.id}>
              <Link 
                href={route('contents.index', { category: category.slug })}
                className="sidebar-category-link text-muted-foreground hover:text-primary transition-colors flex justify-between items-center"
              >
                {category.name}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Destinasyonlar */}
    {allDestinations && allDestinations.length > 0 && (
        <div className="sidebar-widget bg-card p-4 rounded-lg border border-border shadow-sm">
            <h3 className="sidebar-widget-title text-xl font-bold mb-4 text-foreground">Destinasyonlar</h3>
            <div className="flex flex-wrap gap-2">
                {allDestinations.map(destination => (
                    <Link 
                        key={destination.id}
                        href={route('destinations.show', destination.slug)}
                        className="sidebar-destination-tag bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground px-3 py-1 rounded-full text-sm transition-colors"
                    >
                        {destination.name}
                    </Link>
                ))}
            </div>
        </div>
    )}
  </aside>
);


export default function ContentDetail({ seo }) {
  // Gerekli propları usePage'den alıyoruz.
  const { post, relatedPosts, allCategories, allDestinations, relatedTours, recentContents } = usePage().props;

  // Eğer post verisi yoksa, kullanıcıya bir bilgilendirme mesajı gösteriyoruz.
  if (!post) {
    return (
      <GuestLayout>
        <div className={`bg-background text-foreground min-h-screen flex items-center justify-center`}>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">İçerik Bulunamadı</h1>
            <p className="text-muted-foreground">Aradığınız içerik mevcut değil veya silinmiş olabilir.</p>
            <Link href={route('home')} className="mt-6 inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/80 transition-colors">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </GuestLayout>
    );
  }

  return (
    <GuestLayout seo={seo}>
      <div className={`content-detail-page bg-background text-foreground`}>
        
        {/* Hero Section: İçeriğin başlığını ve öne çıkan görselini gösterir. */}
        <section 
          className="content-hero-section relative bg-cover bg-center h-[50vh] flex items-end p-8 text-white"
          style={{ backgroundImage: `url(${post.image_original_url || 'https://via.placeholder.com/1200x600'})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <h1 className="content-title text-4xl md:text-6xl font-extrabold leading-tight mb-2 font-playfair">
              {post.title}
            </h1>
            <div className="content-meta flex flex-wrap gap-x-4 gap-y-2 items-center text-sm text-gray-300">
              <span className="meta-date flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {moment(post.published_at).locale('tr').format('DD MMMM YYYY')}
              </span>
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
          <div className="flex flex-col lg:flex-row gap-8">
            
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
              relatedPosts={relatedPosts}
              allCategories={allCategories}
              allDestinations={allDestinations}
              relatedTours={relatedTours}
              recentContents={recentContents}
            />
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
