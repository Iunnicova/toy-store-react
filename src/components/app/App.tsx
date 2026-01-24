import { CartProvider } from '@/context/CartContex';
import { LanguageProvider } from '@/context/LanguageContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BasketPage } from '../pages/BasketPage';
import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { ThemeProvider } from '@context/ThemeContext';
import { HomePage } from './HomePage/HomePage';
import { Layout } from './Layout';

const App = () => {
  return (
    <CartProvider>
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
    </CartProvider>
  );
};

export default App;
