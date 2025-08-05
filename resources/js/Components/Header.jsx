import { Button } from '@/Components/ui/button';
import { useTheme } from '@/Context/ThemeContext';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { MenuIcon, ChevronDown, CaseSensitive, Sun, Moon } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react'; // usePage hook'u eklendi

// URL'nin geçerli olup olmadığını kontrol eden ve pathname'i güvenli bir şekilde alan bir yardımcı fonksiyon.
// SSR sırasında `route()` fonksiyonu tam bir URL döndürmezse veya geçersiz bir URL (örn. '#') döndürürse
// oluşabilecek çökmeleri önler.
const getPathname = (href) => {
    if (typeof href !== 'string' || href.trim() === '') {
        return '#'; // Boş veya geçersizse '#' döndür.
    }

    if (href.trim() === '#') {
        return '#'; // Eğer direkt '#' ise '#' döndür.
    }

    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
        try {
            // Tam URL ise, pathname'i al.
            return new URL(href).pathname;
        } catch (error) {
            // URL parse edilemezse (çok olası değil ama güvenlik için), kök yolu döndür.
            // console.warn(`URL ayrıştırma hatası: "${href}". Kök yola yönlendiriliyor.`);
            return '/';
        }
    }

    // Eğer göreceli bir yol ise (örn. '/turlar'), olduğu gibi döndür.
    return href;
};

export default function Header() {
  const { darkMode, toggleDarkMode, currentFont, changeFont, fonts, showFontMenu, setShowFontMenu, isHeaderShrunk } = useTheme();
  const { url } = usePage(); // Aktif URL'yi almak için usePaghte hook'u kullanılıyor

  // Navigasyon linklerini bir dizi olarak tanımlıyoruz. Bu, kodu daha temiz ve yönetilebilir hale getirir.
  const navLinks = [
    { href: route('home'), label: 'Ana Sayfa' },
    { href: route('tours.index'), label: 'Turlar' },
    { href: route('destinations.index'), label: 'Destinasyonlar' },
    { href: route('contents.index'), label: 'Blog' },
    { href: route('about.us'), label: 'Hakkımızda' },
    { href: route('contact.us'), label: 'İletişim' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-border ${darkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-sm transition-all duration-300 ${isHeaderShrunk ? 'h-10' : 'h-16'}`}>
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between h-full">
        {/* Sol Taraf: Logo */}
        <div className={`flex-shrink-0 transition-all duration-300 ${isHeaderShrunk ? 'scale-90' : 'scale-100'}`}>
          <Link href={route('home')}>
            <h1 className="text-3xl font-bold font-playfair text-primary">Tur10</h1>
          </Link>
        </div>

        {/* Orta: Masaüstü Navigasyon */}
        <nav className="hidden md:flex group flex-grow justify-center items-center space-x-8">
          {navLinks.map((link) => {
            // `getPathname` yardımcı fonksiyonunu kullanarak URL yolunu güvenli bir şekilde alıyoruz.
            const linkPath = getPathname(link.href);
            // Aktif link kontrolü: Eğer link yolu '/' ise hem tam eşleşme, hem de URL'in '/' ile başlaması kontrol edilir.
            // Diğer linkler için ise URL'in link yoluyla başlaması kontrol edilir.
            const isActive = (linkPath === '/' && url === '/') || (linkPath !== '/' && url.startsWith(linkPath));
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative group/item text-lg font-medium transition-colors hover:text-primary"
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 ease-out
                    ${isActive ? 'scale-x-100' : 'scale-x-0'}
                    ${!isActive ? 'group-hover/item:scale-x-100' : ''}
                  `}
                  style={{ transformOrigin: 'center' }}
                ></span>
              </Link>
            );
          })}
        </nav>

        {/* Sağ Taraf: Ayarlar ve Mobil Menü Butonu */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Font Seçimi */}
          <div className="relative hidden md:block">
            <Button 
              onClick={() => setShowFontMenu(!showFontMenu)}
              variant="ghost"
              className="flex items-center space-x-1"
            >
              <CaseSensitive className="h-4 w-4" />
              <span className="hidden sm:inline text-sm font-semibold">{fonts[currentFont].name}</span>
              <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
            </Button>
            {showFontMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-md shadow-lg z-50">
                <div className="py-1">
                  {Object.entries(fonts).map(([key, font]) => (
                    <button 
                      key={key}
                      onClick={() => { changeFont(key); setShowFontMenu(false); }}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors ${
                        currentFont === key ? 'bg-muted font-bold' : ''
                      }`}
                      style={{ fontFamily: font.name }}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Dark Mode Butonu */}
          <Button 
            onClick={toggleDarkMode} 
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          {/* Mobil Menü (Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                aria-label="Mobil menüyü aç"
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={`w-full sm:w-80 flex flex-col p-6 text-foreground ${darkMode ? 'bg-background' : 'bg-white/80 backdrop-blur-sm'}`}>
              <SheetHeader className="text-left mb-8">
                <SheetTitle className="text-3xl font-bold font-playfair text-primary">Menü</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-6 text-xl">
                {navLinks.map((link) => {
                  // Mobil menü için de `getPathname` fonksiyonunu kullanarak URL yolunu güvenli bir şekilde alıyoruz.
                  const linkPath = getPathname(link.href);
                  // Aktif link kontrolü.
                  const isActive = (linkPath === '/' && url === '/') || (linkPath !== '/' && url.startsWith(linkPath));

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`font-medium transition-colors hover:text-primary ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-auto pt-8 space-y-4">
                {/* Mobil Font Seçimi */}
                <div className="relative w-full text-center">
                  <Button 
                    onClick={() => setShowFontMenu(!showFontMenu)}
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <CaseSensitive className="h-4 w-4" />
                    <span>{fonts[currentFont].name}</span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                  {showFontMenu && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
                      <div className="py-1">
                        {Object.entries(fonts).map(([key, font]) => (
                          <button 
                            key={key}
                            onClick={() => { changeFont(key); setShowFontMenu(false); }}
                            className={`w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors ${
                              currentFont === key ? 'bg-muted font-bold' : ''
                            }`}
                            style={{ fontFamily: font.name }}
                          >
                            {font.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Mobil Dark Mode Butonu */}
                <Button 
                  onClick={toggleDarkMode} 
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span>{darkMode ? 'Aydınlık Mod' : 'Karanlık Mod'}</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
