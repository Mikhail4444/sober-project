import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  password: string;
  avatar?: string;
}

interface AuthContextType {
  isGuest: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  register: (email: string, name: string, password: string) => void;
  logout: () => void;
  continueAsGuest: () => void;
  updateAvatar: (avatarUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Проверяем localStorage при загрузке
    const storedUser = localStorage.getItem('fakeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Проверяем sessionStorage для гостевого режима
    const guestMode = sessionStorage.getItem('guestMode');
    if (guestMode === 'true') {
      setIsGuest(true);
    }
  }, []);

  const login = (email: string, password: string) => {
    // Фейковая проверка
    if (email === 'test@test.com' && password === '123456') {
      const userData = { email, name: 'Иван', password, avatar: 'https://i.pravatar.cc/150?img=1' };
      setUser(userData);
      localStorage.setItem('fakeUser', JSON.stringify(userData));
      setIsGuest(false);
      sessionStorage.removeItem('guestMode');
    }
  };

  const register = (email: string, name: string, password: string) => {
    const userData = { email, name, password, avatar: 'https://i.pravatar.cc/150?img=2' };
    setUser(userData);
    localStorage.setItem('fakeUser', JSON.stringify(userData));
    setIsGuest(false);
    sessionStorage.removeItem('guestMode');
  };

  const updateAvatar = (avatarUrl: string) => {
    if (user) {
      const updatedUser = { ...user, avatar: avatarUrl };
      setUser(updatedUser);
      localStorage.setItem('fakeUser', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fakeUser');
    setIsGuest(false);
    sessionStorage.removeItem('guestMode');
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    sessionStorage.setItem('guestMode', 'true');
  };

  return (
    <AuthContext.Provider value={{ isGuest, user, login, register, logout, continueAsGuest, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 