import { useState } from 'react';
import styles from './footer.module.scss';
import { Button } from '../button';
import { TFooterProps } from './type';

import { ReactComponent as InstagramIcon } from '../../../../icon/instagram.svg';
import { ReactComponent as Vk } from '../../../../icon/vk.svg';
import { ReactComponent as FacebookIcon } from '../../../../icon/facebook.svg';
import { Input } from '../input';

const socialIconMap = {
  Instagram: InstagramIcon,
  Vk: Vk,
  Facebook: FacebookIcon,
};

export const Footer = ({ info, socialLinks, onSubscribe }: TFooterProps) => {
  const [email, setEmail] = useState('');

  return (
    <footer className={styles.footer}>
      <ul className={styles.footerNavigation}>
        <li className={styles.blockOnlineStore}>
          <span className={styles.sectionContent} data-testid="typography">
            Интернет-магазин
          </span>
          <ul className={styles.blockCategory}>
            <li>
              <a className={styles.link} href="/">
                Доставка и оплата
              </a>
            </li>
            <li>
              <a className={styles.link} href="/">
                Обмен и возврат товара
              </a>
            </li>
            <li>
              <a className={styles.link} href="/" rel="nofollow">
                Правила продажи
              </a>
            </li>
            <li>
              <a className={styles.link} href="/">
                Политика конфиденциальности
              </a>
            </li>
          </ul>
        </li>

        <li className={styles.blockOnlineStore}>
          <span className={styles.sectionContent} data-testid="typography">
            Компания
          </span>
          <ul className={styles.blockCategory}>
            <li>
              <a className={styles.link} href="/" rel="nofollow">
                О компании
              </a>
            </li>
            <li>
              <a className={styles.link} href="/" rel="nofollow">
                Инвесторам
              </a>
            </li>
            <li>
              <a className={styles.link} href="/" rel="nofollow">
                Вакансии
              </a>
            </li>
            <li>
              <a className={styles.link} href="/" rel="nofollow">
                Контакты
              </a>
            </li>
          </ul>
        </li>

        <li className={styles.blockOnlineStore}>
          <span className={styles.sectionContent} data-testid="typography">
            Покупателям
          </span>
          <ul className={styles.blockCategory}>
            <li>
              <a className={styles.link} href="/" rel="nofollow">
                Бонусные карты
              </a>
            </li>
            <li>
              <a className={styles.link} href="/" rel="nofollow">
                Подарочные карты
              </a>
            </li>
            <li>
              <a className={styles.link} href="/" rel="nofollow">
                Проверка баланса подарочной карты
              </a>
            </li>
            <li>
              <a className={styles.link} href="/" rel="nofollow">
                Электронные подарочные карты
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <section className={styles.socialAndSubscribe}>
        <p className={styles.copyrightNotice}>{info}</p>
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
          <Input type="text" placeholder="Электронная почта" />
          <Button onClick={() => onSubscribe(email)} className={styles.button}>
            <p className={styles.count}>Подписаться</p>
          </Button>
        </div>
      </section>
    </footer>
  );
};

// - map() — это способ перебрать массив и создать элементы на его основе.
// - key — уникальный идентификатор для каждого элемента списка.
// - target="_blank" — открывает ссылку в новой вкладке.
// - rel="noopener noreferrer" — защита от уязвимостей при открытии внешних ссылок.
// - socialIconMap — это объект, где каждому имени соцсети соответствует компонент иконки.

//!   const [email, setEmail] = useState('');
//? useState — это специальная функция из React, которая помогает компоненту запоминать и хранить данные (состояние).
// value={email}   //*это текущее значение поля (то, что сейчас в input)
// setEmail        //*это функция, которая изменяет это значение

//!   onChange={(event) => setEmail(event.target.value)}
//*? onChange ловит →setEmail() обновляет →value показывает новое значение.
// обработчик события, который срабатывает каждый раз,
// когда пользователь что-то вводит в поле

// event.target             //*это сам input,
// event.target.value      //* текст, который пользователь ввёл.

// Пользователь пишет в поле, например: cat@mail.com
// Срабатывает onChange
// setEmail(e.target.value) обновляет состояние email
// → теперь email === "cat@mail.com"
// Компонент перерисовывается
// value={email} снова берёт актуальное значение
// → в input снова появляется "cat@mail.com"

//!
// target="_blank"    //*«Открой ссылку в новой вкладке»,

// rel="noopener noreferrer"  //*мера безопасности, и вот почему:

// ?Когда ты открываешь новую вкладку через target="_blank",
//? новая страница может получить доступ к твоей через window.opener.
//? А это потенциально опасно:
//? злоумышленник может, например, изменить твою страницу через JavaScript
//? Вот тут и помогает rel="noopener noreferrer":
//? noopener — отключает доступ новой вкладке к window.opener.
//? noreferrer — дополнительно не передаёт "источник" перехода (адрес твоего сайта).

//!
// rel="nofollow"     //*это атрибут ссылки <a>, который говорит поисковым системам (Google, Яндекс и др.):«Не переходите по этой ссылке и не передавайте ей SEO-вес.»

//data-testid="typography"   //*специальный атрибут, который помогает находить элемент в
// *data-testid - используется только для тестирования, в профессиональных проектах часто добавляют такие метки, чтобы можно было безопасно тестировать интерфейс без завязки на классы или текст.
