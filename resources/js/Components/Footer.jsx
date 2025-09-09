import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation'; // Çeviri hook'u eklendi
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const { recentPosts } = usePage().props;

  return (
    <footer className="bg-card border-t border-border text-foreground pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          
          {/* Şirket Tanıtımı - 1. sırada */}
          <div className="footer-about-section">
            <h3 className="text-2xl font-bold mb-4 font-playfair text-primary">Turquiana</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t('footer.about_text', "Türkiye'nin eşsiz güzelliklerini keşfetmeniz için unutulmaz seyahat deneyimleri tasarlıyoruz. Bizimle keşfedin, anı biriktirin.")}
            </p>
            <div className="flex space-x-4 mt-6">
                {/* Erişilebilirlik için aria-label eklendi */}
                <a href="#" aria-label={t('footer.social.facebook', 'Facebook')} className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
                <a href="#" aria-label={t('footer.social.twitter', 'Twitter')} className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
                <a href="#" aria-label={t('footer.social.instagram', 'Instagram')} className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
                <a href="#" aria-label={t('footer.social.linkedin', 'Linkedin')} className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Hızlı Bağlantılar - 2. sırada */}
          <div className="footer-links-section">
            <h4 className="text-xl font-semibold mb-4">{t('footer.quick_links.title', 'Hızlı Bağlantılar')}</h4>
            <ul className="space-y-3">
              <li><Link href={route('home')} className="text-muted-foreground hover:text-primary transition-colors">{t('navbar.home', 'Ana Sayfa')}</Link></li>
              <li><Link href={route('tours.index')} className="text-muted-foreground hover:text-primary transition-colors">{t('navbar.tours', 'Turlar')}</Link></li>
              <li><Link href={route('destinations.index')} className="text-muted-foreground hover:text-primary transition-colors">{t('navbar.destinations', 'Destinasyonlar')}</Link></li>
              <li><Link href={route('about.us')} className="text-muted-foreground hover:text-primary transition-colors">{t('navbar.about_us', 'Hakkımızda')}</Link></li>
              <li><Link href={route('contact.us')} className="text-muted-foreground hover:text-primary transition-colors">{t('navbar.contact', 'İletişim')}</Link></li>
            </ul>
          </div>

          {/* Son Blog Yazıları - 3. sırada */}
          <div className="footer-recent-posts-section">
            <h4 className="text-xl font-semibold mb-4">{t('footer.recent_posts.title', 'Son Blog Yazıları')}</h4>
            {recentPosts && recentPosts.length > 0 ? (
              <ul className="space-y-3">
                {recentPosts.map(post => (
                  <li key={post.id} className="group">
                    <Link 
                      href={route('contents.show', { slug: post.slug })} 
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors group-hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">{t('footer.recent_posts.no_posts', 'Blog yazısı bulunamadı.')}</p>
            )}
          </div>

          {/* İletişim - 4. sırada */}
          <div className="footer-contact-section">
            <h4 className="text-xl font-semibold mb-4">{t('footer.contact.title', 'Bize Ulaşın')}</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="font-semibold mr-2">{t('footer.contact.address', 'Adres')}:</span>
                <span>Kızılay, Ankara, Türkiye</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">{t('footer.contact.email', 'Email')}:</span>
                <a href="mailto:info@turquiana.com" className="hover:text-primary transition-colors">info@turquiana.com</a>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">{t('footer.contact.phone', 'Telefon')}:</span>
                <a href="http://wa.me/905366583468" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">+90 536 658 34 68</a>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Alt Kısım */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p className="mb-2">{t('footer.brand_info', "Turquiana y Pride Travel Agency son marcas oficiales de BHN MAVI TURIZM.")}</p>
          <p>&copy; {new Date().getFullYear()} Turquiana. {t('footer.rights_reserved', 'Tüm Hakları Saklıdır.')} </p>
        </div>
      </div>
    </footer>
  );
}