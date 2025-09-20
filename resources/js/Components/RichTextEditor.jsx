// resources/js/Components/RichTextEditor.jsx

import React, { useState, useRef, useEffect } from 'react';
// ReactQuill'i doğrudan import etmek yerine, dinamik olarak yükleyeceğiz.
// import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; // CSS dosyasını import ediyoruz
import { Button } from '@/Components/ui/button';
import { Code } from 'lucide-react';

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
const RichTextEditor = React.forwardRef(({ value, onChange, placeholder, className, showHtmlButton = true }, ref) => {
  const [showHtml, setShowHtml] = useState(false);
  const [htmlValue, setHtmlValue] = useState(value || ''); // HTML modundaki değer
  const [richTextValue, setRichTextValue] = useState(value || ''); // Rich text modundaki değer
  const localRef = useRef();
  
  // SSR'da 'document is not defined' hatasını önlemek için
  // ReactQuill'i sadece client tarafında render ediyoruz.
  const [isClient, setIsClient] = useState(false);
  const [ReactQuill, setReactQuill] = useState(null);

  useEffect(() => {
    // Component mount olduğunda client tarafında olduğumuzu anlıyoruz.
    setIsClient(true);
    // Dinamik olarak react-quill'i import ediyoruz.
    import('react-quill').then((module) => {
      setReactQuill(() => module.default);
    });

    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && /findDOMNode/.test(args[0])) {
        return;
      }
      originalError.apply(console, args);
    };

    // Bileşen unmount olduğunda orijinal console.error fonksiyonunu geri yüklüyoruz.
    return () => {
      console.error = originalError;
    };
  }, []);

  // Değerleri sync'te tut - TAM İZOLASYON
  useEffect(() => {
    // HTML modundayken Quill'e hiç değer verme
    if (!showHtml) {
      setRichTextValue(value || '');
    }
    // HTML değerini sadece dışarıdan geldiğinde güncelle
    if (value !== htmlValue) {
      setHtmlValue(value || '');
    }
  }, [value]);

  // Mod geçişi - TAM İZOLASYON
  const handleModeSwitch = () => {
    if (showHtml) {
      // HTML'den editöre geçiş - HTML değerini parent'a gönder ama Quill'e VERME
      onChange(htmlValue);
      // Rich text değerini değiştirme, eski halini koru
    } else {
      // Editörden HTML'e geçiş - rich text değerini HTML'e aktar
      setHtmlValue(richTextValue);
    }
    setShowHtml(!showHtml);
  };

  // HTML textarea değişikliği
  const handleHtmlChange = (e) => {
    const newHtmlValue = e.target.value;
    setHtmlValue(newHtmlValue);
    onChange(newHtmlValue);
  };

  // Rich text değişikliği
  const handleRichTextChange = (content) => {
    setRichTextValue(content);
    onChange(content);
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }, { 'font': [] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font',
    'bold', 'italic', 'underline', 'blockquote',
    'list', 'bullet', 'indent',
    'align',
    'color', 'background',
    'link', 'image', 'video',
    'id', 'class', 'style', // ID, class ve style attribute'larını koru
  ];

  // Client tarafında değilsek veya modül henüz yüklenmediyse, bir placeholder göster.
  if (!isClient || !ReactQuill) {
    return <div>Editör yükleniyor...</div>;
  }

  return (
    <div className={`richtext-editor-wrapper border rounded-md ${className || ''}`}>
      {showHtmlButton && (
        <div className="p-2 border-b bg-gray-50 flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleModeSwitch}
          >
            <Code className="h-4 w-4 mr-2" />
            {showHtml ? 'Editöre Dön' : 'HTML Göster'}
          </Button>
        </div>
      )}

      <div className="p-1">
        {showHtml ? (
          <textarea
            className="w-full h-64 p-2 font-mono text-sm border-none rounded-md bg-gray-900 text-white focus:ring-0"
            value={htmlValue}
            onChange={handleHtmlChange}
            placeholder="HTML kodunu buraya girin..."
          />
        ) : (
          <ReactQuill
            ref={ref || localRef}
            theme="snow"
            value={richTextValue}
            onChange={handleRichTextChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder || 'İçeriğinizi buraya yazın...'}
            className="bg-white"
            preserveWhitespace={true}
          />
        )}
      </div>
    </div>
  );
});

export default RichTextEditor;
