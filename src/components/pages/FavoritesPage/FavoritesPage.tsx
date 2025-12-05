import styles from './FavoritesPage.module.scss';
import favorites1 from '/images/favorites1.png';

import { Cards } from '../../ui/Cards/Cards';
import { TToy } from '../../../types/toysData';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useFavorites = () => {
  const [favorites] = useState<TToy[]>([]); // пока пусто для теста
  return favorites;
};

export const FavoritesPage = () => {
  const favorites = useFavorites();
  const { t } = useTranslation(); //хук перевода
  return (
    <section className={styles.favorites}>
      {favorites.length === 0 ? (
        // ПУСТОЕ СОСТОЯНИЕ — когда ничего нет
        <>
          <h1 className={styles.title}>{t('favorites.notAdded')}</h1>

          <img
            className={styles.imgFavorites}
            src={favorites1}
            alt="Лисёнок грустит в пустой коробке"
          />
          <p className={styles.text}>
            {t('favorites.justClick')}
          </p>
        </>
      ) : (
        // ЕСТЬ ТОВАРЫ — показываем карточки
        <div className={styles.cardsGrid}>
          {favorites.map((toy) => (
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
