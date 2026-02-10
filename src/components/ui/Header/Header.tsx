import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LogoSvg } from '@/components/svg/LogoSvg';
import { THeaderProps } from './type';
import { Button } from '../Button';
import { getHeaderNavItems } from '@constants/navItems';
import styles from './Header.module.scss';

export const Header = ({
  userName,
  basketTotal = 0,
  favoritesCount = 0,
  // toysInCart,
}: THeaderProps) => {
  const { t } = useTranslation(); //хук для перевода

  const navItems = getHeaderNavItems(basketTotal, favoritesCount, userName);

  //цена общее количество
  // const totalCount = toysInCart.reduce((sum, item) => sum + item.quantity, 0)

  //для перевода
  const resolveLabel = (label: string) => {
    // если строка выглядит как ключ (начинается с "header.")
    if (label.startsWith('header.')) {
      return t(label);
    }
    return label;
  };

  //для перевода
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
            <h1 className={styles.title}>Baby's Smile</h1>
            <p className={styles.slogan}>{t('header.slogan')}</p>
          </div>
        </Link>
      </div>

      <nav aria-label={t('header.mainNav')}>
        <ul className={styles.menu} role="list">
          {navItems.map((item) => {
            const displayLabel =
              item.count !== undefined ? item.count : t(item.label);

            // Динамически выбираем нужную иконку
            let IconComponent = item.icon;

            // Вычисляем, что показывать внутри кнопки
            let buttonContent = null;

            if (item.to === '/basket') {
              // Корзина — показываем иконку + количество товаров
              buttonContent = (
                <>
                  <IconComponent className={styles.icon} aria-hidden="true" />
                  {item.label && (
                    <span className={styles.count}>{displayLabel}</span>
                  )}
                </>
              );
            } else if (item.to === '/favorites') {
              // Избранное — иконка + количество, если > 0
              buttonContent = (
                <>
                  <IconComponent className={styles.icon} aria-hidden="true" />
                  {item.count !== undefined && item.count > 0 && (
                    <span className={styles.count}>{displayLabel}</span>
                  )}
                </>
              );
            } else if (item.to === '/profile') {
              // Профиль — имя или просто текст
              buttonContent = (
                <>
                  <IconComponent className={styles.icon} aria-hidden="true" />
                  <span className={styles.count}>{displayLabel}</span>
                </>
              );
            }

            return (
              <li key={item.to} className={styles.list} role="listitem">
                <Link
                  to={item.to}
                  className={styles.navigation}
                  aria-label={resolveAria(item.ariaLabel)}
                >
                  <Button variant="headerButton" className={styles.button}>
                    {buttonContent}
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
