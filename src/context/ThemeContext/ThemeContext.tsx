import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// createContext для создания глобального контекста, который позволяет передавать данные между компонентами без "пробрасывания" пропсов.

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  //- Сохраняем тему в localStorage — чтобы она сохранялась после выхода
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Provider — оборачивает дерево компонентов и передаёт значение.
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// useTheme удобный хук, чтобы получать theme и setTheme без лишнего импорта контекста.
export const useTheme = () => {
  const context = useContext(ThemeContext); //useContext — подключаемся к контексту
  if (!context) {
    throw new Error('useTheme должен использоваться внутри ThemeProvider');
  }
  return context;
};

//!🧠 Почему это удобно
// - Убирает необходимость передавать пропсы через 3–4 уровня компонентов.
// - Позволяет централизованно управлять состоянием (например, темой, языком, авторизацией).
// - Хорошо сочетается с useReducer, useState, useEffect.

//!⚠️ Частые ошибки
// - ❌ Использовать useContext вне Provider → будет undefined или значение по умолчанию.
// - ✅ Лучше задать undefined как default и выбрасывать ошибку, если контекст не найден:
