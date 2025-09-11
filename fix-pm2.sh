#!/bin/bash

echo "🔧 PM2 Port Çakışması Düzeltiliyor..."
echo "================================================"

# PM2 process'lerini durdur
echo "📦 PM2 process'leri durduruluyor..."
pm2 stop all
pm2 delete all

# Port 13714'ü kullanan process'leri bul ve öldür
echo "🚪 Port 13714'ü kullanan process'ler kontrol ediliyor..."
lsof -ti:13714 | xargs kill -9 2>/dev/null || echo "Port 13714'te aktif process bulunamadı"

# Alternatif olarak netstat ile kontrol et
echo "🔍 Port durumu kontrol ediliyor..."
netstat -tulpn | grep :13714 || echo "Port 13714 temiz"

# PM2'yi yeniden başlat
echo "🚀 PM2 yeniden başlatılıyor..."
pm2 start bootstrap/ssr/ssr.js --name=app

echo "✅ İşlem tamamlandı!"
echo "📊 PM2 durumu:"
pm2 list
