import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { LogoSvg } from '../../svg/LogoSvg';
import { THeaderProps } from './type';
import { Button } from '../Button';
import { getHeaderNavItems } from '../../../constants/navItems';
import { useTranslation } from 'react-i18next';

export const Header = ({
  userName,
  basketTotal = 0,
  favoritesCount = 0,
}: THeaderProps) => {
  const { t } = useTranslation(); //хук для перевода

  const navItems = getHeaderNavItems(basketTotal, favoritesCount, userName);

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
      <div className={styles.link}>
        <Link to="/" aria-label="Перейти на главную страницу">
          <LogoSvg className={styles.logo} aria-hidden="true" />
        </Link>
        <div className={styles.brand}>
          <h1 className={styles.title}>Baby's Smile</h1>
          <p className={styles.slogan}>{t('header.slogan')}</p>
        </div>
      </div>

      <nav aria-label={t('header.mainNav')}>
        <ul className={styles.menu} role="list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const displayLabel =
              item.count !== undefined ? item.count : t(item.label);
            return (
              <li key={item.to} className={styles.list}>
                <Link
                  to={item.to}
                  className={styles.navigation}
                  aria-label={resolveAria(item.ariaLabel)}
                >
                  <Button
                    variant="headerButton"
                    className={styles.button}
                    aria-label={resolveAria(item.ariaLabel)}
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
