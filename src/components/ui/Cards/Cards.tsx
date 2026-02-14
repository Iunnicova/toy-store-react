import { useCartContext } from '@/context/CartContex';
import { useTranslation } from 'react-i18next';

import heart2 from '@icon/heart2.svg';
import { HeartIcon } from '@/components/svg/HeartIcon';
import { BasketIcon } from '@/components/svg/BasketIcon';
import { Button, Counter } from '../index';
import { TCardProps } from './type';
import styles from './Cards.module.scss';
import { useFavoritesContext } from '@/context/FavoritesContext';

export const Cards = ({ toy, onCardClick }: TCardProps) => {
  const { t } = useTranslation();
  //!добавление удаление из избранное
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoritesContext();

  const isFavorite = favorites.some((f) => f.toyId === toy.id);

  //!добавление удаление из корзины
  const { cartItems, addToCart, removeFromCart } = useCartContext();
  const cartItem = cartItems.find((item) => item.toyId === toy.id);
  const quantity = cartItem?.quantity ?? 0;

  const add = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    addToCart(toy.id);
  };

  const remove = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    removeFromCart(toy.id);
  };

  return (
    <div className={styles.cards} onClick={() => onCardClick?.(toy)}>
      <div className={styles.imgCards}>
        {!isFavorite ? (
          <Button
            variant="like"
            onClick={(e) => {
              e.stopPropagation(); //что бы при нажатии на сердечко не открывалась модалка
              addToFavorites(toy.id);
            }}
          >
            <HeartIcon className={styles.heartIconCards} />
          </Button>
        ) : (
          <Button
            variant="like"
            onClick={(e) => {
              e.stopPropagation(); //что бы при нажатии на сердечко не открывалась модалка
              removeFromFavorites(toy.id);
            }}
          >
            <img
              className={styles.iconHeart}
              src={heart2}
              alt="красное сердце"
            />
          </Button>
        )}
        <img className={styles.toy} src={toy.toyImage} alt={t(toy.titleKey)} />
      </div>

      <p className={styles.title}>{t(toy.titleKey)}</p>

      <div className={styles.actions}>
        <div className={styles.price}>
          <span>{t('toys.common.priceLabel')}:</span>
          <strong>{toy.price.toLocaleString('ru-RU')}</strong>
        </div>

        {quantity === 0 ? (
          <Button
            onClick={add}
            variant="headerButton"
            className={styles.button}
          >
            <BasketIcon className={styles.basketIconCards} />
            <span>{t('toys.common.basket')}</span>
          </Button>
        ) : (
          <Counter
            className={styles.counter}
            value={quantity}
            onIncrement={add}
            onDecrement={remove}
          />
        )}
      </div>
    </div>
  );
};
