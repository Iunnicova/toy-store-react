import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CURRENT_YEAR } from '@/constants/footerData';
import { FOOTER_LINKS } from '@/constants/footerLinks';
import { TFooterProps } from './type';
import { Button } from '../Button';
import { InputToy } from '../InputToy';
import ok from '@images/ok.webp';
import { ReactComponent as InstagramIcon } from '@icon/instagram.svg';
import { ReactComponent as Vk } from '@icon/vk.svg';
import { ReactComponent as FacebookIcon } from '@icon/facebook.svg';
import styles from './Footer.module.scss';

const socialIconMap = {
  Instagram: InstagramIcon,
  Vk: Vk,
  Facebook: FacebookIcon,
};

type Status = 'ready' | 'processing' | 'success' | 'error';

export const Footer = ({ info, socialLinks, onSubscribe }: TFooterProps) => {
  const { t } = useTranslation(); //хук перевода
  const [email, setEmail] = useState(''); // Создаем "хранилище" для текста подписки

  //! сообщение 'спасибо за подписку'
  // const [status, setStatus] = useState<'idle' | 'frog' | 'success'>('idle');
  const [status, setStatus] = useState<Status>('ready');

  const handleSubscribe = async () => {
    // if (email.includes('@')) {
    //   onSubscribe(email);
    //   setEmail('');
    //   setStatus('processing');
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('processing');

    try {
      await onSubscribe(email); // предполагаем, что onSubscribe асинхронный

      setEmail(''); //очищаем поле только после успеха
      setStatus('processing');

      //Автоматически возвращаемся в "спасибо за подписку" через 3 секунды
      setTimeout(() => {
        setStatus('success');
      }, 3000);
    } catch (error) {
      console.error('Ошибка подписки', error);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('ready'); //крестик
  };

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
          {/* Если подписан — показываем текст, если нет — форму */}
          {status === 'processing' && (
            <img className={styles.imgOk} src={ok} alt="ура" loading="lazy" />
          )}

          {/* спасибо за подписку */}
          {status === 'success' && (
            <div className={styles.inputContainer}>
              <span>{t('footer.successMessage')}</span>

              <button className={styles.clearButton} onClick={handleReset}>
                <svg
                  className={styles.svgButton}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="#757575"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}

          {status === 'ready' && (
            <>
              <div className={styles.inputContainer}>
                <InputToy
                  className={styles.input}
                  type="email" //чтобы браузер сам проверял формат
                  value={email} //Привязываем значение к стейту
                  onChange={(e) => setEmail(e.target.value)} // Обновляем стейт при каждом нажатии клавиши
                  placeholder={t('footer.emailPlaceholder')} //перевод внутренностей
                />

                {email && (
                  <button
                    className={styles.clearButton}
                    onClick={() => setEmail('')}
                  >
                    <svg
                      className={styles.svgButton}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 5L5 15M5 5L15 15"
                        stroke="#757575"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <Button
                variant="headerButton"
                // onClick={() => onSubscribe(email)}
                onClick={handleSubscribe}
                disabled={!email.includes('@')} //кнопка не нажмется без собачки
              >
                <span className={styles.count}>
                  {t('footer.subscribeButton')}
                </span>
              </Button>
            </>
          )}
        </div>
      </section>
    </footer>
  );

  // export const Footer = ({ info, socialLinks, onSubscribe }: TFooterProps) => {
  //   const { t } = useTranslation(); //хук перевода
  //   const [email, setEmail] = useState(''); // Создаем "хранилище" для текста подписки

  //   //! сообщение 'спасибо за подписку'
  //   const [isSubscribe, setIsSubscribe] = useState(false);

  //   const handleSubscribe = () => {
  //     if (email.includes('@')) {
  //       onSubscribe(email); // Вызываем функцию отправки
  //       setIsSubscribe(true); // Показываем  сообщение
  //       setEmail(''); // Очищаем поле ввода

  //       // Через 3 секунды убираем сообщение, чтобы форма вернулась в начало
  //       setTimeout(() => setIsSubscribe(false), 5000);
  //     }
  //   };

  //   return (
  //     <footer className={styles.footer}>
  //       <ul className={styles.footerNavigation}>
  //         {FOOTER_LINKS.map((block) => (
  //           <li className={styles.blockOnlineStore} key={block.titleKey}>
  //             <span className={styles.sectionContent} data-testid="typography">
  //               {t(block.titleKey)}
  //             </span>
  //             <ul className={styles.blockCategory}>
  //               {block.links.map((link) => (
  //                 <li key={link.nameKey}>
  //                   <a
  //                     className={styles.link}
  //                     href={link.url}
  //                     rel={link.rel || undefined}
  //                   >
  //                     {t(link.nameKey)}
  //                   </a>
  //                 </li>
  //               ))}
  //             </ul>
  //           </li>
  //         ))}
  //       </ul>
  //       <section className={styles.socialAndSubscribe}>
  //         <p className={styles.copyrightNotice}>
  //           © {CURRENT_YEAR} UnnToyStore. {t('footer.rights')}
  //         </p>
  //         <ul className={styles.socialLinks}>
  //           {socialLinks.map((link) => {
  //             const Icon = socialIconMap[link.name as keyof typeof socialIconMap];
  //             return (
  //               <li key={link.name}>
  //                 <a href={link.url} target="_blank" rel="noopener noreferrer">
  //                   {Icon && <Icon className={styles.icon} />}
  //                 </a>
  //               </li>
  //             );
  //           })}
  //         </ul>

  //         <div className={styles.subscribe}>
  //           {/* Если подписан — показываем текст, если нет — форму */}
  //           {isSubscribe ? (
  //             // <p className={styles.successMessage}>🎉</p>
  //             <img
  //             className={styles.imgOk}
  //             src={ok} alt="ура"
  //             loading="lazy" />
  //           ) : (
  //             <>
  //          <div className={styles.inputContainer}>
  //               <InputToy
  //                 className={styles.input}
  //                 type="email" //чтобы браузер сам проверял формат
  //                 value={email} //Привязываем значение к стейту
  //                 onChange={(e) => setEmail(e.target.value)} // Обновляем стейт при каждом нажатии клавиши
  //                 placeholder={t('footer.successMessage')} //перевод внутренностей
  //               />

  //               <button
  //               // variant='like'
  //               // onClick={handleSubscribe}
  //               className={styles.clearButton}
  //               onClick={() => setEmail('')}

  //               >
  //                   <svg
  //                 className={styles.svgButton}
  //           width="20"
  //           height="20"
  //           viewBox="0 0 20 20"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M15 5L5 15M5 5L15 15"
  //             stroke="#757575"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           />
  //         </svg>
  //               </button>

  // </div>
  //               <Button
  //                 variant="headerButton"
  //                 // onClick={() => onSubscribe(email)}
  //                 onClick={handleSubscribe}
  //                 disabled={!email.includes('@')} //кнопка не нажмется без собачки
  //               >
  //                 <span className={styles.count}>
  //                   {t('footer.subscribeButton')}
  //                 </span>

  //               </Button>
  //             </>
  //           )}
  //         </div>
  //       </section>
  //     </footer>
  //   );
  // };

  // {
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
};

{
  /* <section>
  <p>{info}</p>	                         Показывает копирайт	Строка info, можно сделать динамической
<ul>{socialLinks.map(...)</ul>	         Список иконок соцсетей	Массив socialLinks + socialIconMap
<div className={styles.subscribe}>	     Форма подписки	Локальное состояние email + функция onSubscribe
</section> */
}
