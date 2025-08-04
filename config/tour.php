<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Tour Seasons
    |--------------------------------------------------------------------------
    |
    | Define the standard seasons used for tour pricing. These names are used
    | to generate the pricing matrix in the admin panel and are stored
    | directly in the `tour_pricing_tiers` table.
    |
    */
    'seasons' => [
        'Düşük Sezon' => 'Kasım - Mart',
        'Orta Sezon' => 'Nisan - Mayıs / Eylül - Ekim',
        'Yüksek Sezon' => 'Haziran - Ağustos',
    ],

    /*
    |--------------------------------------------------------------------------
    | Tour Categories
    |--------------------------------------------------------------------------
    |
    | Define the standard accommodation or pricing categories. Like seasons,
    | these are used to build the pricing matrix.
    |
    */
    'categories' => [
        'Category A',
        'Category B',
        'Category C',
    ],
];
