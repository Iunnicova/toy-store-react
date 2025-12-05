import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './BasketPage.module.scss';

import basket1 from '/images/basket1.png';
import { TToy } from '../../../types/toysData';
import { Button, Cards } from '../../ui';
import { BasketIcon } from '../../svg/BasketIcon/BasketIcon';

export const useFavorites = () => {
  const [basket] = useState<TToy[]>([]); // пока пусто для теста
  return basket;
};

export const BasketPage = () => {
  const basket = useFavorites();
  const { t } = useTranslation(); //хук перевода
  return (
    <section className={styles.basket}>
      {basket.length === 0 ? (
        // ПУСТОЕ СОСТОЯНИЕ — когда ничего нет
        <>
          <h1 className={styles.title}>{t('basket.notAdded')}</h1>

          <img
            className={styles.imgBasket}
            src={basket1}
            alt="Зайка грустит в пустой корзинке"
          />
          <p className={styles.text}>

            {/* Trans компонент из i18next для добавления img в текст перевода*/}
            <Trans
              i18nKey="basket.justClick"
              components={{
                icon: <BasketIcon className={styles.basketIcon} />,
              }}
            />
          </p>
          <Link
            to="/"
            className={styles.homeLink}
            aria-label="Перейти на главную страницу"
          >
            <Button variant="headerButton" className={styles.homeButton}>
            <p className={styles.count}>{t('basket.homeButton')}</p>
            </Button>
          </Link>
        </>
      ) : (
        // ЕСТЬ ТОВАРЫ — показываем карточки
        <div className={styles.cardsGrid}>
          {basket.map((toy) => (
            <Cards
              key={toy.id}
              toy={toy}
              onCardClick={() => {}} // заглушка — на странице избранного модалка не нужна
            />
          ))}
        </div>
      )}
    </section>
  );
};
