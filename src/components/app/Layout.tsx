// import { Outlet } from 'react-router-dom';
// import { Header, Footer, ContentToy } from '../ui';

import {
  FOOTER_INFO,
  SOCIAL_LINKS,
  handleSubscribe,
} from '@/constants/footerData';
import { Outlet } from 'react-router-dom';
import { ContentToy, Header, Footer } from '../ui';

// import {
//   FOOTER_INFO,
//   handleSubscribe,
//   SOCIAL_LINKS,
// } from '../../constants/footerData';

export const Layout = () => {
  return (
    <ContentToy>
      <Header userName="" />

      <main>
        <Outlet /> {/*HomePage, FavoritesPage, Basket и т.д. */}
      </main>

      <Footer
        info={FOOTER_INFO}
        socialLinks={SOCIAL_LINKS}
        onSubscribe={handleSubscribe}
      />
    </ContentToy>
  );
};
