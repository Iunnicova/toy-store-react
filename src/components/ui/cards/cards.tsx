import React, { FC } from 'react';

import checkMark from '/icon/plus.svg';
import basketIcon from '/icon/basket.svg';
import heartIconCards from '/icon/heart.svg';
import styles from './cards.module.scss';
import { Button } from '../button';
import { NavLink } from 'react-router-dom';
import toyBee from '/images/toy.png';
import { TCardsProps } from './type';

export const Cards: FC<TCardsProps> = ({ title }) => (
  <main className={styles.cards}>
    <div className={styles.imgCards}>
      <NavLink
        to="/" //! обязательный проп: куда ведёт ссылка
      >
        <img
          src={heartIconCards}
          className={styles.heartIconCards}
          height="20"
          width="20"
          alt="Закладки"
        />
      </NavLink>
      <NavLink
        to="/" //! обязательный проп: куда ведёт ссылка
      >
        <img
          className={styles.toy}
          src={toyBee}
          height="90"
          width="90"
          alt="Пчела"
        />
      </NavLink>
    </div>
    <div className={styles.description}>
      <p className={styles.title}>Милашка Луна-дарит волшебный мёд</p>
    </div>
    <div className={styles.price}>
      <span>Цена:</span>
      <strong>5&nbsp;900&nbsp;₽</strong>

      <NavLink to="/">
        <Button onClick={() => alert('Корзина')} className={styles.button}>
          <img src={basketIcon} alt="Корзина" className={styles.icon} />
        </Button>
      </NavLink>
    </div>
  </main>
);

//  &nbsp - чтобы 5 900 не переносилось
