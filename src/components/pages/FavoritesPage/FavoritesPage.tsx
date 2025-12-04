import styles from './FavoritesPage.module.scss';
import favorites1 from '/images/favorites1.png';

import { Cards } from '../../ui/Cards/Cards';
import { TToy } from '../../../types/toysData';
import { useState } from 'react';

export const useFavorites = () => {
  const [favorites] = useState<TToy[]>([]); // пока пусто для теста
  return favorites;
};

export const FavoritesPage = () => {
  const favorites = useFavorites();

  return (
    <section className={styles.favorites}>
      {favorites.length === 0 ? (
        // ПУСТОЕ СОСТОЯНИЕ — когда ничего нет
        <>
          <h1 className={styles.title}>
            Вы ещё не добавили товары в избранное
          </h1>

          <img
            src={favorites1}
            className={styles.imgFavorites}
            alt="Лисёнок грустит в пустой коробке"
          />

          <p className={styles.text}>
            Просто нажмите ❤️ на карточке товара — и он появится здесь!
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
