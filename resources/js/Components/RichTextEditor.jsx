// resources/js/Components/RichTextEditor.jsx

import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill'; // Doğrudan import ediyoruz
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
  const localRef = useRef();

  // findDOMNode uyarısını konsoldan gizlemek için bir useEffect kullanıyoruz.
  // Bu, kütüphaneden kaynaklanan ve bizim doğrudan çözemeyeceğimiz bir uyarı olduğu için
  // geçici bir çözümdür.
  useEffect(() => {
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

      <div className="p-1">
        {showHtml ? (
          <textarea
            className="w-full h-64 p-2 font-mono text-sm border-none rounded-md bg-gray-900 text-white focus:ring-0"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="HTML kodunu buraya girin..."
          />
        ) : (
          <ReactQuill
            ref={ref || localRef}
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder || 'İçeriğinizi buraya yazın...'}
            className="bg-white"
          />
        )}
      </div>
    </div>
  );
});

export default RichTextEditor;
