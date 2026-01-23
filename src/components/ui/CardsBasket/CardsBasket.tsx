// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useCart } from '../../../hooks/useCart';
// import { Counter } from '../Counter';
// import { CardsBasketProps } from './type';
// import { BasketIcon } from '../../svg/BasketIcon';
// import { Button } from '../Button';
// import { HeartIcon } from '../../svg/HeartIcon';
// import { useCartContext } from '../../../context/CartContex';
import { BasketIcon } from '@/components/svg/BasketIcon';
import { HeartIcon } from '@/components/svg/HeartIcon';
import { useCartContext } from '@/context/CartContex';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button';
import { Counter } from '../Counter';
import styles from './CardsBasket.module.scss';
import { CardsBasketProps } from './type';

export function CardsBasket({ toysInCart }: CardsBasketProps) {
  const { t } = useTranslation(); //хук перевода

  const { cartItems, addToCart, removeFromCart } = useCartContext();

  return (
    <div className={styles.cardsGrid}>
      {toysInCart.map((toy) => {
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
          <div key={toy.id} className={styles.card}>
            <img
              className={styles.toy}
              src={toy.toyImage}
              alt={t(toy.titleKey)}
            />

            <p className={styles.title}>{t(toy.titleKey)}</p>

            <div className={styles.price}>
              <span>{t('toys.common.priceLabel')}:</span>
              <strong>{toy.price.toLocaleString('ru-RU')}</strong>
            </div>

            {quantity === 0 ? (
              <Button onClick={add} variant="like" className={styles.button}>
                <HeartIcon className={styles.heartIconCards} />
                <BasketIcon className={styles.basketIconCards} />
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
        );
      })}
    </div>
  );
}
