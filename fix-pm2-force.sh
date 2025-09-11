#!/bin/bash

echo "🔧 PM2 Zorla Durdurma ve Yeniden Başlatma..."
echo "================================================"

# PM2'yi tamamen kapat (daemon'ı da öldür)
echo "💀 PM2 daemon'ı tamamen kapatılıyor..."
pm2 kill

# Emin olmak için birkaç saniye bekle
echo "⏳ 3 saniye bekleniyor..."
sleep 3

# Port 13714'ü kullanan tüm process'leri bul ve öldür
echo "🚪 Port 13714'ü kullanan process'ler zorla öldürülüyor..."
sudo lsof -ti:13714 | xargs sudo kill -9 2>/dev/null || echo "Port 13714'te aktif process bulunamadı"

# Node.js process'lerini kontrol et
echo "🔍 Node.js process'leri kontrol ediliyor..."
ps aux | grep node | grep -v grep || echo "Aktif Node.js process bulunamadı"

# Port durumunu kontrol et
echo "🔍 Port 13714 durumu:"
sudo netstat -tulpn | grep :13714 || echo "✅ Port 13714 temiz"

echo "⏳ 2 saniye daha bekleniyor..."
sleep 2

# PM2'yi yeniden başlat
echo "🚀 PM2 yeniden başlatılıyor..."
pm2 start bootstrap/ssr/ssr.js --name=app

echo "✅ İşlem tamamlandı!"
echo "📊 PM2 durumu:"
pm2 list
pm2 info app
