import { BrowserRouter } from 'react-router-dom';
import { Header, Cards, Content, Banner, Search, Footer } from '../ui';
import '../../index.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Content>
        <Header userName="" />
        <Banner />
        <Search />
        <Cards />
        <Footer
          info="© 2025 UnnToyStore. Все права защищены."
          socialLinks={[
            { name: 'Instagram', url: 'https://instagram.com' },
            { name: 'Vk', url: 'https://vk.com' },
            { name: 'Facebook', url: 'https://www.facebook.com' },
          ]}
          onSubscribe={(email) => console.log('Подписка:', email)}
        />
      </Content>
    </BrowserRouter>
  );
}
