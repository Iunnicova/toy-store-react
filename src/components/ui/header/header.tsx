import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './header.module.scss';
import { LogoSvg } from '../../svg/LogoSvg';
import basketIcon from '/icon/basket.svg';
import heartIcon from '/icon/heart.svg';
import profileIcon from '/icon/profile.svg';
import { THeaderProps } from './type';
import { Button } from '../button';

export const Header: FC<THeaderProps> = ({ userName }) => (
  <header className="container">
    <nav className={`${styles.header} p-4`}>
      <NavLink
        to="/" //! обязательный проп: куда ведёт ссылка
      >
        <div className={styles.link}>
          <LogoSvg className={styles.logo} />
          <div className={styles.brand}>
            <h1 className={styles.title}>Baby's Smile</h1>
            <p className={styles.slogan}>Toys that make you smile!</p>
          </div>
        </div>
      </NavLink>
      <ul className={styles.menu}>
        <li className={styles.list}>
          <NavLink to="/basket" className={styles.navigation}>
            <Button onClick={() => alert('Корзина')} className={styles.button}>
              <img src={basketIcon} alt="Корзина" className={styles.icon} />
              <span className={styles.count}>1250 руб</span>
            </Button>
          </NavLink>
        </li>
        <li className={styles.list}>
          <NavLink to="/favorites" className={styles.navigation}>
            <Button onClick={() => alert('Закладки')} className={styles.button}>
              <img src={heartIcon} alt="Закладки" className={styles.icon} />
              <p className={styles.count}>Закладки</p>
            </Button>
          </NavLink>
        </li>
        <li className={styles.list}>
          <NavLink to="/profile" className={styles.navigation}>
            <Button onClick={() => alert('Профиль')} className={styles.button}>
              <img src={profileIcon} alt="Профиль" className={styles.icon} />
              <p className={styles.count}>
                Профиль
                {/* {userName && <span className={styles.username}>{userName}</span>} */}
              </p>
            </Button>
          </NavLink>
        </li>
      </ul>
    </nav>
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
