<?php

namespace Database\Seeders;

use App\Models\Tour;
use App\Models\TourDay;
use App\Models\DayActivity;
use App\Models\OptionalActivity;

use App\Models\TourPricingTier;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Destination;
use App\Traits\HandlesMediaUploads;

class TourSeeder extends Seeder
{
    use HandlesMediaUploads;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('tour_optional_activity')->truncate();
        DB::table('tour_destination')->truncate();
        TourPricingTier::truncate();
        DayActivity::truncate();
        TourDay::truncate();
        Tour::truncate();
        OptionalActivity::truncate();

        Schema::enableForeignKeyConstraints();

        $seasons = config('tour.seasons', ['low_season', 'mid_season', 'high_season']);
        $categories = config('tour.categories', ['Category A', 'Category B', 'Category C']);

        $toursData = [
            // Tur 1
            [
                "title" => "İstanbul ve Kapadokya Klasik Turu",
                "slug" => "istanbul-kapadokya-klasik-turu",
                "summary" => "İstanbul ve Kapadokya'nın büyülü dünyasını keşfedin.",
                "description" => "İstanbul ve Kapadokya'nın büyülü dünyasını keşfedin. Tarihi ve doğal güzelliklerle dolu unutulmaz bir yolculuk.",
                "image_url" => "https://images.pexels.com/photos/286941/pexels-photo-286941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "media_alt_text" => "İstanbul ve Kapadokya Klasik Turu Ana Görseli",
                "media_tags" => ["Şehir", "Tarih", "Kültür"],
                "media_destination_slug" => "istanbul",
                "min_participants" => 12,
                "max_participants" => 18,
                "duration_days" => 8,
                "duration_nights" => 7,
                "language" => "Türkçe",
                "rating" => 4.9,
                "reviews_count" => 250,
                "is_published" => true,
                "inclusions_html" => "<p>Tüm transferler, Profesyonel rehberlik, Otel konaklaması, Belirtilen yemekler, Müze giriş ücretleri, Ulaşım, Öğle yemekleri</p>",
                "exclusions_html" => "<p>Uçak biletleri, Vize ücretleri, Kişisel harcamalar, Akşam yemekleri (tur günleri hariç), Opsiyonel aktiviteler, Bahşişler, Seyahat sigortası</p>",
                "destinations_slugs" => ["istanbul", "kapadokya"],
                "hotel_options_data" => [
                    "istanbul_hotels" => [
                        ["name" => "Antusa Palace Hotel", "category" => "Category A"],
                        ["name" => "Dersaadet Hotel", "category" => "Category A"],
                        ["name" => "Sultanahmet Sarayı", "category" => "Category A"],
                        ["name" => "Sultanahmet Hotel", "category" => "Category B"],
                        ["name" => "Sirkeci Mansion", "category" => "Category B"],
                        ["name" => "Arcadia Blue Hotel", "category" => "Category B"],
                        ["name" => "Ajwa Hotel Sultanahmet", "category" => "Category C"],
                        ["name" => "Neorion Hotel", "category" => "Category C"],
                        ["name" => "Legacy Ottoman Hotel", "category" => "Category C"],
                    ],
                    "cappadocia_hotels" => [
                        ["name" => "Fresco Cave Suites", "category" => "Category A"],
                        ["name" => "Fairy Chimney Inn", "category" => "Category A"],
                        ["name" => "Cave Hotel Saksagan", "category" => "Category A"],
                        ["name" => "Cappadocia Cave Suites", "category" => "Category B"],
                        ["name" => "Goreme Kaya Hotel", "category" => "Category B"],
                        ["name" => "Uchisar Kaya Hotel", "category" => "Category B"],
                        ["name" => "Museum Hotel", "category" => "Category C"],
                        ["name" => "Kayakapi Premium Caves", "category" => "Category C"],
                        ["name" => "Mithra Cave Hotel", "category" => "Category C"],
                    ]
                ],
                "pricing_tiers_data" => [
                    ["season_name" => $seasons[0], "category" => $categories[0], "price_per_person_1" => 1299.00, "price_per_person_2" => 1199.00, "price_per_person_3" => 1099.00],
                    ["season_name" => $seasons[0], "category" => $categories[1], "price_per_person_1" => 1199.00, "price_per_person_2" => 1099.00, "price_per_person_3" => 999.00],
                    ["season_name" => $seasons[0], "category" => $categories[2], "price_per_person_1" => 1099.00, "price_per_person_2" => 999.00, "price_per_person_3" => 899.00],
                    ["season_name" => $seasons[1], "category" => $categories[0], "price_per_person_1" => 1399.00, "price_per_person_2" => 1299.00, "price_per_person_3" => 1199.00],
                    ["season_name" => $seasons[1], "category" => $categories[1], "price_per_person_1" => 1299.00, "price_per_person_2" => 1199.00, "price_per_person_3" => 1099.00],
                    ["season_name" => $seasons[1], "category" => $categories[2], "price_per_person_1" => 1199.00, "price_per_person_2" => 1099.00, "price_per_person_3" => 999.00],
                    ["season_name" => $seasons[2], "category" => $categories[0], "price_per_person_1" => 1499.00, "price_per_person_2" => 1399.00, "price_per_person_3" => 1299.00],
                    ["season_name" => $seasons[2], "category" => $categories[1], "price_per_person_1" => 1399.00, "price_per_person_2" => 1299.00, "price_per_person_3" => 1199.00],
                    ["season_name" => $seasons[2], "category" => $categories[2], "price_per_person_1" => 1299.00, "price_per_person_2" => 1199.00, "price_per_person_3" => 1099.00],
                ],
                "gallery_image_urls" => [
                    "https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                ],
                "itinerary" => [
                    ["day_number" => 1, "title" => "1. Gün - İstanbul Varış", "activities" => [["description" => "Uluslararası uçuş varış saatinde havaalanından karşılama ve otele transfer", "is_highlight" => false, "order" => 1], ["description" => "Varış saati ne olursa olsun transfer dahildir", "is_highlight" => false, "order" => 2]]],
                    ["day_number" => 2, "title" => "2. Gün - İstanbul Tarihi Yarımada Turu", "activities" => [["description" => "Otelde kahvaltı dahil. Tam günlük şehir turu", "is_highlight" => false, "order" => 1], ["description" => "<h3>BYZANTINE ve OTTOMAN ANITLARI – Öğle Yemeği Dahil</h3><p>Saat 08:45 civarı Yerebatan Sarnıcı önünde buluşma</p><ul><li>Roma Hipodromu</li><li>Sultanahmet Camii (Mavi Cami)</li><li>Ayasofya (dışarıdan anlatım)</li><li>Topkapı Sarayı</li><li>Harem Bölümü</li><li>Kapalıçarşı</li></ul>", "is_highlight" => true, "order" => 2]]],
                    ["day_number" => 3, "title" => "3. Gün - İstanbul Boğaz Turu ve Kapadokya'ya Uçuş", "activities" => [["description" => "Otelde kahvaltı dahil. Odadan çıkış, eşyalar otelde bırakılır", "is_highlight" => false, "order" => 1], ["description" => "<h3>BOĞAZ TURU + PANORAMİK GALATA KULESİ – Öğle Yemeği Dahil</h3><p>Belirlenen noktalarda kararlaştırılan saatte buluşma ve Türk çayı içtikten sonra aşağıdaki yerlerin gezilmesiyle tur başlar:</p><ul><li><b>Tekne turu</b> Boğaz boyunca Panoramik Görünüm: Çırağan Sarayı, Kız Kulesi, Rumeli Hisarı vb.</li><li>Mısır Çarşısı (Baharat Çarşısı)</li><li>Panoramik Galata Kulesi – dışarıdan anlatım dahil</li><li>İstiklal Caddesi'nde Yürüyüş</li><li>Pera Bölgesi</li><li>Ortodoks Patrikhanesi ve Aziz Yorgi Kilisesi</li><li>Fener ve Balat Semtlerinin ve Renkli Evlerin Panoramik Görünümü</li></ul>", "is_highlight" => true, "order" => 2]]],
                    ["day_number" => 4, "title" => "4. Gün - Opsiyonel Sıcak Hava Balonu + Kapadokya Turu ve Konaklama", "activities" => [["description" => "<b>Opsiyonel:</b> Sıcak Hava Balonu • Otelde kahvaltı.", "is_highlight" => false, "order" => 1], ["description" => "<h3>Kuzey Kapadokya Turu sabah 10:00-10:30 civarı başlar.</h3><p>ZİYARET EDECEĞİMİZ YERLER ŞUNLARDIR:</p><ol><li><b>Paşabağı:</b> Dev mantarlara benzeyen eşsiz kaya oluşumları.</li><li><b>Devrent (Hayal Vadisi):</b> Şaşırtıcı kaya oluşumlarıyla ay manzarası.</li><li><b>Avanos:</b> Geleneksel çömlekçiliğiyle bilinen şirin köy.</li><li><b>Uçhisar Kale Altı:</b> Uçhisar Kalesi'nin aşağıdan etkileyici manzarası.</li><li><b>Göreme Açık Hava Müzesi:</b> Kayaya oyulmuş kilise ve şapellerin bulunduğu tarihi alan.</li></ol><p>Turda öğle yemeği dahildir.</p>", "is_highlight" => true, "order" => 2]]],
                    ["day_number" => 5, "title" => "5. Gün - Kapadokya Turu, Uçakla İstanbul'a Dönüş", "activities" => [["description" => "Kahvaltı konaklamaya dahildir. Kahvaltıdan sonra otelden alınma ve gezi için hareket.", "is_highlight" => false, "order" => 1], ["description" => "<h3>Güney Kapadokya Turu sabah 10:00-10:30 civarı başlar.</h3><p>ZİYARET EDECEĞİMİZ YERLER ŞUNLARDIR:</p><ol><li><b>Aşk Vadisi veya Göreme Panorama:</b> Göreme'nin güzel panoramik manzaraları.</li><li><b>Kızıl ve Gül Vadileri:</b> Büyüleyici bir manzara oluşturan kırmızı ve pembe kanyonlar.</li><li><b>Çavuşin:</b> Eşsiz mağara evleri ile pitoresk köy.</li><li><b>Yeraltı Şehri:</b> Antik topluluklar tarafından kullanılan karmaşık yeraltı sistemi.</li><li><b>Güvercinlik Vadisi:</b> Sayısız güvercin ve eşsiz kaya oluşumları ile güzel vadi.</li></ol><p>Turda öğle yemeği dahildir.</p>", "is_highlight" => true, "order" => 2]]],
                    ["day_number" => 6, "title" => "6. Gün - İstanbul'da Serbest Gün ve Konaklama", "activities" => [["description" => "Kahvaltı konaklamaya dahildir. İstanbul'u kendi başınıza biraz daha keşfetmek için serbest gün.", "is_highlight" => false, "order" => 1], ["description" => "Konaklama İstanbul'da.", "is_highlight" => false, "order" => 2]]],
                    ["day_number" => 7, "title" => "7. Gün - İstanbul'da Serbest Gün ve Konaklama", "activities" => [["description" => "Kahvaltı konaklamaya dahildir. İstanbul'u kendi başınıza biraz daha keşfetmek için 1 serbest gün daha.", "is_highlight" => false, "order" => 1], ["description" => "Konaklama İstanbul'da.", "is_highlight" => false, "order" => 2]]],
                    ["day_number" => 8, "title" => "8. Gün - İstanbul'dan Uluslararası Uçuş İçin Havaalanına Transfer", "activities" => [["description" => "Uluslararası uçuşlar için 2 saat önceden havaalanında check-in yapmanız gerekmektedir, bu nedenle İstanbul'daki otelinizden havaalanına 3 saat önceden transfer yeterli olacaktır.", "is_highlight" => false, "order" => 1], ["description" => "Havaalanına varışta hizmetlerimiz sona ermektedir.", "is_highlight" => false, "order" => 2]]]
                ],
                "optional_activity_data" => [
                    ["name" => "İstanbul Boğaz Turu", "description" => "Boğaz'ın iki yakasını birleştiren köprüleri ve sarayları görün.", "price" => 80.00, "image_url" => "https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "media_alt_text" => "İstanbul Boğaz Turu Görseli", "media_tags" => ["Boğaz", "Tekne"], "media_destination_slug" => "istanbul"],
                    ["name" => "Türk Gecesi ve Folklor Gösterileri", "description" => "Geleneksel Türk yemekleri eşliğinde canlı müzik ve folklor gösterileriyle eğlenceli bir akşam.", "price" => 75.00, "image_url" => "https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "media_alt_text" => "Türk Gecesi Gösterileri Görseli", "media_tags" => ["Eğlence", "Kültür"], "media_destination_slug" => "istanbul"],
                ]
            ],
            // Tur 2
            [
                "title" => "Akdeniz ve Ege Keşif Turu",
                "slug" => "akdeniz-ege-kesif-turu",
                "summary" => "Türkiye'nin güney ve batı kıyılarının eşsiz doğal güzellikleri.",
                "description" => "Türkiye'nin güney ve batı kıyılarının eşsiz doğal güzellikleri ve tarihi zenginlikleriyle dolu bir macera. Güneşli plajlardan antik kentlere, bu turda her şey var.",
                "image_url" => "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "media_alt_text" => "Akdeniz ve Ege Keşif Turu Ana Görseli",
                "media_tags" => ["Plaj", "Antik", "Doğa"],
                "media_destination_slug" => "antalya",
                "min_participants" => 10,
                "max_participants" => 20,
                "duration_days" => 7,
                "duration_nights" => 6,
                "language" => "Türkçe",
                "rating" => 4.7,
                "reviews_count" => 120,
                "is_published" => true,
                "inclusions_html" => "<p>Tüm transferler, Profesyonel rehberlik, Otel konaklaması, Belirtilen yemekler, Müze giriş ücretleri, Ulaşım, Öğle yemekleri</p>",
                "exclusions_html" => "<p>Uçak biletleri, Vize ücretleri, Kişisel harcamalar, Akşam yemekleri (tur günleri hariç), Opsiyonel aktiviteler, Bahşişler, Seyahat sigortası</p>",
                "destinations_slugs" => ["antalya", "fethiye"],
                "hotel_options_data" => [
                    "antalya_hotels" => [
                        ["name" => "Batihan Beach Resort", "category" => "Category A"],
                        ["name" => "Paloma Finesse", "category" => "Category A"],
                        ["name" => "Concorde De Luxe", "category" => "Category B"],
                        ["name" => "Limak Arcadia", "category" => "Category B"],
                        ["name" => "Maxx Royal Belek", "category" => "Category C"],
                        ["name" => "Regnum Carya", "category" => "Category C"],
                    ],
                    "fethiye_hotels" => [
                        ["name" => "Oyster Residences", "category" => "Category A"],
                        ["name" => "Belcekiz Beach Club", "category" => "Category A"],
                        ["name" => "Liberty Hotels Lykia", "category" => "Category B"],
                        ["name" => "Hillside Beach Club", "category" => "Category B"],
                        ["name" => "Club & Hotel Letoonia", "category" => "Category C"],
                        ["name" => "D-Resort Gocek", "category" => "Category C"],
                    ]
                ],
                "pricing_tiers_data" => [
                    ["season_name" => $seasons[0], "category" => $categories[0], "price_per_person_1" => 999.00, "price_per_person_2" => 899.00, "price_per_person_3" => 799.00],
                    ["season_name" => $seasons[0], "category" => $categories[1], "price_per_person_1" => 899.00, "price_per_person_2" => 799.00, "price_per_person_3" => 699.00],
                    ["season_name" => $seasons[0], "category" => $categories[2], "price_per_person_1" => 799.00, "price_per_person_2" => 699.00, "price_per_person_3" => 599.00],
                    ["season_name" => $seasons[1], "category" => $categories[0], "price_per_person_1" => 1099.00, "price_per_person_2" => 999.00, "price_per_person_3" => 899.00],
                    ["season_name" => $seasons[1], "category" => $categories[1], "price_per_person_1" => 999.00, "price_per_person_2" => 899.00, "price_per_person_3" => 799.00],
                    ["season_name" => $seasons[1], "category" => $categories[2], "price_per_person_1" => 899.00, "price_per_person_2" => 799.00, "price_per_person_3" => 699.00],
                    ["season_name" => $seasons[2], "category" => $categories[0], "price_per_person_1" => 1199.00, "price_per_person_2" => 1099.00, "price_per_person_3" => 999.00],
                    ["season_name" => $seasons[2], "category" => $categories[1], "price_per_person_1" => 1099.00, "price_per_person_2" => 999.00, "price_per_person_3" => 899.00],
                    ["season_name" => $seasons[2], "category" => $categories[2], "price_per_person_1" => 999.00, "price_per_person_2" => 899.00, "price_per_person_3" => 799.00],
                ],
                "gallery_image_urls" => [
                    "https://images.pexels.com/photos/3644742/pexels-photo-3644742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                ],
                "itinerary" => [
                    ["day_number" => 1, "title" => "1. Gün - Antalya Varış", "activities" => [["description" => "Havaalanından karşılama ve otele transfer.", "is_highlight" => false, "order" => 1]]],
                    ["day_number" => 2, "title" => "2. Gün - Antalya Şehir ve Plaj Keyfi", "activities" => [["description" => "Kahvaltıdan sonra Antalya şehir merkezini ziyaret edin. Kaleiçi, Hadrian Kapısı ve Yivliminare'yi keşfedin. Öğleden sonra Lara Plajı'nda serbest zamanın tadını çıkarın.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 3, "title" => "3. Gün - Perge, Aspendos ve Side Antik Kentleri", "activities" => [["description" => "Tam günlük antik kentler turu. Perge, Aspendos (tiyatro) ve Side'yi (Apollon Tapınağı) ziyaret edin. Öğle yemeği tur dahildir.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 4, "title" => "4. Gün - Fethiye'ye Yolculuk ve Ölüdeniz", "activities" => [["description" => "Antalya'dan Fethiye'ye transfer. Otele yerleştikten sonra dünyanın en güzel plajlarından biri olan Ölüdeniz'i ziyaret edin. Serbest zaman ve akşam yemeği.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 5, "title" => "5. Gün - Kelebekler Vadisi ve Tekne Turu", "activities" => [["description" => "Fethiye limanından tekne turu. Kelebekler Vadisi, Mavi Mağara ve çevredeki koyları ziyaret edin. Öğle yemeği teknede servis edilecektir.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 6, "title" => "6. Gün - Kayaköy ve Saklıkent Kanyonu", "activities" => [["description" => "Kayıp köy Kayaköy'ü ve ardından Saklıkent Kanyonu'nu ziyaret edin. Kanyon içinde yürüyüş ve serbest zaman. Akşam yemeği yerel bir restoranda.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 7, "title" => "7. Gün - Fethiye'den Ayrılış", "activities" => [["description" => "Kahvaltıdan sonra havaalanına transfer ve dönüş uçuşu.", "is_highlight" => false, "order" => 1]]]
                ],
                "optional_activity_data" => [
                    ["name" => "Dalyan Çamur Banyosu", "description" => "Dalyan'ın şifalı çamur banyolarında rahatlayın ve gençleşin. Tekne turu ve öğle yemeği dahildir.", "price" => 50.00, "image_url" => "https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "media_alt_text" => "Dalyan Çamur Banyosu Görseli", "media_tags" => ["Çamur", "Doğa"], "media_destination_slug" => "fethiye"],
                    ["name" => "Yamaç Paraşütü - Ölüdeniz", "description" => "Ölüdeniz'in muhteşem manzarası eşliğinde yamaç paraşütü deneyimi yaşayın.", "price" => 180.00, "image_url" => "https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "media_alt_text" => "Yamaç Paraşütü Ölüdeniz Görseli", "media_tags" => ["Macera", "Deniz"], "media_destination_slug" => "fethiye"],
                ]
            ],
            // Tur 3
            [
                "title" => "Karadeniz ve Yaylalar Turu",
                "slug" => "karadeniz-yaylalar-turu",
                "summary" => "Doğu Karadeniz'in eşsiz doğasında, yemyeşil yaylalar ve tarihi köylerle dolu bir macera.",
                "description" => "Doğu Karadeniz'in eşsiz doğasında, yemyeşil yaylalar ve tarihi köylerle dolu bir macera. Huzur ve doğa arayanlar için ideal.",
                "image_url" => "https://images.pexels.com/photos/772513/pexels-photo-772513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "media_alt_text" => "Karadeniz ve Yaylalar Turu Ana Görseli",
                "media_tags" => ["Yaylalar", "Doğa", "Dağ"],
                "media_destination_slug" => "trabzon",
                "min_participants" => 5,
                "max_participants" => 12,
                "duration_days" => 6,
                "duration_nights" => 5,
                "language" => "Türkçe",
                "rating" => 4.8,
                "reviews_count" => 90,
                "is_published" => true,
                "inclusions_html" => "<p>Tüm transferler, Profesyonel rehberlik, Otel konaklaması, Belirtilen yemekler, Müze giriş ücretleri, Ulaşım, Öğle yemekleri</p>",
                "exclusions_html" => "<p>Uçak biletleri, Vize ücretleri, Kişisel harcamalar, Akşam yemekleri (tur günleri hariç), Opsiyonel aktiviteler, Bahşişler, Seyahat sigortası</p>",
                "destinations_slugs" => ["trabzon", "rize"],
                "hotel_options_data" => [
                    "trabzon_hotels" => [
                        ["name" => "Zorlu Grand Hotel", "category" => "Category A"],
                        ["name" => "Novotel Trabzon", "category" => "Category A"],
                        ["name" => "Radisson Blu Hotel Trabzon", "category" => "Category B"],
                        ["name" => "Ramada Plaza Trabzon", "category" => "Category B"],
                        ["name" => "Park Dedeman Trabzon", "category" => "Category C"],
                        ["name" => "Uzungol Inan Kardeşler", "category" => "Category C"],
                    ],
                    "rize_hotels" => [
                        ["name" => "Rize Babillon Hotel", "category" => "Category A"],
                        ["name" => "Ramada Plaza Rize", "category" => "Category A"],
                        ["name" => "Rize Resort Hotel", "category" => "Category B"],
                        ["name" => "Ayder Yaylası Otelleri", "category" => "Category B"],
                        ["name" => "Ridos Thermal Hotel", "category" => "Category C"],
                        ["name" => "Ayder Doğa Resort", "category" => "Category C"],
                    ]
                ],
                "pricing_tiers_data" => [
                    ["season_name" => $seasons[0], "category" => $categories[0], "price_per_person_1" => 999.00, "price_per_person_2" => 899.00, "price_per_person_3" => 799.00],
                    ["season_name" => $seasons[0], "category" => $categories[1], "price_per_person_1" => 899.00, "price_per_person_2" => 799.00, "price_per_person_3" => 699.00],
                    ["season_name" => $seasons[0], "category" => $categories[2], "price_per_person_1" => 799.00, "price_per_person_2" => 699.00, "price_per_person_3" => 599.00],
                    ["season_name" => $seasons[1], "category" => $categories[0], "price_per_person_1" => 1099.00, "price_per_person_2" => 999.00, "price_per_person_3" => 899.00],
                    ["season_name" => $seasons[1], "category" => $categories[1], "price_per_person_1" => 999.00, "price_per_person_2" => 899.00, "price_per_person_3" => 799.00],
                    ["season_name" => $seasons[1], "category" => $categories[2], "price_per_person_1" => 899.00, "price_per_person_2" => 799.00, "price_per_person_3" => 699.00],
                    ["season_name" => $seasons[2], "category" => $categories[0], "price_per_person_1" => 1199.00, "price_per_person_2" => 1099.00, "price_per_person_3" => 999.00],
                    ["season_name" => $seasons[2], "category" => $categories[1], "price_per_person_1" => 1099.00, "price_per_person_2" => 999.00, "price_per_person_3" => 899.00],
                    ["season_name" => $seasons[2], "category" => $categories[2], "price_per_person_1" => 999.00, "price_per_person_2" => 899.00, "price_per_person_3" => 799.00],
                ],
                "gallery_image_urls" => [
                    "https://images.pexels.com/photos/1631664/pexels-photo-1631664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                ],
                "itinerary" => [
                    ["day_number" => 1, "title" => "1. Gün - Trabzon Varış", "activities" => [["description" => "Havaalanından karşılama ve otele transfer.", "is_highlight" => false, "order" => 1]]],
                    ["day_number" => 2, "title" => "2. Gün - Trabzon Şehir Turu ve Sümela Manastırı", "activities" => [["description" => "Kahvaltıdan sonra Trabzon şehir merkezini ziyaret edin. Ardından Sümela Manastırı'na (dışarıdan) hareket. Maçka ilçesinde öğle yemeği. Akşam yemeği ve konaklama Trabzon'da.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 3, "title" => "3. Gün - Uzungöl ve Ayder Yaylası", "activities" => [["description" => "Sabah Uzungöl'e hareket. Göl çevresinde yürüyüş ve fotoğraf çekimi için serbest zaman. Öğleden sonra Ayder Yaylası'na transfer. Ayder'de kaplıcaların keyfini çıkarın. Akşam yemeği ve konaklama Ayder'de.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 4, "title" => "4. Gün - Fırtına Vadisi ve Çamlıhemşin", "activities" => [["description" => "Ayder Yaylası'ndan Fırtına Vadisi'ne iniş. Çamlıhemşin'i ve tarihi köprülerini ziyaret edin. Rafting veya zipline gibi opsiyonel aktivitelere katılma imkanı. Akşam yemeği ve konaklama Ayder'de.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 5, "title" => "5. Gün - Rize ve Çay Plantasyonları", "activities" => [["description" => "Rize'ye transfer. Çay plantasyonlarını ve Rize Kalesi'ni ziyaret edin. Çay müzesinde çay tadımı. Akşam yemeği ve konaklama Rize'de.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 6, "title" => "6. Gün - Rize'den Ayrılış", "activities" => [["description" => "Kahvaltıdan sonra Rize-Artvin Havalimanı'na transfer ve dönüş uçuşu.", "is_highlight" => false, "order" => 1]]],
                ],
                "optional_activity_data" => [
                    ["name" => "Zipline ve Rafting - Fırtına Vadisi", "description" => "Fırtına Vadisi'nde adrenalin dolu zipline ve rafting deneyimi.", "price" => 60.00, "image_url" => "https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "media_alt_text" => "Zipline ve Rafting Fırtına Vadisi Görseli", "media_tags" => ["Macera", "Doğa"], "media_destination_slug" => "rize"],
                    ["name" => "Ayder Yaylası Yürüyüş Turu", "description" => "Ayder Yaylası'nın muhteşem doğasında rehber eşliğinde unutulmaz bir yürüyüş.", "price" => 40.00, "image_url" => "https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "media_alt_text" => "Ayder Yaylası Yürüyüş Turu Görseli", "media_tags" => ["Yaylalar", "Doğa"], "media_destination_slug" => "rize"],
                ]
            ],
            // Tur 4: Doğu Ekspresi Kış Masalı
            [
                "title" => "Doğu Ekspresi Kış Masalı",
                "slug" => "dogu-ekspresi-kis-masali",
                "summary" => "Kars'ın bembeyaz coğrafyasında unutulmaz bir kış masalı turu.",
                "description" => "Doğu Ekspresi ile Kars'a yolculuk, Çıldır Gölü'nde kızak keyfi, Sarıkamış'ta kayak ve daha fazlası. Soğuk kış günlerinde içinizi ısıtacak bir deneyim.",
                "image_url" => "https://images.pexels.com/photos/10777033/pexels-photo-10777033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "media_alt_text" => "Doğu Ekspresi Kış Masalı Ana Görseli",
                "media_tags" => ["Kış", "Tren", "Doğa", "Macera"],
                "media_destination_slug" => "kars",
                "min_participants" => 8,
                "max_participants" => 15,
                "duration_days" => 5,
                "duration_nights" => 4,
                "language" => "Türkçe",
                "rating" => 4.9,
                "reviews_count" => 180,
                "is_published" => true,
                "inclusions_html" => "<p>Doğu Ekspresi biletleri, Tüm transferler, Otel konaklaması, Belirtilen yemekler, Profesyonel rehberlik, Müze giriş ücretleri, Ulaşım</p>",
                "exclusions_html" => "<p>Kişisel harcamalar, Opsiyonel aktiviteler, Seyahat sigortası, Bahşişler</p>",
                "destinations_slugs" => ["kars", "erzurum"],
                "hotel_options_data" => [
                    "kars_hotels" => [
                        ["name" => "Cheltikov Hotel", "category" => "Category A"],
                        ["name" => "Hotel Kent Ani", "category" => "Category B"],
                        ["name" => "Kar's Otel", "category" => "Category C"],
                    ]
                ],
                "pricing_tiers_data" => [
                    ["season_name" => $seasons[0], "category" => $categories[0], "price_per_person_1" => 850.00, "price_per_person_2" => 800.00, "price_per_person_3" => 750.00],
                    ["season_name" => $seasons[0], "category" => $categories[1], "price_per_person_1" => 750.00, "price_per_person_2" => 700.00, "price_per_person_3" => 650.00],
                    ["season_name" => $seasons[0], "category" => $categories[2], "price_per_person_1" => 650.00, "price_per_person_2" => 600.00, "price_per_person_3" => 550.00],
                    ["season_name" => $seasons[1], "category" => $categories[0], "price_per_person_1" => 950.00, "price_per_person_2" => 900.00, "price_per_person_3" => 850.00],
                    ["season_name" => $seasons[1], "category" => $categories[1], "price_per_person_1" => 850.00, "price_per_person_2" => 800.00, "price_per_person_3" => 750.00],
                    ["season_name" => $seasons[1], "category" => $categories[2], "price_per_person_1" => 750.00, "price_per_person_2" => 700.00, "price_per_person_3" => 650.00],
                    ["season_name" => $seasons[2], "category" => $categories[0], "price_per_person_1" => 1050.00, "price_per_person_2" => 1000.00, "price_per_person_3" => 950.00],
                    ["season_name" => $seasons[2], "category" => $categories[1], "price_per_person_1" => 950.00, "price_per_person_2" => 900.00, "price_per_person_3" => 850.00],
                    ["season_name" => $seasons[2], "category" => $categories[2], "price_per_person_1" => 850.00, "price_per_person_2" => 800.00, "price_per_person_3" => 750.00],
                ],
                "gallery_image_urls" => [
                    "https://images.pexels.com/photos/13689233/pexels-photo-13689233.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/11040333/pexels-photo-11040333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/14946454/pexels-photo-14946454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                ],
                "itinerary" => [
                    ["day_number" => 1, "title" => "1. Gün - Ankara'dan Kars'a Doğu Ekspresi Yolculuğu", "activities" => [["description" => "Ankara'dan Doğu Ekspresi ile Kars'a hareket. Trende unutulmaz manzaralar eşliğinde yolculuk.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 2, "title" => "2. Gün - Kars Şehir Turu ve Ani Harabeleri", "activities" => [["description" => "Kars'a varış ve otele yerleşme. Kars Kalesi, Kümbet Camii ve ardından Ani Harabeleri'ni ziyaret. Akşam yemeği ve konaklama Kars'ta.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 3, "title" => "3. Gün - Çıldır Gölü ve Kızak Keyfi", "activities" => [["description" => "Çıldır Gölü'ne hareket. Göl üzerinde atlı kızak keyfi ve buzda balık avı izleme. Öğle yemeği göl kenarında. Akşam yemeği ve konaklama Kars'ta.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 4, "title" => "4. Gün - Sarıkamış ve Kayak Merkezi", "activities" => [["description" => "Sarıkamış'a transfer. Sarıkamış Kayak Merkezi'nde serbest zaman veya kayak imkanı. Akşam yemeği ve konaklama Kars'ta.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 5, "title" => "5. Gün - Kars'tan Dönüş", "activities" => [["description" => "Kahvaltıdan sonra Kars Havaalanı'na transfer ve dönüş uçuşu.", "is_highlight" => false, "order" => 1]]],
                ],
                "optional_activity_data" => [
                    ["name" => "Kayak Dersi - Sarıkamış", "description" => "Sarıkamış Kayak Merkezi'nde profesyonel eğitmenlerden kayak dersi alın.", "price" => 100.00, "image_url" => "https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "media_alt_text" => "Kayak Dersi Sarıkamış Görseli", "media_tags" => ["Kış", "Spor"], "media_destination_slug" => "kars"],
                ]
            ],
            // Tur 5: Likya Yolu Trekking Macerası
            [
                "title" => "Likya Yolu Trekking Macerası",
                "slug" => "likya-yolu-trekking-macerasi",
                "summary" => "Antalya'dan Fethiye'ye uzanan antik Likya Yolu'nda unutulmaz bir trekking deneyimi.",
                "description" => "Likya Yolu'nun en güzel parkurlarında yürüyüş, antik kentleri keşif ve Akdeniz'in eşsiz manzaralarının tadını çıkarma.",
                "image_url" => "https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "media_alt_text" => "Likya Yolu Trekking Macerası Ana Görseli",
                "media_tags" => ["Trekking", "Doğa", "Antik", "Macera"],
                "media_destination_slug" => "fethiye",
                "min_participants" => 6,
                "max_participants" => 12,
                "duration_days" => 7,
                "duration_nights" => 6,
                "language" => "İngilizce",
                "rating" => 4.8,
                "reviews_count" => 110,
                "is_published" => true,
                "inclusions_html" => "<p>Tüm transferler, Rehberlik, Konaklama (pansiyon/çadır), Belirtilen yemekler, Rotaya uygun ulaşım</p>",
                "exclusions_html" => "<p>Uçak biletleri, Kişisel harcamalar, Seyahat sigortası, Ekstra yiyecek ve içecekler</p>",
                "destinations_slugs" => ["fethiye", "antalya"],
                "hotel_options_data" => [
                    "fethiye_hotels" => [
                        ["name" => "Lycian Way Hotel", "category" => "Category A"],
                        ["name" => "Akdeniz Camping", "category" => "Category B"],
                    ],
                    "antalya_hotels" => [
                        ["name" => "Antalya Trekking Lodge", "category" => "Category A"],
                    ]
                ],
                "pricing_tiers_data" => [
                    ["season_name" => $seasons[0], "category" => $categories[0], "price_per_person_1" => 850.00, "price_per_person_2" => 800.00, "price_per_person_3" => 750.00],
                    ["season_name" => $seasons[0], "category" => $categories[1], "price_per_person_1" => 750.00, "price_per_person_2" => 700.00, "price_per_person_3" => 650.00],
                    ["season_name" => $seasons[0], "category" => $categories[2], "price_per_person_1" => 650.00, "price_per_person_2" => 600.00, "price_per_person_3" => 550.00],
                    ["season_name" => $seasons[1], "category" => $categories[0], "price_per_person_1" => 950.00, "price_per_person_2" => 900.00, "price_per_person_3" => 850.00],
                    ["season_name" => $seasons[1], "category" => $categories[1], "price_per_person_1" => 850.00, "price_per_person_2" => 800.00, "price_per_person_3" => 750.00],
                    ["season_name" => $seasons[1], "category" => $categories[2], "price_per_person_1" => 750.00, "price_per_person_2" => 700.00, "price_per_person_3" => 650.00],
                    ["season_name" => $seasons[2], "category" => $categories[0], "price_per_person_1" => 1050.00, "price_per_person_2" => 1000.00, "price_per_person_3" => 950.00],
                    ["season_name" => $seasons[2], "category" => $categories[1], "price_per_person_1" => 950.00, "price_per_person_2" => 900.00, "price_per_person_3" => 850.00],
                    ["season_name" => $seasons[2], "category" => $categories[2], "price_per_person_1" => 850.00, "price_per_person_2" => 800.00, "price_per_person_3" => 750.00],
                ],
                "gallery_image_urls" => [
                    "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/1525494/pexels-photo-1525494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/2409038/pexels-photo-2409038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                ],
                "itinerary" => [
                    ["day_number" => 1, "title" => "1. Gün - Fethiye'ye Varış ve Kayaköy", "activities" => [["description" => "Fethiye'ye varış, otele yerleşme ve Kayaköy'e kısa bir yürüyüş.", "is_highlight" => false, "order" => 1]]],
                    ["day_number" => 2, "title" => "2. Gün - Ölüdeniz'den Kabak Koyu'na Yürüyüş", "activities" => [["description" => "Ölüdeniz'den başlayarak Kelebekler Vadisi üzerinden Kabak Koyu'na trekking. Manzaralı patikalar ve molalar.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 3, "title" => "3. Gün - Kabak Koyu'ndan Alınca'ya", "activities" => [["description" => "Kabak Koyu'ndan şelaleler ve orman içinden Alınca köyüne zorlu ama keyifli bir tırmanış.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 4, "title" => "4. Gün - Yediburunlar ve Patara", "activities" => [["description" => "Alınca'dan Yediburunlar'a yürüyüş ve ardından Patara Antik Kenti'ni ve plajını ziyaret.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 5, "title" => "5. Gün - Kalkan ve Kaş", "activities" => [["description" => "Kalkan ve Kaş'ın şirin sokaklarını keşfetme. Opsiyonel tekne turu veya dalış imkanı.", "is_highlight" => false, "order" => 1]]],
                    ["day_number" => 6, "title" => "6. Gün - Xanthos, Letoon ve Saklıkent", "activities" => [["description" => "UNESCO Dünya Mirası Xanthos ve Letoon antik kentlerini ziyaret. Saklıkent Kanyonu'nda serinletici bir yürüyüş.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 7, "title" => "7. Gün - Dönüş", "activities" => [["description" => "Kahvaltıdan sonra transfer ve tur sonu.", "is_highlight" => false, "order" => 1]]],
                ],
                "optional_activity_data" => [
                    ["name" => "Dalış Dersi - Kaş", "description" => "Kaş'ın berrak sularında başlangıç seviyesi dalış dersi.", "price" => 150.00, "image_url" => "https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "media_alt_text" => "Dalış Dersi Kaş Görseli", "media_tags" => ["Deniz", "Macera"], "media_destination_slug" => "kas"],
                ]
            ],
            // Tur 6: Güneydoğu Anadolu Kültür Turu
            [
                "title" => "Güneydoğu Anadolu Kültür Turu",
                "slug" => "guneydogu-anadolu-kultur-turu",
                "summary" => "Medeniyetlerin beşiği Güneydoğu Anadolu'da tarihi ve kültürel bir yolculuk.",
                "description" => "Göbeklitepe'den Mardin'in taş evlerine, Gaziantep'in lezzet duraklarından Şanlıurfa'nın peygamberler şehrine, zengin bir kültür turu.",
                "image_url" => "https://images.pexels.com/photos/163049/mardin-turkey-travel-tourism-163049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "media_alt_text" => "Güneydoğu Anadolu Kültür Turu Ana Görseli",
                "media_tags" => ["Kültür", "Tarih", "Gastronomi"],
                "media_destination_slug" => "mardin",
                "min_participants" => 10,
                "max_participants" => 20,
                "duration_days" => 7,
                "duration_nights" => 6,
                "language" => "Türkçe",
                "rating" => 4.9,
                "reviews_count" => 200,
                "is_published" => true,
                "inclusions_html" => "<p>Tüm transferler, Profesyonel rehberlik, Otel konaklaması, Belirtilen yemekler, Müze giriş ücretleri, Ulaşım</p>",
                "exclusions_html" => "<p>Uçak biletleri, Kişisel harcamalar, Opsiyonel aktiviteler, Bahşişler</p>",
                "destinations_slugs" => ["gaziantep", "şanlıurfa", "mardin", "diyarbakır"],
                "hotel_options_data" => [
                    "gaziantep_hotels" => [
                        ["name" => "Tugcan Hotel", "category" => "Category A"],
                        ["name" => "Shimall Hotel", "category" => "Category B"],
                    ],
                    "sanliurfa_hotels" => [
                        ["name" => "El Ruha Hotel", "category" => "Category A"],
                        ["name" => "Nevali Hotel", "category" => "Category B"],
                    ],
                    "mardin_hotels" => [
                        ["name" => "Erdoba Evleri", "category" => "Category A"],
                        ["name" => "Maridin Hotel", "category" => "Category B"],
                    ]
                ],
                "pricing_tiers_data" => [
                    ["season_name" => $seasons[0], "category" => $categories[0], "price_per_person_1" => 1000.00, "price_per_person_2" => 900.00, "price_per_person_3" => 800.00],
                    ["season_name" => $seasons[0], "category" => $categories[1], "price_per_person_1" => 900.00, "price_per_person_2" => 800.00, "price_per_person_3" => 700.00],
                    ["season_name" => $seasons[0], "category" => $categories[2], "price_per_person_1" => 800.00, "price_per_person_2" => 700.00, "price_per_person_3" => 600.00],
                    ["season_name" => $seasons[1], "category" => $categories[0], "price_per_person_1" => 1100.00, "price_per_person_2" => 1000.00, "price_per_person_3" => 900.00],
                    ["season_name" => $seasons[1], "category" => $categories[1], "price_per_person_1" => 1000.00, "price_per_person_2" => 900.00, "price_per_person_3" => 800.00],
                    ["season_name" => $seasons[1], "category" => $categories[2], "price_per_person_1" => 900.00, "price_per_person_2" => 800.00, "price_per_person_3" => 700.00],
                    ["season_name" => $seasons[2], "category" => $categories[0], "price_per_person_1" => 1200.00, "price_per_person_2" => 1100.00, "price_per_person_3" => 1000.00],
                    ["season_name" => $seasons[2], "category" => $categories[1], "price_per_person_1" => 1100.00, "price_per_person_2" => 1000.00, "price_per_person_3" => 900.00],
                    ["season_name" => $seasons[2], "category" => $categories[2], "price_per_person_1" => 1000.00, "price_per_person_2" => 900.00, "price_per_person_3" => 800.00],
                ],
                "gallery_image_urls" => [
                    "https://images.pexels.com/photos/1578997/pexels-photo-1578997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/1194401/pexels-photo-1194401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/262967/pexels-photo-262967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                ],
                "itinerary" => [
                    ["day_number" => 1, "title" => "1. Gün - Gaziantep'e Varış ve Zeugma Mozaik Müzesi", "activities" => [["description" => "Gaziantep'e varış, otele yerleşme ve dünyanın en büyük mozaik müzelerinden Zeugma Mozaik Müzesi'ni ziyaret. Akşam yemeği ve konaklama Gaziantep'te.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 2, "title" => "2. Gün - Gaziantep Gastronomi Turu ve Bakırcılar Çarşısı", "activities" => [["description" => "Gaziantep'in meşhur mutfağını keşif: Katmer, baklava, kebap tadımı. Tarihi Bakırcılar Çarşısı ve Elmacı Pazarı'nı gezme. Akşam yemeği ve konaklama Gaziantep'te.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 3, "title" => "3. Gün - Şanlıurfa'ya Yolculuk ve Balıklıgöl", "activities" => [["description" => "Şanlıurfa'ya transfer. Balıklıgöl, Halil-ür Rahman Camii ve Ayn Zeliha Gölü'nü ziyaret. Akşam yemeği ve konaklama Şanlıurfa'da.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 4, "title" => "4. Gün - Göbeklitepe ve Harran", "activities" => [["description" => "Dünyanın en eski tapınaklarından Göbeklitepe'yi ziyaret. Harran Ören Yeri'nde konik evleri ve Harran Üniversitesi kalıntılarını görme. Akşam yemeği ve konaklama Şanlıurfa'da.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 5, "title" => "5. Gün - Mardin'e Yolculuk ve Dara Antik Kenti", "activities" => [["description" => "Mardin'e transfer. Dara Antik Kenti'nin büyüleyici kalıntılarını keşif. Akşam yemeği ve konaklama Mardin'de.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 6, "title" => "6. Gün - Mardin Şehir Turu ve Kasımiye Medresesi", "activities" => [["description" => "Mardin'in dar sokaklarında yürüyüş. Kasımiye Medresesi, Ulu Cami ve Deyrulzafaran Manastırı'nı ziyaret. Telkari çarşısında alışveriş. Akşam yemeği ve konaklama Mardin'de.", "is_highlight" => true, "order" => 1]]],
                    ["day_number" => 7, "title" => "7. Gün - Mardin'den Dönüş", "activities" => [["description" => "Kahvaltıdan sonra Mardin Havaalanı'na transfer ve dönüş uçuşu.", "is_highlight" => false, "order" => 1]]],
                ],
                "optional_activity_data" => [
                    ["name" => "Fırat Nehri Tekne Turu", "description" => "Halfeti'de Fırat Nehri üzerinde batık köy ve Rumkale'yi görmek için tekne turu.", "price" => 70.00, "image_url" => "https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "media_alt_text" => "Fırat Nehri Tekne Turu Görseli", "media_tags" => ["Nehir", "Doğa"], "media_destination_slug" => "sanliurfa"],
                ]
            ],
        ];
        
        foreach ($toursData as $tourData) {
            $tour = Tour::firstOrCreate(
                ['slug' => $tourData["slug"]],
                [
                    'title' => $tourData["title"],
                    'summary' => $tourData["summary"],
                    'description' => $tourData["description"],
                    'min_participants' => $tourData["min_participants"],
                    'max_participants' => $tourData["max_participants"],
                    'duration_days' => $tourData["duration_days"],
                    'duration_nights' => $tourData["duration_nights"],
                    'language' => $tourData["language"],
                    'rating' => $tourData["rating"],
                    'reviews_count' => $tourData["reviews_count"],
                    'is_published' => $tourData["is_published"],
                    'is_popular' => $tourData["is_popular"] ?? false,
                    'inclusions_html' => $tourData["inclusions_html"],
                    'exclusions_html' => $tourData["exclusions_html"],
                    'hotels' => $this->formatHotelsData($tourData['hotel_options_data']),
                ]
            );

            // Öne çıkan görseli ekle
            $destinationIdForFeaturedMedia = null;
            if (isset($tourData['media_destination_slug'])) {
                $destination = Destination::where('slug', $tourData['media_destination_slug'])->first();
                if ($destination) {
                    $destinationIdForFeaturedMedia = $destination->id;
                }
            }

            $media = $this->uploadAndSaveMedia(
                $tourData["image_url"],
                [
                    'tags' => $tourData['media_tags'] ?? null,
                    'destination_id' => $destinationIdForFeaturedMedia,
                ]
            );

            if ($media) {
                $tour->featured_media_id = $media->id;
                $tour->save();
                $this->command->info('Tur ana görseli başarıyla eklendi: ' . $tourData['title'] . ' (ID: ' . $media->id . ')');
            } else {
                $this->command->error('Tur ana görseli eklenemedi: ' . $tourData['title'] . '. Detaylar için loglara bakın.');
            }

            // Galeri görsellerini ekle
            $galleryMediaIds = [];
            foreach ($tourData["gallery_image_urls"] as $galleryImageUrl) {
                $destinationIdForGalleryMedia = null;
                if (isset($tourData['media_destination_slug'])) {
                    $destination = Destination::where('slug', $tourData['media_destination_slug'])->first();
                    if ($destination) {
                        $destinationIdForGalleryMedia = $destination->id;
                    }
                }

                $media = $this->uploadAndSaveMedia(
                    $galleryImageUrl,
                    [
                        'tags' => $tourData["media_tags"] ?? null,
                        'destination_id' => $destinationIdForGalleryMedia,
                    ]
                );

                if ($media) {
                    $galleryMediaIds[] = $media->id;
                    $this->command->info('Tur galeri görseli başarıyla eklendi: ' . $tourData['title'] . ' (ID: ' . $media->id . ')');
                } else {
                    $this->command->error('Tur galeri görseli eklenemedi: ' . $tourData['title'] . '. Detaylar için loglara bakın.');
                }
            }
            // Tur modelinde gallery_media_ids sütununu güncelle
            $tour->gallery_media_ids = $galleryMediaIds; // Artık json_encode etmiyoruz, modelde cast ediliyor
            $tour->save();

            // Tur günlerini ve aktivitelerini oluştur
            foreach ($tourData["itinerary"] as $dayData) {
                $tourDay = $tour->tourDays()->firstOrCreate(
                    ["day_number" => $dayData["day_number"]],
                    ["title" => $dayData["title"]]
                );

                foreach ($dayData["activities"] as $activityData) {
                    $tourDay->dayActivities()->firstOrCreate(
                        ["order" => $activityData["order"]],
                        ["description" => $activityData["description"], "is_highlight" => $activityData["is_highlight"]]
                    );
                }
            }

            // Pricing Tiers (Fiyatlandırma Katmanları) için
            foreach ($tourData['pricing_tiers_data'] as $pricingTierData) {
                TourPricingTier::create([
                    'tour_id' => $tour->id,
                    'season_name' => $pricingTierData['season_name'],
                    'category_name' => $pricingTierData['category'], // 'category' anahtarını 'category_name' olarak kullanıyoruz
                    'price_per_person_1' => $pricingTierData['price_per_person_1'],
                    'price_per_person_2' => $pricingTierData['price_per_person_2'] ?? null,
                    'price_per_person_3' => $pricingTierData['price_per_person_3'] ?? null,
                ]);
            }

            // Opsiyonel aktiviteleri oluştur ve ilişkilendir
            if (isset($tourData["optional_activity_data"])) {
                foreach ($tourData["optional_activity_data"] as $activityData) {
                    $optionalActivity = OptionalActivity::firstOrCreate(
                        ["name" => $activityData["name"]],
                        [
                            "description" => $activityData["description"],
                            "price" => $activityData["price"],
                            "is_published" => true,
                        ]
                    );

                    $destinationIdForOptionalActivityMedia = null;
                    if (isset($activityData['media_destination_slug'])) {
                        $destination = Destination::where('slug', $activityData['media_destination_slug'])->first();
                        if ($destination) {
                            $destinationIdForOptionalActivityMedia = $destination->id;
                        }
                    }

                    $media = $this->uploadAndSaveMedia(
                        $activityData["image_url"],
                        [
                            'tags' => $activityData["media_tags"] ?? null,
                            'destination_id' => $destinationIdForOptionalActivityMedia,
                        ]
                    );

                    if ($media) {
                        $optionalActivity->image_id = $media->id; // image_id'yi ata
                        $optionalActivity->save();

                        $this->command->info('Opsiyonel aktivite görseli başarıyla eklendi: ' . $activityData['name'] . ' (ID: ' . $media->id . ')');
                    } else {
                        $this->command->error('Opsiyonel aktivite görseli eklenemedi: ' . $activityData['name'] . '. Detaylar için loglara bakın.');
                    }
                    $tour->optionalActivities()->syncWithoutDetaching([$optionalActivity->id]);
                }
            }

            // Destinasyonları ilişkilendir
            if (isset($tourData["destinations_slugs"])) {
                $destinationIds = [];
                foreach ($tourData["destinations_slugs"] as $destinationSlug) {
                    $destination = Destination::where('slug', $destinationSlug)->first();
                    if ($destination) {
                        $destinationIds[] = $destination->id;
                    }
                }
                $tour->destinations()->syncWithoutDetaching($destinationIds);
            }
        }
    }

    private function formatHotelsData(array $hotelOptionsData): array
    {
        $formattedHotels = [];
        foreach ($hotelOptionsData as $cityKey => $hotelsList) {
            $cityName = Str::before($cityKey, '_hotels');
            $formattedHotels[$cityName] = [];

            foreach ($hotelsList as $hotelData) {
                $category = $hotelData['category'];
                if (!isset($formattedHotels[$cityName][$category])) {
                    $formattedHotels[$cityName][$category] = [];
                }
                $formattedHotels[$cityName][$category][] = ['name' => $hotelData['name']];
            }
        }
        return $formattedHotels;
    }
}
