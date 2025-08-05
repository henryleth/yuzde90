import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Check, Users, Globe, Award, Leaf, Heart, Compass, Camera } from 'lucide-react'; // Yeni ikonlar ekledim
import LazyImage from '@/Components/LazyImage'; // LazyImage bileşenini import et

export default function AboutUs() {
    return (
        <GuestLayout>
            <Head title="Hakkımızda" />

            {/* Hero Section */}
            <section className="relative h-[50vh] md:h-[60vh] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent about-us-hero-overlay"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 font-playfair animate-fade-in-up">Keşfetmenin Ruhu</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-0 animate-fade-in-up animation-delay-300">Biz sadece bir seyahat acentesi değiliz; bizler, Türkiye'nin kalbine yolculuk düzenleyen hikaye anlatıcılarıyız.</p>
                </div>
            </section>

            {/* Giriş ve Misyon/Vizyon */}
            <section className="py-16 bg-background text-foreground">
                <div className="container max-w-6xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <Card className="bg-card rounded-lg border-none p-8 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-4xl font-bold mb-6 text-primary font-playfair">Bizim Hikayemiz</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg leading-relaxed mb-4">
                                        Her şey, bu topraklara duyduğumuz derin bir aşkla başladı. Yıllar önce bir grup seyahat tutkunu olarak, Türkiye'nin saklı kalmış güzelliklerini, zengin tarihini ve sıcakkanlı insanlarını dünyayla paylaşma hayali kurduk. Bu hayal, bugün binlerce misafirimize unutulmaz anılar biriktiren bir tutkuya dönüştü.
                                    </p>
                                    <p className="text-lg leading-relaxed">
                                        Amacımız, size sadece yerleri göstermek değil, o yerlerin ruhunu hissettirmek. Bir Ege kasabasında sabah kahvesinin tadını, Kapadokya'da gün doğumunun büyüsünü, Karadeniz yaylalarında bulutların üzerinde yürümenin özgürlüğünü... İşte biz bu anları sizin için ölümsüzleştiriyoruz.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="order-1 md:order-2">
                            <LazyImage src="https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Bizim Hikayemiz" className="rounded-lg shadow-2xl object-cover w-full h-auto transform hover:scale-105 transition-transform duration-500" wrapperClassName="w-full" effect="blur" />
                        </div>
                    </div>
                </div>
            </section>
            

            {/* Değerlerimiz */}
            <section className="py-16 bg-background text-foreground">
                <div className="container max-w-6xl mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-12 text-primary font-playfair">Bizi Biz Yapan Değerler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="about-us-feature-card p-6 bg-card shadow-lg flex flex-col items-center text-center border-none transform hover:-translate-y-2 transition-transform duration-300">
                            <Heart className="h-12 w-12 text-primary mb-4" />
                            <CardTitle className="text-2xl font-semibold mb-3">Tutku</CardTitle>
                            <CardContent className="text-muted-foreground">
                                İşimizi bir görev olarak değil, bir tutku olarak görüyoruz. Bu tutku, her turumuza yansır.
                            </CardContent>
                        </Card>
                        <Card className="about-us-feature-card p-6 bg-card shadow-lg flex flex-col items-center text-center border-none transform hover:-translate-y-2 transition-transform duration-300">
                            <Compass className="h-12 w-12 text-primary mb-4" />
                            <CardTitle className="text-2xl font-semibold mb-3">Keşif</CardTitle>
                            <CardContent className="text-muted-foreground">
                                Sadece popüler olanı değil, keşfedilmeyi bekleyen gizli kalmış güzellikleri de rotalarımıza dahil ediyoruz.
                            </CardContent>
                        </Card>
                        <Card className="about-us-feature-card p-6 bg-card shadow-lg flex flex-col items-center text-center border-none transform hover:-translate-y-2 transition-transform duration-300">
                            <Users className="h-12 w-12 text-primary mb-4" />
                            <CardTitle className="text-2xl font-semibold mb-3">Otantiklik</CardTitle>
                            <CardContent className="text-muted-foreground">
                                Yerel yaşamın bir parçası olmanızı sağlıyor, size gerçek ve samimi deneyimler sunuyoruz.
                            </CardContent>
                        </Card>
                        <Card className="about-us-feature-card p-6 bg-card shadow-lg flex flex-col items-center text-center border-none transform hover:-translate-y-2 transition-transform duration-300">
                            <Check className="h-12 w-12 text-primary mb-4" />
                            <CardTitle className="text-2xl font-semibold mb-3">Güvenilirlik</CardTitle>
                            <CardContent className="text-muted-foreground">
                                Yolculuğunuzun her anında yanınızdayız. Güvenliğiniz ve konforunuz bizim için en önemli önceliktir.
                            </CardContent>
                        </Card>
                        <Card className="about-us-feature-card p-6 bg-card shadow-lg flex flex-col items-center text-center border-none transform hover:-translate-y-2 transition-transform duration-300">
                            <Leaf className="h-12 w-12 text-primary mb-4" />
                            <CardTitle className="text-2xl font-semibold mb-3">Sorumluluk</CardTitle>
                            <CardContent className="text-muted-foreground">
                                Doğaya ve yerel kültürlere saygılı, sürdürülebilir turizm anlayışını benimsiyoruz. Gelecek nesillere daha güzel bir dünya bırakmak için çalışıyoruz.
                            </CardContent>
                        </Card>
                         <Card className="about-us-feature-card p-6 bg-card shadow-lg flex flex-col items-center text-center border-none transform hover:-translate-y-2 transition-transform duration-300">
                            <Camera className="h-12 w-12 text-primary mb-4" />
                            <CardTitle className="text-2xl font-semibold mb-3">Anılar</CardTitle>
                            <CardContent className="text-muted-foreground">
                                Bizim için en büyük ödül, evinize unutulmaz anılarla dönmenizdir. Her detayı bu anları yaratmak için planlıyoruz.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Çağrıya Yönlendirme (Call to Action) */}
            <section className="py-20 bg-primary text-primary-foreground text-center">
                <div className="container max-w-6xl mx-auto px-4 md:px-8">
                    <h2 className="text-4xl font-bold mb-6 font-playfair">Türkiye'nin Büyüsünü Bizimle Yaşayın</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">Hayalinizdeki yolculuğu tasarlamak için sabırsızlanıyoruz. Maceraya hazır mısınız?</p>
                    <Button asChild variant="secondary" size="lg" className="px-10 py-4 text-lg transform hover:scale-105 transition-transform duration-300">
                        <Link href={route('contact.us')}>Maceraya Başla</Link>
                    </Button>
                </div>
            </section>
        </GuestLayout>
    );
}
