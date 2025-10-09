import { Outlet } from 'react-router-dom';
import { Header, Footer, Banner, Search, Cards, Content } from '../ui';

export const Layout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Content>
      <Header userName="" />
      <main>
        <Banner />
        <Search />
        <Cards />
        <Outlet />
      </main>
      <Footer
        info={`© ${currentYear} UnnToyStore. Все права защищены.`}
        socialLinks={[
          { name: 'Instagram', url: 'https://instagram.com' },
          { name: 'Vk', url: 'https://vk.com' },
          { name: 'Facebook', url: 'https://facebook.com' },
        ]}
        onSubscribe={(email) => console.log('Подписка:', email)}
      />
    </Content>
  );
};
