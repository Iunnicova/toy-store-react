import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from '../pages/homePage';
import { BasketPage } from '../pages/basketPage';
import { ProfilePage } from '../pages/profilePage';
import { BookmarksPage } from '../pages/bookmarksPage';
import { ThemeProvider } from '../ui/ThemeContext/ThemeContext';
import { LanguageProvider } from '../../constants/LanguageContext';
import { ControlPanel, LanguageDropdown } from '../ui';

const App = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        {/* <header>
          <LanguageDropdown />
        </header> */}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="basket" element={<BasketPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="bookmarks" element={<BookmarksPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
