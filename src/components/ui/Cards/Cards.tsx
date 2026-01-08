import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import jackdaw from '../../../../icon/jackdaw.svg';
import { Button } from '../Button';
import { TCardProps } from './type';
import { HeartIcon } from '../../svg/HeartIcon';
import { BasketIcon } from '../../svg/BasketIcon/BasketIcon';
import styles from './Cards.module.scss';
import { useCart } from '../../../hooks/useCart';

export const Cards = ({ toy, onCardClick }: TCardProps) => {
  const { t } = useTranslation(); //хук для перевода

  //!для изменения значка корзины
  const { cartItems, addToCart } = useCart();
  const isAdded = cartItems.some((item) => item.toyId === toy.id);

  // Добавляем в корзину на сервере
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await addToCart(toy.id);
  };

  return (
    <div
      className={styles.cards}
      key={toy.id}
      onClick={() => onCardClick?.(toy)} //при клике открываем модалку
    >
      <div className={styles.imgCards}>
        <Button
          variant="like"
          onClick={(e) => {
            e.stopPropagation(); //что бы при нажатии на сердечко не открывалась модалка
            alert('Добавлено в избранное');
          }}
        >
          <HeartIcon className={styles.heartIconCards} />
        </Button>
        <img className={styles.toy} src={toy.toyImage} alt={t(toy.titleKey)} />
      </div>
      <p className={styles.title} data-tooltip="очень длинный текст">
        {t(toy.titleKey)}
      </p>
      <div className={styles.price}>
        <span>{t('toys.common.priceLabel')}:</span>
        <strong>{toy.price.toLocaleString('ru-RU')}</strong>

        <Button className={styles.button} onClick={handleAddToCart}>
          {isAdded ? (
            <div
              className={styles.navigation}
              // aria-label={resolveAria(item.ariaLabel)}
            >
              <img
                src={jackdaw}
                alt="Добавлено"
                className={styles.basketIconCards}
              />
            </div>
          ) : (
            <BasketIcon className={styles.basketIconCards} />
          )}
        </Button>
      </div>
    </div>
  );
};
