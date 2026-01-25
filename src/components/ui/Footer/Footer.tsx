import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CURRENT_YEAR } from '@/constants/footerData';
import { FOOTER_LINKS } from '@/constants/footerLinks';
import { ReactComponent as InstagramIcon } from '@icon/instagram.svg';
import { ReactComponent as Vk } from '@icon/vk.svg';
import { ReactComponent as FacebookIcon } from '@icon/facebook.svg';
import { Button } from '../Button';
import { InputToy } from '../InputToy';
import styles from './Footer.module.scss';
import { TFooterProps } from './type';

const socialIconMap = {
  Instagram: InstagramIcon,
  Vk: Vk,
  Facebook: FacebookIcon,
};

export const Footer = ({ info, socialLinks, onSubscribe }: TFooterProps) => {
  const { t } = useTranslation(); //хук перевода
  const [email, setEmail] = useState('');
  return (
    <footer className={styles.footer}>
      <ul className={styles.footerNavigation}>
        {FOOTER_LINKS.map((block) => (
          <li className={styles.blockOnlineStore} key={block.titleKey}>
            <span className={styles.sectionContent} data-testid="typography">
              {t(block.titleKey)}
            </span>
            <ul className={styles.blockCategory}>
              {block.links.map((link) => (
                <li key={link.nameKey}>
                  <a
                    className={styles.link}
                    href={link.url}
                    rel={link.rel || undefined}
                  >
                    {t(link.nameKey)}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <section className={styles.socialAndSubscribe}>
        <p className={styles.copyrightNotice}>
          © {CURRENT_YEAR} UnnToyStore. {t('footer.rights')}
        </p>
        <ul className={styles.socialLinks}>
          {socialLinks.map((link) => {
            const Icon = socialIconMap[link.name as keyof typeof socialIconMap];
            return (
              <li key={link.name}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {Icon && <Icon className={styles.icon} />}
                </a>
              </li>
            );
          })}
        </ul>
        <div className={styles.subscribe}>
          <InputToy
            className={styles.input}
            type="text"
            placeholder={t('footer.emailPlaceholder')}
          />
          <Button variant="headerButton" onClick={() => onSubscribe(email)}>
            <p className={styles.count}>{t('footer.subscribeButton')}</p>
          </Button>
        </div>
      </section>
    </footer>
  );
};

{
  /* <ul>
map - это метод массива, который превращает данные в JSX-элементы. Для каждого элемента массива возвращается кусок DOM (React-элемент).
key — специальный атрибут React. Он помогает React правильно обновлять список при изменениях. key должен быть уникальным среди соседних элементов. (Если title/name может повторяться — лучше использовать id.)

rel={link.rel || undefined} — здесь небольшая хитрость:

Если link.rel есть (например 'nofollow'), то в итоговом теге появится rel="nofollow".
Если link.rel = null или пустая строка, то undefined убирает атрибут совсем (лучше, чем rel="null").
В React undefined означает — атрибут не выводится.

className={styles.link} — используется CSS Modules: вместо глобальных классов, мы импортируем styles и применяем нужный стиль.

data-testid="typography" — полезно для автоматизированного тестирования: тесты ищут элемент по этому атрибуту.
</ul> */
}

{
  /* <section>
  <p>{info}</p>	                         Показывает копирайт	Строка info, можно сделать динамической
<ul>{socialLinks.map(...)</ul>	         Список иконок соцсетей	Массив socialLinks + socialIconMap
<div className={styles.subscribe}>	     Форма подписки	Локальное состояние email + функция onSubscribe
</section> */
}
