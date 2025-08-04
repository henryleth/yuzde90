<?php
    if (extension_loaded('gd')) {
        #header('Content-Type: image/png');
        $im = imagecreatetruecolor(100, 100);
        $text_color = imagecolorallocate($im, 233, 14, 91);
        imagestring($im, 1, 5, 5,  'Hello GD', $text_color);
        imagepng($im, 'test_gd_image.png');
        imagedestroy($im);
        echo "GD ile resim oluşturuldu: test_gd_image.png";
    } else {
        echo "GD uzantısı yüklü değil.";
    }
    ?>