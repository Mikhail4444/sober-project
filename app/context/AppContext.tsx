import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

type Theme = 'default' | 'dark' | 'light' | 'custom';
type Language = 'ru' | 'tt' | 'en';

interface AppContextType {
  theme: Theme;
  language: Language;
  isOverlayOpen: boolean;
  notifications: number;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  toggleOverlay: () => void;
  closeOverlay: () => void;
  updateNotifications: (count: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user, isGuest } = useAuth();
  const [theme, setTheme] = useState<Theme>('default');
  const [language, setLanguage] = useState<Language>('ru');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    // Загрузка сохраненных настроек
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  const updateNotifications = (count: number) => {
    setNotifications(count);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        language,
        isOverlayOpen,
        notifications,
        setTheme: handleThemeChange,
        setLanguage: handleLanguageChange,
        toggleOverlay,
        closeOverlay,
        updateNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 