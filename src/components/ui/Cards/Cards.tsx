import styles from './Cards.module.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import jackdaw from '../../../../icon/jackdaw.svg';
import { Button } from '../Button';
import { toys } from '../../../constants/toysData';
import { TCardProps } from './type';
import { HeartIcon } from '../../svg/HeartIcon';
import { BasketIcon } from '../../svg/BasketIcon/BasketIcon';
import { Counter } from '../Counter/Counter';
import { Link } from 'react-router-dom';
import { BasketPage } from '../../pages/BasketPage/BasketPage';

export const Cards = ({ toy, onCardClick }: TCardProps) => {
  const { t } = useTranslation(); //хук для перевода

  //!для изменения значка корзины
  const [isAdded, setIsAdded] = useState(false);

  // при загрузке взаимодействует с хранилищем браузера ( localStorage) для сохранения данных между сеансами
  useEffect(() => {
    const saved = localStorage.getItem('cart') || '[]';
    const cart = JSON.parse(saved);
    if (cart.includes(toy.id)) {
      setIsAdded(true);
    }
  }, [toy.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // alert('Добавлено в корзину');
    setIsAdded(true);

    const saved = localStorage.getItem('cart') || '[]';
    const cart = JSON.parse(saved);
    if (!cart.includes(toy.id)) {
      cart.push(toy.id);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
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
        <img className={styles.toy} src={toy.toyImage} alt={toy.titleKey} />
      </div>
      <p className={styles.title}>{t(toy.titleKey)}</p>
      <div className={styles.price}>
        <span>{t('toys.common.priceLabel')}:</span>
        <strong>{toy.price.toLocaleString('ru-RU')}</strong>

        <Button className={styles.button} onClick={handleAddToCart}>
          {isAdded ? (
            <Link
              to="/basket"
              className={styles.navigation}
              // aria-label={resolveAria(item.ariaLabel)}
            >
              <img
                src={jackdaw}
                alt="Добавлено"
                className={styles.basketIconCards}
              />
            </Link>
          ) : (
            <BasketIcon className={styles.basketIconCards} />
          )}
        </Button>
      </div>
    </div>
  );
};
