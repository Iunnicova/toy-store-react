import styles from './Cards.module.scss';
import { Link } from 'react-router-dom';

import heartIconCards from '/icon/heart.svg';
import basketIcon from '/icon/basket.svg';
import { Button } from '../Button';
import { toys } from '../../../Constants/toysData';

type CardProps = {
  onCardClick: (toy: any) => void;
};

export const Cards = ({ onCardClick }: CardProps) => {
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
              className={styles.heartButton}
              onClick={(e) => e.stopPropagation()} //что бы при нажатии на сердечко не открывалась модалка
            >
              <img
                className={styles.heartIconCards}
                src={heartIconCards}
                alt="Закладки"
              />
            </Button>
            <Link to="/">
              <img className={styles.toy} src={toy.toyImage} alt={toy.title} />
            </Link>
          </div>
          <p className={styles.title}>{toy.title}</p>
          <div className={styles.price}>
            <span>Цена:</span>
            <strong>{toy.price?.toLocaleString('ru-RU')} ₽</strong>
            <Button
              className={styles.button}
              onClick={(e) => {
                e.stopPropagation(); // чтобы не открывалась модалка при добавлении в корзину
                alert('Добавлено в корзину');
              }}
            >
              <img className={styles.icon} src={basketIcon} alt="Корзина" />
            </Button>
          </div>
        </div>
      ))}
    </article>
  );
};
