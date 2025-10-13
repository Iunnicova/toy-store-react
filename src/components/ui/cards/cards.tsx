import styles from './Cards.module.scss';
import basketIcon from '/icon/basket.svg';
import heartIconCards from '/icon/heart.svg';

import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { toys } from '../../../Constants/toysData';

export const Cards = () => {
  return (
    <article className={styles.card}>
      {toys.map((toy) => (
        <div className={styles.cards} key={toy.id}>
          <div className={styles.imgCards}>
            <button className={styles.heartButton}>
              <img
                className={styles.heartIconCards}
                src={heartIconCards}
                alt="Закладки"
              />
            </button>
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
              onClick={() => alert('Добавлено в корзину')}
            >
              <img className={styles.icon} src={basketIcon} alt="Корзина" />
            </Button>
          </div>
        </div>
      ))}
    </article>
  );
};
