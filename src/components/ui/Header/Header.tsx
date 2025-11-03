import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { LogoSvg } from '../../svg/LogoSvg';
import { THeaderProps } from './type';
import { Button } from '../Button';
import { getHeaderNavItems } from '../../../constants/navItems';

export const Header = ({
  userName,
  basketTotal = 0,
  favoritesCount = 0,
}: THeaderProps) => {
  const navItems = getHeaderNavItems(basketTotal, favoritesCount, userName);
  return (
    <header className={styles.header} role="banner">
      <div className={styles.link}>
        <Link to="/" aria-label="Перейти на главную страницу">
          <LogoSvg className={styles.logo} aria-hidden="true" />
        </Link>
        <div className={styles.brand}>
          <h1 className={styles.title}>Baby's Smile</h1>
          <p className={styles.slogan}>Toys that make you smile!</p>
        </div>
      </div>
      <nav aria-label="Основная навигация">
        <ul className={styles.menu} role="list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const displayLabel =
              item.count !== undefined ? item.count : item.label;
            return (
              <li key={item.to} className={styles.list}>
                <Link
                  to={item.to}
                  className={styles.navigation}
                  aria-label={item.ariaLabel}
                >
                  <Button
                    variant="headerButton"
                    className={styles.button}
                    aria-label={item.ariaLabel}
                  >
                    <Icon className={styles.icon} aria-hidden="true" />
                    <span className={styles.count}>{displayLabel}</span>
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

//*! role="banner"
// сообщает технологиям доступности (например, экранным читалкам), что этот элемент — главная шапка сайта (site header).
// Это помогает людям, использующим ассистивные технологии, быстро навигировать по основным разделам страницы (например, «пропустить к основному содержимому»).

//!aria-hidden="true"
// Говорит браузеру и вспомогательным технологиям:
// “Эта иконка — декоративная, не читай её”.

//!role="list"
//  это атрибут доступности, который сообщает экранным читалкам:
// “Этот элемент — список”.
