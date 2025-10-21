import { Outlet } from 'react-router-dom';
import {
  Header,
  Footer,
  Banner,
  Search,
  Cards,
  Content,
  ControlPanel,
} from '../ui';
import {
  FOOTER_INFO,
  handleSubscribe,
  SOCIAL_LINKS,
} from '../../Constants/footerData';
import { useEffect, useState } from 'react';

export const Layout = () => {
  const currentYear = new Date().getFullYear();

  // Добавляем управление состояним темы
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = sessionStorage.getItem('theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    sessionStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Content>
      <Header userName="" />
      <ControlPanel theme={theme} setTheme={setTheme} />
      <main>
        <Banner />
        <Search />
        <Cards />
        <Outlet />
      </main>
      <Footer
        info={FOOTER_INFO}
        socialLinks={SOCIAL_LINKS}
        onSubscribe={handleSubscribe}
      />
    </Content>
  );
};

//! Footer
// info — текст для копирайта (© ...),
// socialLinks — список соцсетей,
// onSubscribe — функция, которая вызывается при нажатии на кнопку «Подписаться».
