<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Dinamik Rota Yapıları
    |--------------------------------------------------------------------------
    |
    | Bu dosya, uygulamanın URL (permalink) yapılarını .env dosyasından
    | dinamik olarak okumak için kullanılır. .env dosyasında belirtilmezse,
    | varsayılan değerler kullanılır.
    |
    */

    // Tur Rotaları
    'tour_index' => env('ROUTE_TOUR_INDEX', 'tours'),
    'tour_show' => env('ROUTE_TOUR_SHOW', 'tur-detay/{slug}'),

    // İçerik Rotaları
    'content_index' => env('ROUTE_CONTENT_INDEX', 'contents'),
    'content_show' => env('ROUTE_CONTENT_SHOW', 'contents/{slug}'),

    // Destinasyon Rotaları
    'destination_index' => env('ROUTE_DESTINATION_INDEX', 'destinations'),
    'destination_show' => env('ROUTE_DESTINATION_SHOW', 'destinations/{slug}'),

    // Statik Sayfa Rotaları
    'about_us' => env('ROUTE_ABOUT_US', 'about'),
    'contact_us' => env('ROUTE_CONTACT_US', 'contact'),
];
