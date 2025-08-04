import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Phone, Mail, MapPin, HelpCircle } from 'lucide-react'; // Yeni ikonlar ekledim
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion"


export default function ContactUs() {
    return (
        <GuestLayout>
            <Head title="İletişim" />

            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}>
                <div className="absolute inset-0 bg-black/50 contact-us-hero-overlay"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 font-playfair">Maceraya Hazır mısınız?</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto">Hayalinizdeki tatil bir mesaj uzağınızda. Bize ulaşın, yolculuğunuza başlayalım.</p>
                </div>
            </section>

            {/* İletişim Bilgileri ve Form */}
            <section className="py-16 bg-background text-foreground">
                <div className="container max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* İletişim Bilgileri */}
                        <div className="lg:col-span-1 space-y-8">
                            <h2 className="text-4xl font-bold text-primary font-playfair mb-6">İletişim Kanallarımız</h2>
                            <Card className="contact-info-card p-6 bg-card shadow-lg border-none flex items-start space-x-4 transform hover:-translate-y-2 transition-transform duration-300">
                                <Phone className="h-10 w-10 text-primary mt-1" />
                                <div>
                                    <h3 className="text-xl font-semibold">Telefon</h3>
                                    <p className="text-muted-foreground">Hafta içi 09:00 - 18:00 arası bize ulaşabilirsiniz.</p>
                                    <a href="tel:+905551234567" className="text-primary font-bold hover:underline">+90 555 123 45 67</a>
                                </div>
                            </Card>
                             <Card className="contact-info-card p-6 bg-card shadow-lg border-none flex items-start space-x-4 transform hover:-translate-y-2 transition-transform duration-300">
                                <Mail className="h-10 w-10 text-primary mt-1" />
                                <div>
                                    <h3 className="text-xl font-semibold">E-posta</h3>
                                    <p className="text-muted-foreground">Tüm sorularınız için 24 saat içinde yanıt veriyoruz.</p>
                                    <a href="mailto:info@tur10.com" className="text-primary font-bold hover:underline">info@tur10.com</a>
                                </div>
                            </Card>
                             <Card className="contact-info-card p-6 bg-card shadow-lg border-none flex items-start space-x-4 transform hover:-translate-y-2 transition-transform duration-300">
                                <MapPin className="h-10 w-10 text-primary mt-1" />
                                <div>
                                    <h3 className="text-xl font-semibold">Ofisimiz</h3>
                                    <p className="text-muted-foreground">Bir kahve içmeye bekleriz!</p>
                                    <p className="font-bold">Kızılay, Ankara, Türkiye</p>
                                </div>
                            </Card>
                        </div>

                        {/* İletişim Formu */}
                        <div className="lg:col-span-2">
                             <Card className="contact-form-card p-8 bg-card shadow-2xl border-none">
                                <CardHeader>
                                    <CardTitle className="text-4xl font-bold text-primary mb-4 font-playfair">Bize Mesaj Gönderin</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <Label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Adınız Soyadınız</Label>
                                                <Input type="text" id="name" placeholder="John Doe" className="w-full bg-input" />
                                            </div>
                                            <div>
                                                <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">E-posta Adresiniz</Label>
                                                <Input type="email" id="email" placeholder="ornek@mail.com" className="w-full bg-input" />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">Konu</Label>
                                            <Input type="text" id="subject" placeholder="Tur Bilgisi, Öneri, vb." className="w-full bg-input" />
                                        </div>
                                        <div>
                                            <Label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Mesajınız</Label>
                                            <Textarea id="message" placeholder="Hayalinizdeki tatili anlatın..." rows="6" className="w-full bg-input" />
                                        </div>
                                        <Button type="submit" size="lg" className="w-full py-3 text-lg contact-form-submit-button transform hover:scale-105 transition-transform duration-300">
                                            Mesajı Gönder
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sıkça Sorulan Sorular */}
            <section className="py-16 bg-secondary text-foreground">
                <div className="container max-w-4xl mx-auto px-4 md:px-8">
                    <h2 className="text-4xl font-bold text-center mb-12 text-primary font-playfair">Sıkça Sorulan Sorular</h2>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-xl font-semibold">Rezervasyonu nasıl yapabilirim?</AccordionTrigger>
                        <AccordionContent className="text-lg text-muted-foreground">
                          Tur sayfalarımızdaki "Rezervasyon Yap" butonunu kullanarak veya doğrudan bizimle iletişime geçerek kolayca rezervasyon yapabilirsiniz.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="text-xl font-semibold">Turlarınızda konaklama dahil mi?</AccordionTrigger>
                        <AccordionContent className="text-lg text-muted-foreground">
                          Evet, tüm turlarımızda belirtilen otellerde konaklama ücrete dahildir. Tur detay sayfasından otel bilgilerini inceleyebilirsiniz.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="text-xl font-semibold">Ödeme seçenekleriniz nelerdir?</AccordionTrigger>
                        <AccordionContent className="text-lg text-muted-foreground">
                          Kredi kartı, banka havalesi ve online ödeme sistemleri ile güvenli bir şekilde ödeme yapabilirsiniz.
                        </AccordionContent>
                      </AccordionItem>
                       <AccordionItem value="item-4">
                        <AccordionTrigger className="text-xl font-semibold">Tur iptal politikası nedir?</AccordionTrigger>
                        <AccordionContent className="text-lg text-muted-foreground">
                          Tur başlangıcından 15 gün öncesine kadar yapılan iptallerde tam para iadesi yapılmaktadır. Detaylı bilgi için sözleşmemizi inceleyebilirsiniz.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                </div>
            </section>

            {/* Harita Bölümü */}
            <section className="py-16 bg-background">
                 <div className="container max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-4xl font-bold text-center mb-12 text-primary font-playfair">Ofisimiz Nerede?</h2>
                    <div className="rounded-lg overflow-hidden shadow-2xl contact-map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0000000000005!2d32.859740000000005!3d39.93336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f0c4a4f0001%3A0x7d6c6e7e4a4f0001!2sKızılay%20Meydan%C4%B1!5e0!3m2!1str!2str!4v1678912345678!5m2!1str!2str"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="contact-map-iframe"
                        ></iframe>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
