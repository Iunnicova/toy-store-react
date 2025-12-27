import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import jackdaw from '../../../../icon/jackdaw.svg';
import { Button } from '../Button';
import { TCardProps } from './type';
import { HeartIcon } from '../../svg/HeartIcon';
import { BasketIcon } from '../../svg/BasketIcon/BasketIcon';
import styles from './Cards.module.scss';

export const Cards = ({ toy, onCardClick }: TCardProps) => {
  const { t } = useTranslation(); //хук для перевода

  //!для изменения значка корзины
  const [isAdded, setIsAdded] = useState(false);

  // Добавляем в корзину на сервере
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    await fetch('http://localhost:3001/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toyId: toy.id }),
    });
    setIsAdded(true);
  };

  useEffect(() => {
  fetch('http://localhost:3001/cart')
    .then(res => res.json())
    .then(data => {
      const cartToyIds = data.map((item: any) => item.toyId);
      if (cartToyIds.includes(toy.id)) {
        setIsAdded(true);
      }
    });
}, [toy.id]);

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
      <p className={styles.title}>{t(toy.titleKey)}</p>
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
