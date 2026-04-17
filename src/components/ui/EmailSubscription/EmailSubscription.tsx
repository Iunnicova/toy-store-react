import { useSubscriptionStatus } from '@/hooks/useCartBasket/useSubscriptionStatus';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import type { t } from 'i18next';
import type { TEmailSubscriptionProps } from './type';
import { InputToy } from '../InputToy';
import { TheCrossIcon } from '@/components/svg/TheCrossIcon';
import { Button } from '../Button';
import ok from '@images/ok.webp';
import styles from './EmailSubscription.module.scss';

export function EmailSubscription({ onSubscribe }: TEmailSubscriptionProps) {
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
      await onSubscribe(email); // отправка на сервер

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

  return (
    <div className={styles.subscribe}>
      {/* Если подписан — показываем текст, если нет — форму */}
      {status === 'processing' && (
        <img className={styles.imgOk} src={ok} alt="ура" loading="lazy" />
      )}

      {/* спасибо за подписку */}
      {status === 'success' && (
        <div className={styles.inputContainer}>
          <span>{t('footer.successMessage')}</span>

          <button className={styles.clearButton} onClick={closeSuccessMessage}>
            <TheCrossIcon />
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
                <TheCrossIcon />
              </button>
            )}
          </div>

          <Button
            variant="headerButton"
            onClick={() => handleSubscribe(email)}
            disabled={!email.includes('@')} //кнопка не нажмется без собачки
          >
            <span className={styles.count}>{t('footer.subscribeButton')}</span>
          </Button>
        </>
      )}
    </div>
  );
}
