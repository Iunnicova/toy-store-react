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
import { useSubscriptionStatus } from '@/hooks/useCartBasket/useSubscriptionStatus';
import { addSubscriberApi } from '@/api/subscribersApi';

const socialIconMap = {
  Instagram: InstagramIcon,
  Vk: Vk,
  Facebook: FacebookIcon,
};

export const Footer = ({ socialLinks, onSubscribe }: TFooterProps) => {
  const { t } = useTranslation(); //хук перевода
  const [email, setEmail] = useState(''); // Создаем "хранилище" для текста подписки

  //! сообщение 'спасибо за подписку'
  const { status, setStatus, closeSuccessMessage } = useSubscriptionStatus();

  const handleSubscribe = async (email: string) => {
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      return;
    }
    try {
      // await onSubscribe(email); // отправка на сервер
      await addSubscriberApi(email); // отправка на сервер

      localStorage.setItem('subscribedEmail', email); // сохраняем
      setEmail(''); //очищаем поле только после успеха
      setStatus('processing'); // показываем "Спасибо за подписку"

      //Автоматически возвращаемся в "спасибо за подписку" через 3 секунды
      setTimeout(() => {
        setStatus('success');
      }, 3000);
    } catch (error) {
      console.error('Ошибка подписки', error);
      setStatus('error');
    }
  };

  //**** */

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

              <button
                className={styles.clearButton}
                onClick={closeSuccessMessage}
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
                onClick={() => handleSubscribe(email)}
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
};
