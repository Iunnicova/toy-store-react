import styles from './cards.module.scss';
import basketIcon from '/icon/basket.svg';
import heartIconCards from '/icon/heart.svg';

import { Button } from '../button';
import { NavLink } from 'react-router-dom';
import { toys } from './toysData';

export const Cards = () => {
  return (
    <article className={styles.card}>
      {toys.map((toy) => (
        <div className={styles.cards} key={toy.id}>
          <div className={styles.imgCards}>
            <NavLink to="/">
              <img
                src={heartIconCards}
                className={styles.heartIconCards}
                height={40}
                width={40}
                alt="Закладки"
              />
            </NavLink>

            <NavLink to="/">
              <img
                className={styles.toy}
                src={toy.toyImage}
                height={150}
                width={150}
                alt={toy.title}
              />
            </NavLink>
          </div>

          <p className={styles.title}>{toy.title}</p>

          <div className={styles.price}>
            <span>Цена:</span>
            <strong>{toy.price?.toLocaleString('ru-RU')} ₽</strong>

            <NavLink to="/">
              <Button
                className={styles.button}
                onClick={() => alert('Добавлено в корзину')}
              >
                <img className={styles.icon} src={basketIcon} alt="Корзина" />
              </Button>
            </NavLink>
          </div>
        </div>
      ))}
    </article>
  );
};
