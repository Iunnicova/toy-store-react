import { useTranslation } from 'react-i18next';
import { useFavoritesContext } from '@/context/FavoritesContext';
import { useCartContext } from '@/context/CartContex';
import { Link } from 'react-router-dom';
import { LogoSvg } from '@/components/svg/LogoSvg';
import { THeaderProps } from './type';
import { THeaderNavItem } from '@/types/headerNavItem';
import { Button } from '../Button';
import { getHeaderNavItems } from '@constants/navItems';

import styles from './Header.module.scss';

export const Header = ({ userName }: THeaderProps) => {
  const { t } = useTranslation(); //хук для перевода

  //число добавленных единиц в избранное и корзины в кнопки шапки
  const { favorites } = useFavoritesContext();
  const { cartItems } = useCartContext();

  const favoritesCount = favorites.length;
  const basketTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = getHeaderNavItems(basketTotal, favoritesCount, userName);

  //для перевода Работает с простыми текстовыми метками (label).
  const resolveLabel = (label: string) => {
    // если строка выглядит как ключ (начинается с "header.")
    if (label.startsWith('header.')) {
      return t(label);
    }
    return label;
  };

  //для перевода Работает с атрибутами доступности (aria-label).
  const resolveAria = (aria: string) => {
    if (aria.startsWith('header.')) {
      const [key, param] = aria.split('|');
      if (param) {
        return t(key, { value: param });
      }
      return t(key);
    }
    return aria;
  };

  //разделяем кнопки
  const getButtonText = (item: THeaderNavItem) => {
    switch (item.variant) {
      case 'basket':
        // return item.label;
        return item.count !== undefined
          ? item.count //либо перевод ключа header.nav.favorites, либо счётчик, если он есть.
          : resolveLabel(item.label);

      case 'favorites':
        return item.count !== undefined
          ? item.count //либо перевод ключа header.nav.favorites, либо счётчик, если он есть.
          : resolveLabel(item.label);

      case 'profile':
        return resolveLabel(item.label); //либо перевод ключа header.nav.profile, либо имя пользователя.

      default:
        return '';
    }
  };

  return (
    <header className={styles.header} role="banner">
      <div className={styles.promo}>
        <Link
          to="/"
          className={styles.homeLink}
          aria-label="Перейти на главную страницу"
        >
          <LogoSvg className={styles.logo} aria-hidden="true" />

          <div className={styles.brand}>
            <h1 className={styles.title}>{t('header.shop_name')}</h1>
            <p className={styles.slogan}>{t('header.slogan')}</p>
          </div>
        </Link>
      </div>

      <nav aria-label={t('header.mainNav')}>
        <ul className={styles.menu} role="list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const displayLabel =
              item.count !== undefined ? item.count : t(item.label);
            return (
              <li key={item.to} className={styles.list} role="listitem">
                <Link
                  to={item.to}
                  className={styles.navigation}
                  aria-label={resolveAria(item.ariaLabel)}
                >
                  <Button variant="headerButton" className={styles.button}>
                    <Icon className={styles.icon} aria-hidden />
                    {/* надписи в кнопке */}
                    <span className={styles.count}>{getButtonText(item)}</span>
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
