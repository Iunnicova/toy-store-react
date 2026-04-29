import ok from '@images/ok.webp';
import styles from './EmailSubscription.module.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { TheCrossIcon } from '@/components/svg/TheCrossIcon';
import { InputToy } from '../InputToy';
import { Button } from '../Button';
import type { TEmailSubscriptionProps } from './type';
import { useSubscriptionStatus } from '@/hooks/useSubscriptionStatus';

export function EmailSubscription({ onSubscribe }: TEmailSubscriptionProps) {
  const { t } = useTranslation(); //хук перевода
  const [email, setEmail] = useState(''); // Создаем "хранилище" для текста подписки

  //! сообщение 'спасибо за подписку'
  // const { status, setStatus, closeSuccessMessage } = useSubscriptionStatus();
  const { status, error, handleSubscription, closeSuccessMessage } =
    useSubscriptionStatus();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Вызываем подписку из хука
    await handleSubscription(email, onSubscribe);

    setEmail(''); // Очищаем поле только при успехе
  };
  return (
    <form className={styles.subscribe} onSubmit={onSubmit}>
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
            type="button"
          >
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
                type="button"
                onClick={() => setEmail('')}
              >
                <TheCrossIcon />
              </button>
            )}
          </div>

          <Button
            variant="headerButton"
            type="submit"
            // onClick={() => handleSubscribe(email)}
            disabled={!email.includes('@')} //кнопка не нажмется без собачки
          >
            <span className={styles.count}>{t('footer.subscribeButton')}</span>
          </Button>
        </>
      )}
      {status === 'signed' && (
        <div className={styles.inputContainer}>
          <span>{t('footer.youAreSubscribed')}</span>
          <button
            className={styles.clearButton}
            onClick={closeSuccessMessage}
            type="button"
          >
            <TheCrossIcon />
          </button>
        </div>
      )}
    </form>
  );
}
