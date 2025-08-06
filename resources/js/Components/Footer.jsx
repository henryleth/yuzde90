import React from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation'; // Çeviri hook'u eklendi
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border text-foreground pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Şirket Tanıtımı */}
          <div className="footer-about-section">
            <h3 className="text-2xl font-bold mb-4 font-playfair text-primary">Tur10</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t('footer.about_text', "Türkiye'nin eşsiz güzelliklerini keşfetmeniz için unutulmaz seyahat deneyimleri tasarlıyoruz. Bizimle keşfedin, anı biriktirin.")}
            </p>
            <div className="flex space-x-4 mt-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Hızlı Bağlantılar */}
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

          {/* İletişim */}
          <div className="footer-contact-section">
            <h4 className="text-xl font-semibold mb-4">{t('footer.contact.title', 'Bize Ulaşın')}</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="font-semibold mr-2">{t('footer.contact.address', 'Adres')}:</span>
                <span>Kızılay, Ankara, Türkiye</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">{t('footer.contact.email', 'Email')}:</span>
                <a href="mailto:info@tur10.com" className="hover:text-primary transition-colors">info@tur10.com</a>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">{t('footer.contact.phone', 'Telefon')}:</span>
                <a href="tel:+905551234567" className="hover:text-primary transition-colors">+90 555 123 45 67</a>
              </li>
            </ul>
          </div>

          {/* E-Bülten */}
          <div className="footer-newsletter-section">
            <h4 className="text-xl font-semibold mb-4">{t('footer.newsletter.title', 'Fırsatlardan Haberdar Olun')}</h4>
            <p className="text-muted-foreground mb-4">{t('footer.newsletter.subtitle', 'Yeni turlarımızdan ve özel indirimlerden ilk siz haberdar olun.')}</p>
            <form className="flex items-center">
              <Input type="email" placeholder={t('footer.newsletter.placeholder', 'E-posta adresiniz')} className="bg-input rounded-r-none" />
              <Button type="submit" className="rounded-l-none" aria-label={t('footer.newsletter.subscribe_button', 'Abone Ol')}>
                <Send size={20} />
              </Button>
            </form>
          </div>

        </div>
        
        {/* Alt Kısım */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tur10. {t('footer.rights_reserved', 'Tüm Hakları Saklıdır.')} </p>
        </div>
      </div>
    </footer>
  );
}
