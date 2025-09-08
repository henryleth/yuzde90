import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';
import GuestLayout from '@/Layouts/GuestLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { 
    Check, Users, Globe, Award, Leaf, Heart, Compass, Camera, 
    Shield, Star, Clock, MapPin, Phone, Mail, Instagram, 
    TrendingUp, Target, Eye, Handshake, Gift, Zap
} from 'lucide-react';
import LazyImage from '@/Components/LazyImage';

export default function AboutUs() {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head 
                title={t('about_us.head_title', "Hakkımızda - Turquiana")}
                meta={[
                    {
                        name: 'description',
                        content: t('about_us.meta_description', 'İspanyolca konuşan ziyaretçiler için özel turistik paketler düzenleyen, TURSAB A-5240 lisanslı yerel seyahat acentesi. Butik tarzda hizmet.')
                    },
                    {
                        name: 'keywords',
                        content: t('about_us.meta_keywords', 'hakkımızda, seyahat acentesi, İspanyolca rehber, TURSAB A-5240, butik tur, Türkiye turları')
                    },
                    // Open Graph Meta Tags
                    {
                        property: 'og:title',
                        content: t('about_us.head_title', "Hakkımızda - Turquiana")
                    },
                    {
                        property: 'og:description',
                        content: t('about_us.meta_description', 'İspanyolca konuşan ziyaretçiler için özel turistik paketler düzenleyen, TURSAB A-5240 lisanslı yerel seyahat acentesi.')
                    },
                    {
                        property: 'og:type',
                        content: 'website'
                    },
                    // Twitter Card Meta Tags
                    {
                        name: 'twitter:card',
                        content: 'summary'
                    },
                    {
                        name: 'twitter:title',
                        content: t('about_us.head_title', "Hakkımızda - Turquiana")
                    },
                    {
                        name: 'twitter:description',
                        content: t('about_us.meta_description', 'İspanyolca konuşan ziyaretçiler için özel turistik paketler düzenleyen yerel seyahat acentesi.')
                    }
                ]}
            />

            {/* Hero Section */}
            <section className="relative h-[50vh] md:h-[60vh] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2')` }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair leading-tight animate-fade-in-up">
                        {t('about_us.hero.title', "Turquiana - La Mejor Agencia de Viajes")}
                    </h1>
                    <p className="text-lg md:text-xl max-w-4xl mx-auto mb-8 leading-relaxed opacity-0 animate-fade-in-up animation-delay-300">
                        {t('about_us.hero.subtitle', "Agencia de viajes local especializada en organizar paquetes turísticos para visitantes hispanohablantes en Turquía.")}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm opacity-0 animate-fade-in-up animation-delay-600">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                            <Star className="h-4 w-4" />
                            <span>{t('about_us.hero.tripadvisor', "Certificado de Excelencia TripAdvisor")}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                            <Shield className="h-4 w-4" />
                            <span>{t('about_us.hero.guarantee', "Mejor Precio Garantizado")}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                            <Clock className="h-4 w-4" />
                            <span>{t('about_us.hero.support', "Soporte 7/24")}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Kim Olduğumuz Bölümü */}
            <section className="py-20 bg-background text-foreground">
                <div className="container max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary font-playfair">
                            {t('about_us.who_we_are.title', "Kim Olduğumuz?")}
                        </h2>
                        <div className="max-w-4xl mx-auto">
                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                {t('about_us.who_we_are.intro', "Binlerce benzer acente arasından bizi seçmenizin nedenleri ve farkımız nedir? Uzak bir ülkeden online hizmet almak ve güvenmek zordur.")}
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t('about_us.who_we_are.description', "Ekibimizi, deneyimlerimizi, çalışma sistemimizin farklılıklarını tanımak, Türkiye'deki seyahatinizden hayal kırıklığı yaşamadan maksimum keyif almanız için doğru seçimi yapmanıza yardımcı olabilir.")}
                            </p>
                        </div>
                    </div>

                    <Card className="p-8 mb-12 bg-muted/30 border-none">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-4 text-primary">
                                {t('about_us.specialty.title', "İspanyolca Konuşan Ziyaretçiler İçin Özel Yerel Acente")}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                {t('about_us.brand.description', "Turquiana, Pride Travel'in bir markasıdır ve İspanyolca konuşan ziyaretçilere özel hizmet vermektedir.")}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                        <Users className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">{t('about_us.specialty.qualified_staff', "Kalifiye Personel")}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {t('about_us.specialty.qualified_text', "Yılların turizm deneyimi ile müşterilerimizi tanıyor, beklentilerini en iyi şekilde karşılayabiliyoruz.")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                        <Globe className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">{t('about_us.specialty.spanish_native', "Ana Dilde Hizmet")}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {t('about_us.specialty.spanish_text', "Personelimiz İspanyolca konuşuyor ve e-posta ile telefon görüşmelerinde ana dilinizde hizmet veriyor.")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                        <Clock className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">{t('about_us.specialty.time_importance', "Zamanınızın Değeri")}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {t('about_us.specialty.time_text', "Türkiye'deki zamanınızın önemini biliyoruz ve ziyaretçilerimizin keyifle vakit geçirmesi için elimizden geleni yapıyoruz.")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                        <Star className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">{t('about_us.specialty.tripadvisor', "TripAdvisor Onayı")}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {t('about_us.specialty.tripadvisor_text', "TripAdvisor'da Mükemmellik Sertifikası ve Travellers' Choice ödülü sahibi en iyi acentelerden biriyiz.")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="text-center">
                        <Card className="inline-block p-6 bg-primary/5 border-primary/20">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <Shield className="h-8 w-8 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-lg font-bold text-primary mb-1">TURSAB A-5240</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {t('about_us.tursab.description', "Asociación de Agencias de Viajes de Turquía - Miembro Oficial")}
                                    </p>
                                </div>
                            </div>
                        </Card>
                        <p className="text-xs text-muted-foreground mt-4 max-w-2xl mx-auto">
                            {t('about_us.tursab.footnote', "* TURSAB (Türkiye Seyahat Acenteleri Birliği) es la Asociación de Agencias de Viajes de Turquía, organización oficial que regula y supervisa todas las agencias de viajes en Turquía, garantizando servicios de calidad y protección al consumidor.")}
                        </p>
                    </div>
                </div>
            </section>
            

            {/* Neden Bizi Seçmelisiniz */}
            <section className="py-20 bg-muted/30">
                <div className="container max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground font-playfair">
                            {t('about_us.why_choose.title', "Turquiana'nın Farkı Nedir? Neden Bizi Seçmelisiniz?")}
                        </h2>
                        <div className="bg-primary/10 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-bold text-primary mb-4">
                                {t('about_us.why_choose.guarantee_title', "KALITE-FİYAT DENGESİNDE EN İYİ FİYAT GARANTİSİ")}
                            </h3>
                            <p className="text-muted-foreground">
                                {t('about_us.why_choose.guarantee_subtitle', "Tam güvenle satın alın...")}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8 mb-12">
                        <Card className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Shield className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">{t('about_us.why_choose.official_agency', "Resmi Acente")}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {t('about_us.why_choose.official_text', "TURSAB A-5240 lisans numarası ile resmi acente olarak yüksek kaliteli hizmet sunuyoruz.")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Clock className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">{t('about_us.why_choose.support_247', "7/24 Özel Destek")}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {t('about_us.why_choose.support_text', "Satın alma öncesi, sırası ve Türkiye'deki turunuz boyunca özel destek sağlıyoruz.")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Star className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">{t('about_us.why_choose.quality_hotels', "İyi Konumlu Kaliteli Oteller")}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {t('about_us.why_choose.hotels_text', "İyi konumlu ve kaliteli otellerde konaklama imkanı sunuyoruz.")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Globe className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">{t('about_us.why_choose.spanish_only', "Sadece İspanyolca Rehberlik")}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {t('about_us.why_choose.spanish_text', "Aynı grupta iki dil karışımı değil, sadece İspanyolca konuşan rehberlerle turlar düzenliyoruz.")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Award className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">{t('about_us.why_choose.certified_guides', "Profesyonel Sertifikalı Rehberler")}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {t('about_us.why_choose.guides_text', "Turizm Bakanlığı'ndan sertifikalı profesyonel rehberler ve yüksek nitelikli personelle çalışıyoruz.")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Users className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">{t('about_us.why_choose.small_groups', "Küçük Grup Turları")}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {t('about_us.why_choose.groups_text', "Küçük gruplarla paylaşımlı turlar düzenliyor, sadece satmakla kalmayıp müşteri memnuniyetini sağlıyoruz.")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8 bg-primary/5 border-primary/20">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-primary mb-4">
                                    {t('about_us.why_choose.packages_title', "Turquiana Paketlerinde")}
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                        <Check className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            {t('about_us.why_choose.clear_details', "Tüm dahil olan ve olmayan hizmetler çok net bir şekilde detaylandırılır.")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                        <Check className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            {t('about_us.why_choose.complete_packages', "Paketler çok eksiksiz, önemli gezileri opsiyonel olarak sunmayız.")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                        <Check className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            {t('about_us.why_choose.no_hidden_costs', "Gizli ödeme yok, varış noktasında sürpriz ödeme talep edilmez.")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                        <Check className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            {t('about_us.why_choose.reasonable_prices', "Kalite-fiyat dengesinde süper makul fiyatlarımız var.")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="text-center">
                            <Card className="inline-block p-6 bg-yellow-50 border-yellow-200">
                                <div className="flex items-center gap-4">
                                    <div className="bg-yellow-100 p-3 rounded-lg">
                                        <TrendingUp className="h-8 w-8 text-yellow-600" />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-lg font-bold text-yellow-800 mb-2">
                                            {t('about_us.why_choose.price_warning', "Önemli Not")}
                                        </h4>
                                        <p className="text-sm text-yellow-700">
                                            {t('about_us.why_choose.price_text', "Serbest piyasada her zaman daha ucuz fiyatlar bulunabilir, ancak sonuçta ucuz olan pahalıya mal olur!")}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Sadece Gerçek Sertifikalar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <Card className="p-6 text-center">
                            <div className="bg-primary/10 p-4 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <Shield className="h-8 w-8 text-primary" />
                            </div>
                            <h4 className="text-lg font-semibold mb-2">TURSAB A-5240</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                {t('about_us.credentials.tursab_full', "Türkiye Seyahat Acenteleri Birliği Resmi Üyesi")}
                            </p>
                            <Button variant="outline" size="sm">
                                {t('about_us.credentials.verify', "Lisansı Doğrula")}
                            </Button>
                        </Card>

                        <Card className="p-6 text-center">
                            <div className="bg-primary/10 p-4 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <Star className="h-8 w-8 text-primary" />
                            </div>
                            <h4 className="text-lg font-semibold mb-2">TripAdvisor</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                {t('about_us.credentials.tripadvisor_full', "Mükemmellik Sertifikası & Travellers' Choice")}
                            </p>
                            <Button variant="outline" size="sm">
                                {t('about_us.credentials.view_reviews', "Yorumları Gör")}
                            </Button>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary text-primary-foreground">
                <div className="container max-w-4xl mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 font-playfair">
                        {t('about_us.cta.title', "¿Listo para tu Aventura en Turquía?")}
                    </h2>
                    <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                        {t('about_us.cta.subtitle', "Contáctanos hoy y comencemos a planificar el viaje de tus sueños por Turquía.")}
                    </p>
                    <Button asChild variant="secondary" size="lg" className="px-8 py-4 text-lg font-semibold">
                        <Link href={route('contact.us')}>
                            {t('about_us.cta.contact_button', "Formulario de Contacto")}
                        </Link>
                    </Button>
                </div>
            </section>
        </GuestLayout>
    );
}
