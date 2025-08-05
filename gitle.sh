#!/bin/bash

# Commit mesajının parametre olarak alınıp alınmadığını kontrol eder.
# Eğer bir mesaj verilmemişse, kullanıcıyı uyarır ve betiği sonlandırır.
if [ -z "$1" ]; then
  echo "🛑 Lütfen bir commit mesajı girin."
  exit 1
fi

# Değişiklikleri Git'e ekler. 'git add .' komutu, projedeki tüm yeni ve değiştirilmiş dosyaları hazırlar.
echo "➕ Değişiklikler Git'e ekleniyor..."
git add .

# Değişiklikleri verilen mesaj ile commit'ler. '-m' parametresi, commit mesajını belirtir.
echo "💬 Değişiklikler commit'leniyor..."
git commit -m "$1"

# Commit'lenen değişiklikleri 'main' branch'ine (ana dala) push'lar (gönderir).
echo "🚀 Değişiklikler GitHub'a gönderiliyor..."
git push origin main

echo "✅ İşlem başarıyla tamamlandı!"
