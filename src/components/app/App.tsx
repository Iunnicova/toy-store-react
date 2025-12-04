import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';

import { BasketPage } from '../pages/BasketPage/BasketPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';

import { ThemeProvider } from '../ui/ThemeContext/ThemeContext';
import { LanguageProvider } from '../../constants/LanguageContext';
import { ControlPanel, LanguageDropdown } from '../ui';
import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage';
import { HomePage } from './HomePage/HomePage';
// import { HomePage } from './HomePage';

const App = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="basket" element={<BasketPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="favorites" element={<FavoritesPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
