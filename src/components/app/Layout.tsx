import {
  FOOTER_INFO,
  SOCIAL_LINKS,
  handleSubscribe,
} from '@/constants/footerData';
import { Outlet } from 'react-router-dom';
import { ContentToy, Header, Footer } from '../ui';
import { useCartContext } from '@/context/CartContex';
import { TCartItem } from '@/hooks/useCart';

export const Layout = () => {
  const { cartItems } = useCartContext();

  //считаем общее количество игрушек в корзине
  const basketTotal = cartItems.reduce(
    (sum: number, item: TCartItem) => sum + item.quantity,
    0
  );

  //считаем общее количество игрушек в избранном
  const favoritesCount = cartItems.reduce(
    (sum: number, item: TCartItem) => sum + item.quantity,
    0
  );

  return (
    <ContentToy>
      <Header userName="" basketTotal={basketTotal} favoritesCount={0} />

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
