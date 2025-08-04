import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill editor stilleri

// Tailwind CSS ile Quill'in default stillerini override etmek için
// Not: Bu kısım Tailwind yapılandırmanıza göre değişebilir.
// Aşağıdaki stiller genel bir başlangıç noktasıdır.
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

export function RichTextEditor({ value, onChange, className, ...props }) {
  return (
    <div className={className}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={quillModules}
        formats={quillFormats}
        className="rounded-md border border-input bg-background focus-within:ring-1 focus-within:ring-ring" // Shadcn Input'a benzer stil
        {...props}
      />
      {/* Quill editor için custom CSS buradan eklenebilir veya app.css'e dahil edilebilir */}
    </div>
  );
} 