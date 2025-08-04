// resources/js/Components/RichTextEditor.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/Components/ui/button'; // ShadCN Button bileşenini import ediyoruz
import { Code } from 'lucide-react'; // İkon import ediyoruz

/**
 * RichTextEditor Bileşeni
 * 
 * Proje genelinde kullanılmak üzere yapılandırılmış, zengin metin editörüdür.
 * HTML kaynak kodunu görüntüleme ve düzenleme özelliği eklenmiştir.
 * 
 * @param {string} value - Editörün mevcut içeriği (HTML formatında).
 * @param {function} onChange - Editör içeriği değiştiğinde tetiklenen fonksiyon.
 * @param {string} placeholder - Editör boşken gösterilecek metin.
 * @param {string} className - Bileşene uygulanacak ek CSS sınıfları.
 * @param {boolean} showHtmlButton - HTML göster/gizle düğmesinin görünürlüğünü kontrol eder. Varsayılan: true.
 */
const RichTextEditor = ({ value, onChange, placeholder, className, showHtmlButton = true }) => {
  const [showHtml, setShowHtml] = useState(false);
  const QuillComponent = useRef(null);
  const [isQuillLoaded, setIsQuillLoaded] = useState(false);

  // Bu useEffect, bileşenin yalnızca istemci tarafında (tarayıcıda)
  // yüklendiğinden emin olmak için kullanılır.
  useEffect(() => {
    // Dinamik import ile ReactQuill'i ve CSS'ini yalnızca istemci tarafında yüklüyoruz.
    import('react-quill').then(module => {
      QuillComponent.current = module.default;
      import('react-quill/dist/quill.snow.css');
      setIsQuillLoaded(true);
    });
  }, []);

  // Araç çubuğu için modül konfigürasyonu.
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }, { 'font': [] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  // Araç çubuğunda kullanılabilecek formatların listesi.
  const formats = [
    'header', 'font',
    'bold', 'italic', 'underline', 'blockquote',
    'list', 'bullet', 'indent',
    'align',
    'color', 'background',
    'link', 'image', 'video',
  ];

  return (
    <div className={`richtext-editor-wrapper border rounded-md ${className || ''}`}>
      {/* Editör ve HTML görünümü arasında geçiş yapan düğme (koşullu) */}
      {showHtmlButton && (
        <div className="p-2 border-b bg-gray-50 flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowHtml(!showHtml)}
          >
            <Code className="h-4 w-4 mr-2" />
            {showHtml ? 'Editöre Dön' : 'HTML Göster'}
          </Button>
        </div>
      )}

      {/* Koşullu olarak editör veya textarea'yı render et */}
      <div className="p-1">
        {showHtml ? (
          <textarea
            className="w-full h-64 p-2 font-mono text-sm border-none rounded-md bg-gray-900 text-white focus:ring-0"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="HTML kodunu buraya girin..."
          />
        ) : (
          // Quill yüklendiğinde editörü, yüklenmediğinde ise bir yüklenme göstergesi göster.
          isQuillLoaded && QuillComponent.current ? (
            <QuillComponent.current
              theme="snow"
              value={value}
              onChange={onChange}
              modules={modules}
              formats={formats}
              placeholder={placeholder || 'İçeriğinizi buraya yazın...'}
              className="bg-white" // Quill editörünün arkaplanını beyaz yapar
            />
          ) : <div>Editör yükleniyor...</div>
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;
