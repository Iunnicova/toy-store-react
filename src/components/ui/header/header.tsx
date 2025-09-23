import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './header.module.scss';
import { LogoSvg } from '../../svg/LogoSvg';

import { THeaderUIProps } from './type';

export const HeaderUl: FC<THeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <main className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_logoSvg}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.link_active}` : `${styles.link}` //*1
          }
          to="/" // обязательный проп: куда ведёт ссылка
        >

      {({ isActive }) => (
    <div className={isActive ? `${styles.link} ${styles.link_active}` : styles.link}>
      <LogoSvg 
      className={styles.LogoSvgStore}
      type={isActive ? 'primary' : 'secondary'} />
      <h1 className={styles.storeName}>Baby's Smile</h1>
    </div>
  )}
        </NavLink>
         <div className={styles.sloganWrapper}>
          <p className={styles.slogan}>Toys that make you smile</p>
        </div>
      </div>
      
    </main>
  </header>
);

//! *1 
// Если isActive === true → возвращается строка ${styles.link} ${styles.link_active}
// (оба класса применяются: базовый и активный)

// Если isActive === false → возвращается строка ${styles.link}
// (только базовый класс)