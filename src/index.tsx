// Импортируем createRoot из React 18 API
// (раньше был ReactDOM.render, но он устарел)
import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react'; // StrictMode — специальный режим React помогает находить потенциальные проблемы (не влияет на продакшн).

import App from './components/app/App'; // Главный компонент приложения

import './styles/main.scss'; // Глобальные стили (Sass/SCSS)

import './i18n'; //библиотека языков
import { LanguageProvider } from './constants/LanguageContext';

const domNode = document.getElementById('root') as HTMLDivElement; // Находим div с id="root" в index.html,сюда React будет рендерить всё приложение

const root = createRoot(domNode); // Создаём "корень" для приложения (React 18+)

root.render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
