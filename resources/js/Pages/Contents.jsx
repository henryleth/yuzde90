import { useTheme } from '@/Context/ThemeContext';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation'; // Çeviri hook'u eklendi
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { Link, usePage, router } from '@inertiajs/react';
import moment from 'moment';
import 'moment/locale/tr';
import GuestLayout from '@/Layouts/GuestLayout';
import LazyImage from '@/Components/LazyImage'; // LazyImage bileşenini import et
import { Tag, MapPin } from 'lucide-react';

export default function Contents({ seo }) {
  const { t } = useTranslation();
  const { posts: backendPosts, categories: backendCategories, destinations: backendDestinations, filters } = usePage().props;

  const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
  const [selectedDestination, setSelectedDestination] = useState(filters.destination || 'all');
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  const posts = backendPosts.data;
  const paginationLinks = backendPosts.links;

  const categories = [{ name: t('contents_page.filters.all', 'Tümü'), slug: 'all' }, ...backendCategories];
  const destinations = [{ name: t('contents_page.filters.all', 'Tümü'), slug: 'all' }, ...backendDestinations];

  const applyFilters = () => {
    const queryParams = {};
    if (selectedCategory !== 'all') {
      queryParams.category = selectedCategory;
    }
    if (selectedDestination !== 'all') {
      queryParams.destination = selectedDestination;
    }
    if (searchQuery) {
        queryParams.search = searchQuery;
    }
    router.get(route('contents.index'), queryParams, { preserveState: true, replace: true });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
        applyFilters();
    }
  };

  return (
    <GuestLayout seo={seo}>
      <div className={`blog-page bg-background text-foreground min-h-screen`}> 
        {/* Blog Hero Section */}
        <section className="blog-hero-section relative h-[40vh] md:h-[50vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: `url(${posts[0]?.image?.original_url || 'https://images.pexels.com/photos/3418464/pexels-photo-3418464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'})` }}>
            <div className="absolute inset-0 bg-black/60 blog-hero-overlay"></div>
            <div className="relative z-10 text-white p-4 max-w-4xl mx-auto blog-hero-content">
                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 font-playfair">
                      {t('contents_page.hero.title', 'Blog')}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 opacity-0 animate-fade-in-up animation-delay-300">
                      {t('contents_page.hero.subtitle', 'Seyahat dünyasından en güncel haberler, ipuçları ve ilham verici hikayeler.')}
                  </p>
              </div>
          </section>

        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8"> {/* Ana içerik ve sidebar için grid düzeni */}
          {/* Filtreler Sidebar */}
          <aside className="lg:col-span-1">
            <section className="blog-filters-section py-8 lg:py-0 border-b border-border lg:border-b-0 sticky top-24"> {/* Sidebar'ı sticky yapıyoruz */}
                <div className="md:hidden"> 
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="blog-filters">
                            <AccordionTrigger className="blog-accordion-trigger px-4 py-3 bg-card text-foreground font-semibold rounded-t-lg border border-b-0 border-border">
                                {t('contents_page.filters.mobile_title', 'Blog Filtreleri')}
                            </AccordionTrigger>
                            <AccordionContent className="blog-accordion-content bg-card border border-b-0 border-border p-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="blog-search-input-wrapper space-y-2">
                                        <Label htmlFor="search-input" className="block text-sm font-medium text-muted-foreground">{t('contents_page.filters.search', 'Arama')}</Label>
                                        <Input
                                            id="search-input"
                                            type="text"
                                            placeholder={t('contents_page.filters.search_placeholder', 'Yazı başlığında ara...')}
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            onKeyDown={handleSearchSubmit}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                    <div className="blog-category-filter-wrapper space-y-2">
                                        <Label htmlFor="category-filter" className="block text-sm font-medium text-muted-foreground">{t('contents_page.filters.category', 'Kategori')}</Label>
                                        <Select
                                            value={selectedCategory}
                                            onValueChange={(value) => {
                                                setSelectedCategory(value);
                                            }}
                                        >
                                            <SelectTrigger
                                                id="category-filter"
                                                className="inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-3 py-2"
                                            >
                                                <SelectValue placeholder={t('contents_page.filters.category_placeholder', 'Kategori seçin')} className="text-muted-foreground" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map(cat => (
                                                    <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="blog-destination-filter-wrapper space-y-2">
                                        <Label htmlFor="destination-filter" className="block text-sm font-medium text-muted-foreground">{t('contents_page.filters.destination', 'Destinasyon')}</Label>
                                        <Select
                                            value={selectedDestination}
                                            onValueChange={(value) => {
                                                setSelectedDestination(value);
                                            }}
                                        >
                                            <SelectTrigger
                                                id="destination-filter"
                                                className="inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-3 py-2"
                                            >
                                                <SelectValue placeholder={t('contents_page.filters.destination_placeholder', 'Destinasyon seçin')} className="text-muted-foreground" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {destinations.map(dest => (
                                                    <SelectItem key={dest.slug} value={dest.slug}>{dest.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSearchSubmit}
                                    className="blog-filter-button mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-semibold transition-colors"
                                >
                                    {t('contents_page.filters.filter_button', 'Filtrele')}
                                </button>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

              {/* Filtreleme ve Arama Bölümü - Masaüstü için Card */}
              <Card className="blog-filter-card hidden md:block">
                  <CardHeader className="blog-filter-header">
                      <CardTitle className="blog-filter-title text-2xl">{t('contents_page.filters.desktop_title', 'Filter and Search')}</CardTitle>
                  </CardHeader>
                  <CardContent className="blog-filter-content">
                      <div className="grid grid-cols-1 gap-4">
                          <div className="blog-search-input-wrapper space-y-2">
                              <Label htmlFor="search-input" className="block text-sm font-medium text-muted-foreground">{t('contents_page.filters.search', 'Search')}</Label>
                              <Input
                                  id="search-input"
                                  type="text"
                                  placeholder={t('contents_page.filters.search_placeholder', 'Yazı başlığında ara...')}
                                  value={searchQuery}
                                  onChange={handleSearchChange}
                                  onKeyDown={handleSearchSubmit}
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                          </div>
                          <div className="blog-category-filter-wrapper space-y-2">
                              <Label htmlFor="category-filter" className="block text-sm font-medium text-muted-foreground">{t('contents_page.filters.category', 'Kategori')}</Label>
                              <Select
                                  value={selectedCategory}
                                  onValueChange={(value) => {
                                      setSelectedCategory(value);
                                  }}
                              >
                                  <SelectTrigger
                                      id="category-filter"
                                      className="inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-3 py-2"
                                  >
                                      <SelectValue placeholder={t('contents_page.filters.category_placeholder', 'Kategori seçin')} className="text-muted-foreground" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      {categories.map(cat => (
                                          <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                                      ))}
                                  </SelectContent>
                              </Select>
                          </div>
                          <div className="blog-destination-filter-wrapper space-y-2">
                              <Label htmlFor="destination-filter" className="block text-sm font-medium text-muted-foreground">{t('contents_page.filters.destination', 'Destinasyon')}</Label>
                              <Select
                                  value={selectedDestination}
                                  onValueChange={(value) => {
                                      setSelectedDestination(value);
                                  }}
                              >
                                  <SelectTrigger
                                      id="destination-filter"
                                      className="inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-3 py-2"
                                  >
                                      <SelectValue placeholder={t('contents_page.filters.destination_placeholder', 'Destinasyon seçin')} className="text-muted-foreground" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      {destinations.map(dest => (
                                          <SelectItem key={dest.slug} value={dest.slug}>{dest.name}</SelectItem>
                                      ))}
                                  </SelectContent>
                              </Select>
                          </div>
                      </div>
                      <button
                          onClick={handleSearchSubmit}
                          className="blog-filter-button mt-4 w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-semibold transition-colors"
                      >
                          {t('contents_page.filters.filter_button', 'Filtrele')}
                      </button>
                  </CardContent>
              </Card>
            </section>
          </aside>

          {/* Ana İçerik */}
          <main className="lg:col-span-3">
            {/* Blog Yazıları Listesi */}
            {posts.length > 0 ? (
                <div className="blog-posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post.id} className="blog-post-card bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group">
                            {/* Blog Kart Görseli (Tıklanabilir) */}
                            <Link href={route('contents.show', { slug: post.slug })} className="blog-post-image-link block relative w-full h-48 overflow-hidden">
                                <LazyImage
                                    src={post.image?.thumbnail_url || 'https://placehold.co/600x400?text=Görsel+Bulunamadı'}
                                    alt={post.title}
                                    className="blog-post-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    wrapperClassName="w-full h-48"
                                    effect="blur"
                                />
                            </Link>

                            <div className="blog-post-content p-4">
                                {/* Başlık (Tıklanabilir) */}
                                <Link href={route('contents.show', { slug: post.slug })} className="blog-post-title-link block">
                                    <h2 className="blog-post-title text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{post.title}</h2>
                                </Link>
                                <p className="blog-post-summary text-muted-foreground text-sm mb-3">
                                  {post.summary && post.summary.length > 0
                                    ? post.summary.substring(0, 150) + (post.summary.length > 150 ? '...' : '')
                                    : t('contents_page.card.no_summary', 'Bu blog yazısı için özet bulunmamaktadır.')
                                  }
                                </p>

                                {/* Kategori ve Konum Etiketleri - Kartın altına taşındı */}
                                <div className="blog-post-meta flex flex-wrap gap-2 items-center text-xs text-muted-foreground mt-4">
                                    {post.content_categories.map(cat => (
                                        <span key={cat.id} className="blog-category-tag bg-muted rounded-full px-2 py-1 flex items-center">
                                            <Tag className="h-3 w-3 mr-1 text-primary" />
                                            {cat.name}
                                        </span>
                                    ))}
                                    {post.destinations.map(dest => (
                                        <span key={dest.id} className="blog-destination-tag bg-muted rounded-full px-2 py-1 flex items-center">
                                            <MapPin className="h-3 w-3 mr-1 text-secondary" />
                                            {dest.name}
                                        </span>
                                    ))}
                                </div>

                                <div className="blog-post-date-readtime flex items-center justify-between text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                                    <p>{moment(post.published_at).locale('tr').format('DD MMMM YYYY')}</p>
                                    {post.content && (
                                        <p>{t('contents_page.card.reading_time', '{minutes} min read', { minutes: Math.ceil(post.content.split(' ').length / 200) })}</p>
                                    )}
                                </div>
                                <Link href={route('contents.show', { slug: post.slug })} className="blog-read-more-link inline-flex items-center mt-4 text-primary hover:underline text-sm font-medium transition-colors">
                                    {t('contents_page.card.read_more', 'Devamını Oku')} <span className="ml-1">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="blog-no-posts-message text-center text-muted-foreground text-lg mt-8">{t('contents_page.no_posts_found', 'Hiç blog yazısı bulunamadı.')}</p>
            )}

            {/* Pagination */} 
            {paginationLinks && paginationLinks[0] && paginationLinks.length > 3 && ( 
                <div className="blog-pagination flex justify-center mt-8 space-x-2">
                    {paginationLinks.map((link, index) => (
                        <Link
                            key={link.label || index}
                            href={link.url || '#'}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${link.active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                            preserveScroll
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
          </main>
        </div>
      </div>
    </GuestLayout>
  );
}
