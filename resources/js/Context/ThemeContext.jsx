import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Sunucu tarafında çökmemesi için başlangıç değerlerini güvenli hale getiriyoruz.
  const [darkMode, setDarkMode] = useState(false);
  const [currentFont, setCurrentFont] = useState('inter');
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [isHeaderShrunk, setHeaderShrunk] = useState(false); // Header'ın küçülüp küçülmediğini takip eder
  const [isMounted, setIsMounted] = useState(false); // Bileşenin istemcide yüklendiğini takip etmek için

  const fonts = {
    inter: { name: 'Inter', class: 'font-inter' },
    poppins: { name: 'Poppins', class: 'font-poppins' },
    outfit: { name: 'Outfit', class: 'font-outfit' },
    spaceGrotesk: { name: 'Space Grotesk', class: 'font-space-grotesk' },
  };

  // Sadece istemci tarafında çalışacak olan useEffect
  useEffect(() => {
    setIsMounted(true); // Bileşen yüklendi

    // localStorage'dan ayarları yükle
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);

    const savedFont = localStorage.getItem('currentFont') || 'inter';
    setCurrentFont(savedFont);
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

  useEffect(() => {
    if (!isMounted) return; // Henüz istemcide değilsek, DOM manipülasyonu yapma

    // Font sınıfını uygula
    Object.values(fonts).forEach(font => {
      document.documentElement.classList.remove(font.class);
    });
    document.documentElement.classList.add(fonts[currentFont].class);
    localStorage.setItem('currentFont', currentFont);

    document.documentElement.style.setProperty('--site-font-family', fonts[currentFont].name + ', sans-serif');
  }, [currentFont, isMounted]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const changeFont = (fontKey) => {
    setCurrentFont(fontKey);
    setShowFontMenu(false); // Close font menu after selection
  };

  const value = {
    darkMode,
    toggleDarkMode,
    currentFont,
    changeFont,
    fonts,
    showFontMenu,
    setShowFontMenu,
    isHeaderShrunk,
    setHeaderShrunk,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
