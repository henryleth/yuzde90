#!/bin/bash

# Laravel Cache Temizleme Script
# Kullanım: ./clear-cache.sh

echo "🧹 Laravel Cache Temizleme Başlatılıyor..."
echo "================================================"

# Application Cache
echo "📦 Application Cache temizleniyor..."
php artisan cache:clear

# Configuration Cache
echo "⚙️  Configuration Cache temizleniyor..."
php artisan config:clear

# Route Cache
echo "🛣️  Route Cache temizleniyor..."
php artisan route:clear

# View Cache
echo "👁️  View Cache temizleniyor..."
php artisan view:clear

# Event Cache
echo "🎯 Event Cache temizleniyor..."
php artisan event:clear

# Queue Cache
echo "📋 Queue Cache temizleniyor..."
php artisan queue:clear

# Optimize Clear (Tüm optimize edilmiş dosyaları temizler)
echo "🚀 Optimize Cache temizleniyor..."
php artisan optimize:clear

# Composer Autoload
echo "🎼 Composer Autoload yenileniyor..."
composer dump-autoload --optimize

echo "================================================"
echo "✅ Tüm cache'ler başarıyla temizlendi!"
echo "🎉 Laravel uygulamanız artık temiz!"
