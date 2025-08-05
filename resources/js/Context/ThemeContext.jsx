import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Sunucu tarafında çökmemesi için başlangıç değerlerini güvenli hale getiriyoruz.
  const [darkMode, setDarkMode] = useState(false);
  const [isHeaderShrunk, setHeaderShrunk] = useState(false); // Header'ın küçülüp küçülmediğini takip eder
  const [isMounted, setIsMounted] = useState(false); // Bileşenin istemcide yüklendiğini takip etmek için

  // Sadece istemci tarafında çalışacak olan useEffect
  useEffect(() => {
    setIsMounted(true); // Bileşen yüklendi

    // localStorage'dan ayarları yükle
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Henüz istemcide değilsek, DOM manipülasyonu yapma

    // Dark mode sınıfını uygula
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode, isMounted]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const value = {
    darkMode,
    toggleDarkMode,
    isHeaderShrunk,
    setHeaderShrunk,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
