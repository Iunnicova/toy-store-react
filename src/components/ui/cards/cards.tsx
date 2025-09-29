import React, { FC } from 'react';

import heartIconCards from '/icon/heart.svg';
import styles from './cards.module.scss';

import { NavLink } from 'react-router-dom';
import toyBee from '/images/toy.png';
// import { TCardsProps } from './type';

// export const Cards: FC<TCardsProps> = ({title}) => (
export const Cards = () => (
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
  </main>
);
