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

export const Layout = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Content>
      <Header userName="" />
      <ControlPanel />
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
