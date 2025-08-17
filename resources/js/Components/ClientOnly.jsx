import { useState, useEffect } from 'react';

/**
 * Bu bileşen, içine aldığı çocuk (children) bileşenlerin
 * sadece istemci tarafında (tarayıcıda) render edilmesini sağlar.
 * Sunucu Tarafı Oluşturma (SSR) sırasında bu bileşen hiçbir şey render etmez.
 * Bu, sadece tarayıcıda çalışması gereken veya SSR sırasında sorun çıkaran
 * kütüphaneler ve bileşenler için kullanışlıdır.
 *
 * @param {object} props - React bileşen props'ları.
 * @param {React.ReactNode} props.children - Sadece istemci tarafında render edilecek olan bileşenler.
 * @param {React.ReactNode} [props.fallback=null] - İstemci tarafı içeriği yüklenene kadar gösterilecek olan yedek içerik.
 * @returns {React.ReactNode|null} İstemci tarafındaysa çocukları, sunucu tarafındaysa fallback'i veya null'ı döndürür.
 */
export default function ClientOnly({ children, fallback = null }) {
  // isMounted state'i, bileşenin tarayıcıda "mount" edilip edilmediğini takip eder.
  // Başlangıç değeri false'tur, bu da sunucu tarafında veya ilk render'da false olacağı anlamına gelir.
  const [isMounted, setIsMounted] = useState(false);

  // useEffect hook'u sadece istemci tarafında çalışır.
  // Bileşen tarayıcıya mount edildiğinde bu hook çalışır ve isMounted state'ini true olarak ayarlar.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Eğer bileşen henüz mount edilmediyse (sunucu tarafındaysak veya ilk render anındaysak),
  // fallback'i (varsa) veya null'ı döndürürüz. Bu, çocukların sunucuda render edilmesini engeller.
  if (!isMounted) {
    return fallback;
  }

  // Bileşen tarayıcıda mount edildiyse, asıl çocukları render ederiz.
  return children;
}
