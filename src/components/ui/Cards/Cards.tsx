import styles from './Cards.module.scss';
import { Link } from 'react-router-dom';

// import heartIconCards from '/icon/heart.svg';
// import basketIcon from '/icon/basket.svg';
import { Button } from '../Button';
import { toys } from '../../../constants/toysData';
import { TCardProps } from './type';
import { HeartIcon } from '../../svg/HeartIcon';
import { BasketIcon } from '../../svg/BasketIcon/BasketIcon';
import { useTranslation } from 'react-i18next';

export const Cards = ({ onCardClick }: TCardProps) => {
  const { t } = useTranslation(); //хук для перевода

  return (
    <article className={styles.card}>
      {toys.map((toy) => (
        <div
          className={styles.cards}
          key={toy.id}
          onClick={() => onCardClick(toy)} //при клике открываем модалку
        >
          <div className={styles.imgCards}>
            <Button
              variant="like"
              onClick={(e) => e.stopPropagation()} //что бы при нажатии на сердечко не открывалась модалка
            >
              <HeartIcon className={styles.heartIconCards} />
            </Button>
            <Link to="/">
              <img
                className={styles.toy}
                src={toy.toyImage}
                alt={toy.titleKey}
              />
            </Link>
          </div>
          <p className={styles.title}>{t(toy.titleKey)}</p>
          <div className={styles.price}>
            <span>{t('toys.common.priceLabel')}:</span>
            <strong>{toy.price.toLocaleString('ru-RU')} ₽</strong>

            <Button
              className={styles.button}
              onClick={(e) => {
                e.stopPropagation(); // чтобы не открывалась модалка при добавлении в корзину
                alert('Добавлено в корзину');
              }}
            >
              <BasketIcon className={styles.basketIconCards} />
            </Button>
          </div>
        </div>
      ))}
    </article>
  );
};
