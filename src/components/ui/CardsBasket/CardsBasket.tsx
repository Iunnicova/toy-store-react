import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../../hooks/useCart';
import { Counter } from '../Counter';
import styles from './CardsBasket.module.scss';
import { CardsBasketProps } from './type';
import { BasketIcon } from '../../svg/BasketIcon';
import { Button } from '../Button';
import { HeartIcon } from '../../svg/HeartIcon';

export function CardsBasket({ toysInCart }: CardsBasketProps) {
  const { addToCart, removeFromCart } = useCart();
  const { t } = useTranslation(); //хук перевода

  return (
    <div className={styles.cardsGrid}>
      {toysInCart.map((toy) => (
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
          <Counter
            value={toy.quantity}
            onIncrement={() => addToCart(toy.id)}
            onDecrement={() => removeFromCart(toy.id)}
          />
          <Button variant="like" className={styles.button}>
            <HeartIcon className={styles.heartIconCards} />
            <BasketIcon className={styles.basketIconCards} />
          </Button>
        </div>
      ))}
    </div>
  );
}
