import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './header.module.scss';
import { LogoSvg } from '../../svg/LogoSvg';

import { THeaderUIProps } from './type';

export const HeaderUl: FC<THeaderUIProps> = ({ userName }) => (
  <header className="container">
    <main className={`${styles.header} p-4`}>         {/*коментарий-(*1) */}
      <div className={styles.menu_part_logoSvg}>
        <NavLink
          to="/" //! обязательный проп: куда ведёт ссылка
        >
          <div className={styles.link}>
            <LogoSvg className={styles.LogoSvgStore} />
            <h1 className={styles.storeName}>Baby's Smile</h1>
          </div>
        </NavLink>
        <div className={styles.sloganWrapper}>
          <p className={styles.slogan}>Toys that make you smile!</p>
        </div>
      </div>
      <div className={styles.header__actions}>
        <nav className={styles.header__actions}></nav>
      </div>
    </main>
  </header>
);

//*! 1
//*Margin (внешние отступы)
// m-4 → отступ со всех сторон
// mx-4 → по горизонтали
// my-4 → по вертикали
// mt-4 → сверху
// mr-4 → справа
// mb-4 → снизу
// ml-4 → слева

//*Шкала Tailwind (по умолчанию)
// 0 → 0px
// 1 → 0.25rem (4px)
// 2 → 0.5rem (8px)
// 3 → 0.75rem (12px)
// 4 → 1rem (16px)
// 5 → 1.25rem (20px)
// 6 → 1.5rem (24px)

//! *2
// Если isActive === true → возвращается строка ${styles.link} ${styles.link_active}
// (оба класса применяются: базовый и активный)

// Если isActive === false → возвращается строка ${styles.link}
// (только базовый класс)
